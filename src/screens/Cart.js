import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Alert, Pressable, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { iconsMap } from '../utils/navIcons';
import i18n from '../utils/i18n';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import { AlertBox } from '../components/SaldiriComponents/SaldiriMessagesComponents';

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
    // backgroundColor:'rgba(162, 110, 166, 0.2)',
    // backgroundColor:'#e3d1e4',
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
        visible: false,
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
      <>
        <SaldiriHeader
          midHeaderTitle="Your Cart"
          endComponent={
            this.props.auth.logged ? (
              <Pressable
                onPress={() => {
                  // this.props.cartActions.clear();
                  Alert.alert(
                    'Delete Products',
                    ' Do you Want to Delete all Products?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => this.props.cartActions.clear(),
                      },
                    ],
                  );
                }}
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <MaterialIcons name="delete" size={22} color="#7c2981" />
              </Pressable>
            ) : null
          }
        />
        <View style={styles.container}>
          {cart.isSeparateCart ? this.renderVendorsList() : this.renderList()}
        </View>
        {!true && !cart.fetching ? (
          <View
            style={{
              display: 'none',
              flex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(25, 22, 26, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              // size="large"
              size={45}
              style={styles.indicator}
              color="#7c2981"
            />
          </View>
        ) : null}
      </>
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
