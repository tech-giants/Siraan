import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../config/theme';

import values from 'lodash/values';
import uniqueId from 'lodash/uniqueId';

// Import actions.
import * as cartActions from '../actions/cartActions';
import * as stepsActions from '../actions/stepsActions';

// Components
import StepByStepSwitcher from '../components/StepByStepSwitcher';
import CartFooter from '../components/CartFooter';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';

import i18n from '../utils/i18n';

import { stripTags, formatPrice } from '../utils';
import { Navigation } from 'react-native-navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {},
  shippingItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  shippingItemText: {
    fontSize: '0.9rem',
    paddingBottom: 6,
    marginLeft: 6,
    marginRight: 6,
  },
  shippingItemDesc: {
    fontSize: '0.8rem',
    paddingBottom: 6,
    color: 'gray',
  },
  shippingTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  shippingItemRate: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '1rem',
  },
  shippingItemTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  shippingItemTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  uncheckIcon: {
    fontSize: '1rem',
  },
  checkIcon: {
    fontSize: '1rem',
    opacity: 0.5,
  },
  stepsWrapper: {
    padding: 14,
  },
  shippingForbiddenContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  shippingForbiddenText: {
    textAlign: 'center',
    color: theme.$dangerColor,
  },
  totalWrapper: {
    marginTop: 6,
    marginLeft: 20,
    marginRight: 20,
  },
  totalText: {
    textAlign: 'right',
    marginTop: 4,
    color: '#979797',
  },
  totalDiscountText: {
    textAlign: 'right',
    marginTop: 4,
    color: '$dangerColor',
  },
});

/**
 * Checkout. Shipping screen.
 *
 * @reactProps {object} navigator - Navigator.
 * @reactProps {object} cart - Cart information.
 * @reactProps {object} cartActions - Cart actions.
 */
export class CheckoutShipping extends Component {
  static propTypes = {
    cart: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      items: [],
      shipping_id: {},
      isNextDisabled: true,
    };
  }

  /**
   * Sets shipping methods.
   */
  componentDidMount() {
    const { cart } = this.props;
    this.setDefaults(cart);

    setTimeout(() => this.handleLoadInitial(), 500);
  }

  /**
   * Sets shipping methods.
   */
  componentWillReceiveProps(nextProps) {
    const { cart } = nextProps;
    this.setDefaults(cart);
  }

  /**
   * Set default shipping method.
   *
   * @param {object} cart - Cart information.
   */
  setDefaults(cart) {
    const items = this.normalizeData(cart.product_groups);
    const shippings = [];
    let isShippingForbidden = false;

    items.forEach((item) => {
      if (item) {
        item.shippings.forEach((shipping) => {
          shippings.push(shipping);
        });
      }
      if (item.isShippingForbidden) {
        isShippingForbidden = true;
      }
    });

    this.setState({
      items,
      total: cart.total_formatted.price,
      isNextDisabled: isShippingForbidden || shippings.length === 0,
    });
  }

  /**
   * Changes data format.
   *
   * @param {object} blobData - Company information.
   */
  normalizeData = (blobData) => {
    const { shipping_id } = this.state;

    return blobData.map((currentItem) => {
      const item = { ...currentItem };
      item.shippings = values(item.shippings);
      item.shippings = item.shippings.map((i, index) => {
        if (index === 0 && !values(shipping_id).length) {
          this.setState({ shipping_id: { 0: i.shipping_id } });
          return {
            ...i,
            isSelected: true,
          };
        }

        return {
          ...i,
          isSelected: values(shipping_id).includes(i.shipping_id),
        };
      });
      return item;
    });
  };

  /**
   * Calculates the cost including delivery.
   */
  handleLoadInitial() {
    const { cartActions, stateCart, cart } = this.props;
    const { items } = this.state;
    const shippingsIds = {};
    const shippings = [];

    items.forEach((item) => {
      if (item) {
        item.shippings.forEach((shipping) => {
          shippings.push(shipping);
        });
      }
    });

    shippings.forEach((shipping, index) => {
      if (shipping.isSelected) {
        shippingsIds[index] = shipping.shipping_id;
      }
    });

    cartActions
      .recalculateTotal(shippingsIds, stateCart.coupons, cart.vendor_id)
      .then((data) => {
        this.setState({
          total: data.total_formatted.price,
        });
      });
  }

  /**
   * Redirects to CheckoutPayment.
   */
  handleNextPress() {
    const { cart, stepsActions, stateSteps, currentStep } = this.props;

    // Define next step
    const nextStep =
      stateSteps.flowSteps[
        Object.keys(stateSteps.flowSteps)[currentStep.stepNumber + 1]
      ];
    stepsActions.setNextStep(nextStep);

    Navigation.push(this.props.componentId, {
      component: {
        name: nextStep.screenName,
        passProps: {
          cart,
          shipping_id: this.state.shipping_id,
          currentStep: nextStep,
        },
      },
    });
  }

  /**
   * Switches shipping method.
   *
   * @param {object} shipping - Shipping method information.
   * @param {number} shippingIndex - Shipping index.
   * @param {number} itemIndex - Index of the selected shipping method.
   */
  handleSelect(shipping, shippingIndex, itemIndex) {
    const { cartActions, stateCart, cart } = this.props;
    if (shipping.isSelected) {
      return;
    }
    // Check shipping
    const newItems = [...this.state.items];
    newItems[itemIndex].shippings = newItems[itemIndex].shippings.map((s) => ({
      ...s,
      isSelected: false,
    }));
    newItems[itemIndex].shippings[shippingIndex].isSelected = true;
    // Get selected ids
    const selectedIds = {};
    selectedIds[`${itemIndex}`] = `${shipping.shipping_id}`;

    cartActions
      .recalculateTotal(selectedIds, stateCart.coupons, cart.vendor_id)
      .then((data) => {
        this.setState({
          total: data.total_formatted.price,
        });
      });

    this.setState({
      items: newItems,
      shipping_id: selectedIds,
    });
  }

  /**
   * Renders shipping options.
   *
   * @param {object} shipping - Shipping method information.
   * @param {number} shippingIndex - Shipping index.
   * @param {number} itemIndex - Index of the selected shipping method.
   *
   * @return {JSX.Element}
   */
  renderItem = (shipping, shippingIndex, itemIndex, item) => {
    return (
      <TouchableOpacity
        key={uniqueId('item_')}
        style={[styles.shippingItem]}
        onPress={() => this.handleSelect(shipping, shippingIndex, itemIndex)}>
        <View style={styles.shippingItemTitleWrap}>
          <View style={styles.shippingItemTitle}>
            {shipping.isSelected ? (
              <Icon name="radio-button-checked" style={styles.checkIcon} />
            ) : (
              <Icon name="radio-button-unchecked" style={styles.uncheckIcon} />
            )}
            <Text style={styles.shippingItemText}>
              {shipping.shipping} {shipping.delivery_time}
            </Text>
          </View>

          <Text style={styles.shippingItemRate}>
            {item.free_shipping && shipping.free_shipping
              ? i18n.t('Free')
              : shipping.rate_formatted.price}
          </Text>
        </View>
        <Text style={styles.shippingItemDesc}>
          {stripTags(shipping.description)}
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Renders checkout steps.
   *
   * @return {JSX.Element}
   */
  renderSteps = () => {
    const { currentStep } = this.props;
    return (
      <View style={styles.stepsWrapper}>
        <StepByStepSwitcher currentStep={currentStep} />
      </View>
    );
  };

  /**
   * Renders company title.
   *
   * @param {string} title - Company title.
   *
   * @return {JSX.Element}
   */
  renderCompany = (title) => {
    const { items } = this.state;
    if (items.length === 1) {
      return null;
    }
    return <Text style={styles.shippingTitle}>{title}</Text>;
  };

  /**
   * Renders shipping not available message.
   *
   * @return {JSX.Element}
   */
  renderShippingNotAvailableMessage = () => {
    return (
      <View style={styles.shippingForbiddenContainer}>
        <Text style={styles.shippingForbiddenText}>
          {i18n.t(
            'Sorry, it seems that we have no shipping options available for your location.Please check your shipping address and contact us if everything is okay. We`ll see what we can do about it.',
          )}
        </Text>
      </View>
    );
  };

  /**
   * Renders order detail.
   *
   * @return {JSX.Element}
   */
  renderOrderDetail = () => {
    const { cart, stateCart } = this.props;

    const currentCart = stateCart.carts.general
      ? stateCart.carts.general
      : stateCart.carts[cart.vendor_id];

    const isFormattedDiscount = !!get(currentCart, 'subtotal_discount', '');
    const formattedDiscount = get(
      currentCart,
      'subtotal_discount_formatted.price',
      '',
    );
    const isIncludingDiscount = !!get(currentCart, 'discount', '');
    const includingDiscount = get(currentCart, 'discount_formatted.price', '');

    return (
      <View style={styles.totalWrapper}>
        <Text style={styles.totalText}>
          {`${i18n.t('Subtotal')}: ${get(
            currentCart,
            'subtotal_formatted.price',
            '',
          )}`}
        </Text>
        {isIncludingDiscount && (
          <Text style={styles.totalDiscountText}>
            {`${i18n.t('Including discount')}: -${includingDiscount}`}
          </Text>
        )}
        {isFormattedDiscount && (
          <Text style={styles.totalDiscountText}>
            {`${i18n.t('Order discount')}: -${formattedDiscount}`}
          </Text>
        )}
        <Text style={styles.totalText}>
          {`${i18n.t('Shipping')}: ${get(
            currentCart,
            'shipping_cost_formatted.price',
            '',
          )}`}
        </Text>
        <Text style={styles.totalText}>
          {`${i18n.t('Taxes')}: ${get(
            currentCart,
            'tax_subtotal_formatted.price',
            '',
          )}`}
        </Text>
      </View>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { items, isNextDisabled, total } = this.state;
    const { stateCart } = this.props;

    if (stateCart.fetching) {
      return <Spinner visible />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.renderSteps()}
          {items
            .filter((item) => item.isShippingRequired)
            .map((item, itemIndex) => (
              <View key={item.company_id}>
                {this.renderCompany(item.name)}
                {item.isShippingForbidden
                  ? this.renderShippingNotAvailableMessage()
                  : item.shippings.map((shipping, shippingIndex) =>
                      this.renderItem(shipping, shippingIndex, itemIndex, item),
                    )}
              </View>
            ))}
          {this.renderOrderDetail()}
        </ScrollView>
        <CartFooter
          totalPrice={`${formatPrice(total)}`}
          btnText={i18n.t('Next').toUpperCase()}
          isBtnDisabled={isNextDisabled}
          onBtnPress={() => this.handleNextPress()}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    stateCart: state.cart,
    shippings: state.shippings,
    stateSteps: state.steps,
  }),
  (dispatch) => ({
    cartActions: bindActionCreators(cartActions, dispatch),
    stepsActions: bindActionCreators(stepsActions, dispatch),
  }),
)(CheckoutShipping);
