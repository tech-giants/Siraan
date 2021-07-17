import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { iconsMap } from '../utils/navIcons';
import i18n from '../utils/i18n';

// Import actions.
import * as cartActions from '../actions/cartActions';

// Components
import Spinner from '../components/Spinner';
import VendorsCartsList from '../components/VendorsCartsList';
import CartProductList from '../components/CartProductList';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  topBtn: {
    padding: 10,
  },
  trashIcon: {
    height: 20,
    fontSize: 20,
  },
});

/**
 * Renders the cart modal.
 *
 * @reactProps {object} cartActions - Cart actions.
 * @reactProps {object} auth - Authorization information.
 * @reactProps {object} cart - Cart information.
 */
export class Cart extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    cartActions: PropTypes.shape({
      fetch: PropTypes.func,
      clear: PropTypes.func,
      remove: PropTypes.func,
      change: PropTypes.func,
      changeAmount: PropTypes.func,
    }),
    auth: PropTypes.shape({
      token: PropTypes.string,
    }),
    cart: PropTypes.shape({}),
    vendorCarts: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      refreshing: false,
    };

    Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        this.topNavigationButtonPressed(buttonId);
      },
    );
  }

  /**
   * Gets cart data.
   */
  componentDidMount() {
    const { cart } = this.props;
    this.props.cartActions.fetch(undefined, cart.coupons);
  }

  /**
   * Updates the number of products in the state.
   *
   * @param {object} nextProps - Incoming props.
   */
  componentWillReceiveProps(nextProps) {
    const { cart, auth } = nextProps;

    if (cart.fetching) {
      return;
    }

    let productsAmount;
    if (Object.keys(cart.carts).length) {
      if (cart.isSeparateCart) {
        productsAmount = Object.keys(cart.carts).reduce((accumulator, el) => {
          return el !== 'general'
            ? accumulator + cart.carts[el].amount
            : accumulator;
        }, 0);
      } else {
        productsAmount = cart.carts.general.amount;
      }
    }

    this.setState({
      fetching: false,
      refreshing: false,
    });

    const buttons = {};
    if (auth.logged) {
      buttons.rightButtons = [
        {
          id: 'clearCart',
          icon: iconsMap.delete,
        },
      ];
    }

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Cart').toUpperCase(),
        },
        ...buttons,
      },
      bottomTab: {
        badge: productsAmount !== undefined ? `${productsAmount}` : '',
      },
    });
  }

  /**
   * Cart modal navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  topNavigationButtonPressed(buttonId) {
    const { cartActions } = this.props;
    if (buttonId === 'clearCart') {
      Alert.alert(
        i18n.t('Clear all cart ?'),
        '',
        [
          {
            text: i18n.t('Cancel'),
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: i18n.t('Ok'),
            onPress: () => cartActions.clear(),
          },
        ],
        { cancelable: true },
      );
    }
  }

  /**
   * Refresh cart data.
   */
  handleRefresh = () => {
    const { cartActions, cart } = this.props;
    this.setState({ refreshing: true }, () =>
      cartActions.fetch(undefined, cart.coupons),
    );
  };

  /**
   * Renders a list of products.
   *
   * @return {JSX.Element}
   */
  renderList() {
    const { refreshing, fetching } = this.state;
    const { cartActions, cart, auth, componentId } = this.props;

    if (fetching) {
      return this.renderSpinner();
    }

    return (
      <CartProductList
        cart={cart.carts.general}
        auth={auth}
        componentId={componentId}
        handleRefresh={this.handleRefresh}
        refreshing={refreshing}
        cartActions={cartActions}
      />
    );
  }

  /**
   * Renders a list of vendor carts.
   *
   * @return {JSX.Element}
   */
  renderVendorsList = () => {
    const { fetching, refreshing } = this.state;
    const { cartActions, auth, componentId, cart } = this.props;

    if (fetching) {
      return this.renderSpinner();
    }

    const newCarts = Object.keys(cart.carts).reduce((result, el) => {
      if (el !== 'general') {
        result.push(cart.carts[el]);
      }
      return result;
    }, []);

    return (
      <VendorsCartsList
        carts={newCarts}
        auth={auth}
        componentId={componentId}
        handleRefresh={this.handleRefresh}
        refreshing={refreshing}
        cartActions={cartActions}
      />
    );
  };

  /**
   * Renders spinner.
   *
   * @return {JSX.Element}
   */
  renderSpinner = () => {
    const { refreshing } = this.state;
    const { cart } = this.props;

    if (refreshing || !Object.keys(cart.carts).length) {
      return false;
    }

    return <Spinner visible={cart.fetching} />;
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { cart } = this.props;

    return (
      <View style={styles.container}>
        {cart.isSeparateCart ? this.renderVendorsList() : this.renderList()}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    cart: state.cart,
  }),
  (dispatch) => ({
    cartActions: bindActionCreators(cartActions, dispatch),
  }),
)(Cart);
