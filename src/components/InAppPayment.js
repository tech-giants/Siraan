import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';

import config from '../config';

import * as ordersActions from '../actions/ordersActions';
import * as cartActions from '../actions/cartActions';
import * as paymentsActions from '../actions/paymentsActions';

/**
 * Renders Apple pay button.
 *
 * @reactProps {object} cart - Cart information.
 * @reactProps {object} cartActions - Cart actions.
 * @reactProps {function} onPress - Push function.
 * @reactProps {object} orderActions - Order actions.
 * @reactProps {object} paymentsActions - Payment actions.
 */
class InAppPayment extends React.Component {
  /**
   * @ignore
   */
  static propTypes = {
    cartActions: PropTypes.shape({
      getUpdatedDetailsForShippingAddress: PropTypes.func,
    }),
    ordersActions: PropTypes.shape({}),
    paymentsActions: PropTypes.shape({
      settlements: PropTypes.func,
    }),
    onPress: PropTypes.func,
    cart: PropTypes.shape({}),
  };

  static defaultProps = {};

  handleShippingOptionChange = throttle(
    (event) => {
      const { cartActions } = this.props;
      const { shippingOption } = this.paymentRequest;

      this.setState({
        shippingId: shippingOption,
      });

      cartActions
        .getUpdatedDetailsForShippingOption([shippingOption])
        .then((result) => {
          const updatedDetail = this.getPaymentData(result).details;
          event.updateWith(updatedDetail);
        })
        .catch(() => this.paymentRequest.fail());
    },
    1000,
    { trailing: false },
  );

  constructor(props) {
    super(props);
    this.state = {
      shippingId: null,
    };
    this.paymentRequest = null;
    this.methodData = [];
    this.details = {};
    this.options = {};

    stripe.setOptions({
      publishableKey:
        'pk_test_51Hcm2mDrV9B8Z7P9D4EijBxtUkA77bfI1e4AjcEBvN3ROJo6IRB25MPdiAiXzbpSieGodCmDAX5ZHGyVE2zUs52L0044SLn3PP',
      merchantId: config.applePayMerchantIdentifier,
    });
  }

  /**
   * Generates payment data.
   *
   * @param {object} cart - Cart information.
   *
   * @return {object}
   */
  getPaymentData = (cart) => {
    const vendorNames = [];
    const methodData = [];

    methodData.push({
      supportedMethods: ['apple-pay'],
      data: {
        merchantIdentifier: config.applePayMerchantIdentifier,
        supportedNetworks: config.applePaySupportedNetworks,
        countryCode: 'US',
        currencyCode: 'USD',
      },
    });

    const shippingOptions = [];
    const displayItems = [];
    cart.product_groups.forEach((group) => {
      vendorNames.push(group.name);

      Object.keys(group.shippings).forEach((k) => {
        const shipping = group.shippings[k];
        shippingOptions.push({
          id: k,
          label: shipping.shipping,
          amount: `${shipping.rate}`,
          detail: shipping.delivery_time,
        });
      });

      Object.keys(group.products)
        .map((k) => group.products[k])
        .forEach((p) => {
          displayItems.push({
            label: p.product,
            amount: `${p.price}`,
          });
        });
    });

    if (cart.discount) {
      displayItems.push({
        label: 'Discount',
        amount: `${cart.discount}`,
      });
    }
    if (cart.tax_subtotal) {
      displayItems.push({
        label: 'Tax',
        amount: `${cart.tax_subtotal}`,
      });
    }
    if (cart.subtotal) {
      displayItems.push({
        label: 'Subtotal',
        amount: `${cart.subtotal}`,
      });
    }

    displayItems.push({
      label: 'Simtech',
      amount: '10',
      type: 'pending',
    });

    const details = {
      id: vendorNames.join(', '),
      displayItems,
      shippingOptions,
      total: {
        label: config.applePayMerchantName,
        amount: {
          currency: 'USD',
          value: cart.total,
        },
      },
    };

    const options = {
      requestShipping: true,
    };

    return {
      methodData,
      details,
      options,
    };
  };

  /**
   * Creates a payment request.
   */
  initPaymentRequest = async () => {
    const { cart } = this.props;
    const { details } = this.getPaymentData(cart);
    this.paymentRequest = await stripe.paymentRequestWithNativePay(
      {
        requiredShippingAddressFields: ['all'],
        requiredBillingAddressFields: ['all'],
        shippingMethods: details.shippingOptions,
      },
      details.displayItems,
    );

    stripe.completeApplePayRequest();
  };

  /**
   * Works when the delivery address changes.
   */
  handleShippingAddressChange = (event) => {
    const { cart, cartActions } = this.props;
    const { shippingAddress } = this.paymentRequest;
    const data = {
      ...cart.user_data,
      b_county: shippingAddress.country,
      s_county: shippingAddress.country,
      b_city: shippingAddress.city,
      s_city: shippingAddress.city,
      b_address: shippingAddress.addressLine,
      s_address: shippingAddress.addressLine,
      phone: shippingAddress.phone,
      s_phone: shippingAddress.phone,
      b_phone: shippingAddress.phone,
      b_zipcode: shippingAddress.postalCode,
      s_zipcode: shippingAddress.postalCode,
    };
    cartActions
      .getUpdatedDetailsForShippingAddress(data)
      .then((result) => {
        const updatedDetail = this.getPaymentData(result).details;
        event.updateWith(updatedDetail);
      })
      .catch(() => {
        this.paymentRequest.fail();
      });
  };

  /**
   * Cancels the payment request on error.
   */
  handleShowError = () => {
    this.paymentRequest.removeEventListener(
      'shippingaddresschange',
      this.handleShippingAddressChange,
    );
    this.paymentRequest.removeEventListener(
      'shippingoptionchange',
      this.handleShippingOptionChange,
    );

    this.paymentRequest.abort();
  };

  /**
   * Saves the order, makes a request for payment.
   *
   * @param {string} paymentID - Payment ID.
   */
  handleApplePay = (paymentID) => {
    const {
      ordersActions,
      cartActions,
      paymentsActions,
      navigator,
      cart,
    } = this.props;

    this.paymentRequest
      .show()
      .then((paymentResponse) => {
        const { shippingOption } = paymentResponse;
        const { transactionIdentifier, paymentData } = paymentResponse.details;

        const orderInfo = {
          products: {},
          shipping_id: this.state.shippingId || shippingOption,
          payment_id: paymentID,
          user_data: cart.user_data,
        };

        Object.keys(cart.products).map((key) => {
          const p = cart.products[key];
          orderInfo.products[p.product_id] = {
            product_id: p.product_id,
            amount: p.amount,
            product_options: p.product_options,
          };
          return orderInfo;
        });

        return ordersActions
          .create(orderInfo)
          .then((response) => {
            const data = {
              order_id: response.data.order_id,
              payment_info: {
                ...paymentData,
                token: transactionIdentifier,
              },
            };
            return paymentsActions
              .settlements(data)
              .then((settlementsResponse) => ({
                settlements: settlementsResponse.data,
                order: response.data,
              }));
          })
          .then((result) => {
            setTimeout(() => {
              // Fixme: Show complete dialog after paymentResponse is complete.
              navigator.showModal({
                screen: 'CheckoutComplete',
                backButtonTitle: '',
                backButtonHidden: true,
                passProps: {
                  orderId: result.order.order_id, // FIXME
                },
              });
            }, 3000);
          })
          .then(() => {
            paymentResponse.complete('success');
            cartActions.clear();
          });
      })
      .catch((error) => this.handleShowError(error));
  };

  /**
   * Pressing the pay button.
   */
  handlePayPresed = () => {
    const { cart } = this.props;
    let paymentID = null;

    // FIXME: Find apple pay payment id.
    Object.keys(cart.payments).forEach((key) => {
      const payment = cart.payments[key];
      if (payment.template.endsWith('apple_pay.tpl')) {
        paymentID = payment.payment_id;
      }
    });

    if (!paymentID) {
      return;
    }

    this.initPaymentRequest();
    // this.handleApplePay(paymentID);
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { onPress } = this.props;
    if (Platform.OS === 'ios' && config.applePay) {
      return (
        <Button
          title="Pay with Pay"
          text="Pay with Pay"
          disabledText="Not supported"
          onPress={() => onPress(this.handlePayPresed)}
        />
      );
    }
    return null;
  }
}

export default connect(
  (state) => ({
    cart: state.cart,
  }),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
  }),
)(InAppPayment);
