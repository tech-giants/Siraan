import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Import actions.
import * as ordersActions from '../actions/ordersActions';
import * as cartActions from '../actions/cartActions';
import * as paymentsActions from '../actions/paymentsActions';

// Components
import StepByStepSwitcher from '../components/StepByStepSwitcher';
import CartFooter from '../components/CartFooter';
import FormBlock from '../components/FormBlock';
import PaymentPhoneForm from '../components/PaymentPhoneForm';
import PaymentCreditCardForm from '../components/PaymentCreditCardForm';
import PaymentEmpty from '../components/PaymentEmpty';
import PaymentCheckForm from '../components/PaymentCheckForm';
import PaymentPaypalForm from '../components/PaymentPaypalForm';
import PaymentYandexKassaForm from '../components/PaymentYandexKassaForm';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';
import { stripTags, formatPrice } from '../utils';
import i18n from '../utils/i18n';
import * as nav from '../services/navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  paymentItemWrapper: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 10,
  },
  paymentItem: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  paymentItemText: {
    fontSize: '0.9rem',
  },
  paymentItemDesc: {
    fontSize: '0.8rem',
    paddingBottom: 6,
    color: 'gray',
    marginTop: 10,
  },
  uncheckIcon: {
    fontSize: '1rem',
    marginRight: 6,
  },
  checkIcon: {
    fontSize: '1rem',
    marginRight: 6,
  },
  stepsWrapper: {
    padding: 14,
  },
});

const TPL_CREDIT_CARD = 'views/orders/components/payments/cc.tpl';
const TPL_EMPTY = 'views/orders/components/payments/empty.tpl';
const TPL_CHECK = 'views/orders/components/payments/check.tpl';
const TPL_PHONE = 'views/orders/components/payments/phone.tpl';
const TPL_COD = 'views/orders/components/payments/cod.tpl';
const SUPPORTED_PAYMENT_TPLS = [
  TPL_CREDIT_CARD,
  TPL_EMPTY,
  TPL_CHECK,
  TPL_PHONE,
  TPL_COD,
];

const SCRIPT_YOOKASSA = 'yandex_checkout.php';
const SCRIPT_YOOKASSA_FOR_MARKETPLACES = 'yandex_checkout_for_marketplaces.php';
const SCRIPT_YOOKASSA_LEGACY = 'yandex_money.php';
const SCRIPT_PAYPAL_EXPRESS = 'paypal_express.php';
const SUPPORTED_PAYMENT_SCRIPTS = [
  SCRIPT_YOOKASSA,
  SCRIPT_YOOKASSA_FOR_MARKETPLACES,
  SCRIPT_YOOKASSA_LEGACY,
  SCRIPT_PAYPAL_EXPRESS,
];

/**
 * Checkout. Payment screen.
 *
 * @reactProps {object} cart - Cart information.
 * @reactProps {object} cartActions - Cart actions.
 * @reactProps {object} paymentsActions - Payments actions.
 * @reactProps {object} ordersActions - Orders actions.
 * @reactProps {string} shipping_id - Shipping id.
 */
export class CheckoutPayment extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    paymentsActions: PropTypes.shape({
      settlements: PropTypes.func,
    }),
    ordersActions: PropTypes.shape({
      create: PropTypes.func,
    }),
    shipping_id: PropTypes.string,
    cartActions: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      selectedItem: null,
      items: [],
    };
  }

  /**
   * Defines the available payment methods.
   */
  componentDidMount() {
    const { cart } = this.props;
    const items = Object.keys(cart.payments)
      .map((k) => cart.payments[k])
      .filter(
        (p) =>
          SUPPORTED_PAYMENT_TPLS.includes(p.template) ||
          SUPPORTED_PAYMENT_SCRIPTS.includes(p.script),
      );
    // FIXME: Default selected payment method.
    const selectedItem = items[0];

    this.setState({
      items,
      selectedItem,
    });
  }

  /**
   * Place order button.
   */
  handlePlaceOrder() {
    const { selectedItem } = this.state;
    if (!selectedItem) {
      return null;
    }

    if (SUPPORTED_PAYMENT_SCRIPTS.includes(selectedItem.script)) {
      return this.placeSettlements();
    }

    return this.placeOrderAndComplete();
  }

  /**
   * Redirects to CheckoutComplete.
   */
  placeOrderAndComplete() {
    const { cart, ordersActions, cartActions, storeCart } = this.props;
    let { shipping_id } = this.props;
    const values = this.paymentFormRef.getValue();

    if (!values) {
      return null;
    }

    this.setState({
      fetching: true,
    });

    if (!cart?.isShippingRequired) {
      shipping_id = 0;
    }

    const orderInfo = {
      products: {},
      coupon_codes: Object.keys(cart.coupons),
      shipping_id,
      payment_id: this.state.selectedItem.payment_id,
      user_data: cart.user_data,
      ...values,
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

    if (values.phone) {
      orderInfo.payment_info = {
        ...orderInfo.payment_info,
        customer_phone: values.phone,
      };
    } else if (values.cardNumber) {
      orderInfo.payment_info = {
        ...orderInfo.payment_info,
        card_number: values.cardNumber,
        expiry_month: values.expiryMonth,
        expiry_year: values.expiryYear,
        cardholder_name: values.cardholderName,
        cvv2: values.ccv,
      };
    }

    ordersActions
      .create(orderInfo)
      .then(({ data }) => {
        this.setState({
          fetching: false,
        });
        if (!data) {
          return;
        }
        cartActions.clear(cart, storeCart.coupons);
        nav.pushCheckoutComplete(this.props.componentId, {
          orderId: data.order_id,
        });
      })
      .catch(() => {
        this.setState({
          fetching: false,
        });
      });
    return null;
  }

  /**
   * Redirects to SettlementsCompleteWebView.
   */
  placeSettlements() {
    const { cart, shipping_id, ordersActions, paymentsActions } = this.props;

    const orderInfo = {
      products: {},
      coupon_codes: cart.coupons,
      shipping_id,
      payment_id: this.state.selectedItem.payment_id,
      user_data: cart.user_data,
    };
    Object.keys(cart.products).map((key) => {
      const p = cart.products[key];
      orderInfo.products[p.product_id] = {
        product_id: p.product_id,
        amount: p.amount,
      };
      return orderInfo;
    });

    this.setState({
      fetching: true,
    });

    ordersActions
      .create(orderInfo)
      .then(({ data }) => {
        this.setState({
          fetching: false,
        });

        if (!data) {
          return;
        }

        const settlementData = {
          order_id: data.order_id,
          replay: false,
        };
        paymentsActions.settlements(settlementData).then((response) => {
          nav.pushSettlementsCompleteWebView(this.props.componentId, {
            title: this.state.selectedItem.payment,
            orderId: data.order_id,
            cart,
            ...response.data.data,
          });
        });
      })
      .catch(() => {
        this.setState({
          fetching: false,
        });
      });
    return null;
  }

  /**
   * Renders payment methods.
   *
   * @param {object} item - Payment method information.
   *
   * @return {JSX.Element}
   */
  renderItem = (item) => {
    const { payment } = this.state.selectedItem;
    // FIXME compare by name.
    const isSelected = item.payment === payment;
    return (
      <Pressable
        style={styles.paymentItem}
        onPress={() => {
          this.setState(
            {
              selectedItem: item,
            },
            () => {
              this.listView.scrollToOffset({ x: 0, y: 0, animated: true });
            },
          );
        }}>
        {isSelected ? (
          <Icon name="radio-button-checked" style={styles.checkIcon} />
        ) : (
          <Icon name="radio-button-unchecked" style={styles.uncheckIcon} />
        )}
        <Text style={styles.paymentItemText}>{stripTags(item.payment)}</Text>
      </Pressable>
    );
  };

  /**
   * Renders header.
   *
   * @return {JSX.Element}
   */
  renderHeader = () => {
    const { currentStep } = this.props;
    return (
      <View style={styles.stepsWrapper}>
        <StepByStepSwitcher currentStep={currentStep} />
      </View>
    );
  };

  /**
   * Renders form fields.
   *
   * @return {JSX.Element}
   */
  renderFooter() {
    const { cart } = this.props;
    const { selectedItem } = this.state;
    if (!selectedItem) {
      return null;
    }
    let form = null;
    // FIXME: HARDCODE
    switch (selectedItem.template) {
      case TPL_EMPTY:
        form = (
          <PaymentEmpty
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case TPL_CREDIT_CARD:
        form = (
          <PaymentCreditCardForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case TPL_CHECK:
        form = (
          <PaymentCheckForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case TPL_PHONE:
        form = (
          <PaymentPhoneForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
            value={{ phone: cart.user_data.b_phone }}
          />
        );
        break;
      case TPL_COD:
        form = (
          <PaymentEmpty
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;

      default:
        break;
    }

    switch (selectedItem.script) {
      case SCRIPT_PAYPAL_EXPRESS:
        form = (
          <PaymentPaypalForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case SCRIPT_YOOKASSA:
      case SCRIPT_YOOKASSA_FOR_MARKETPLACES:
      case SCRIPT_YOOKASSA_LEGACY:
        form = (
          <PaymentYandexKassaForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;

      default:
        break;
    }

    return (
      <View style={styles.paymentItemWrapper}>
        <FormBlock title={selectedItem.payment}>
          {form}
          <Text style={styles.paymentItemDesc}>
            {stripTags(selectedItem.instructions)}
          </Text>
        </FormBlock>
      </View>
    );
  }

  /**
   * Renders spinner.
   *
   * @return {JSX.Element}
   */
  renderSpinner = () => {
    const { fetching } = this.state;
    return <Spinner visible={fetching} mode="modal" />;
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { cart } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <FlatList
            ref={(ref) => {
              this.listView = ref;
            }}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => this.renderFooter()}
            data={this.state.items}
            keyExtractor={(item, index) => `${index}`}
            numColumns={1}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </KeyboardAwareScrollView>
        <CartFooter
          totalPrice={formatPrice(cart.total_formatted.price)}
          btnText={i18n.t('Place order').toUpperCase()}
          isBtnDisabled={false}
          onBtnPress={() => this.handlePlaceOrder()}
        />
        {this.renderSpinner()}
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    storeCart: state.cart,
  }),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
  }),
)(CheckoutPayment);
