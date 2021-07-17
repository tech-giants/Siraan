import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format } from 'date-fns';

// Import actions.
import * as ordersActions from '../../actions/vendorManage/ordersActions';

// Components
import FormBlock from '../../components/FormBlock';
import FormBlockField from '../../components/FormBlockField';
import Spinner from '../../components/Spinner';

import i18n from '../../utils/i18n';
import { formatPrice, getImagePath } from '../../utils';
import { Navigation } from 'react-native-navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
  mainHeader: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  formBlockWraper: {
    marginTop: 14,
  },
  subHeader: {
    fontSize: '0.8rem',
    color: '#7C7C7C',
    marginBottom: 24,
    textAlign: 'left',
  },
  header: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  date: {
    fontSize: '0.7rem',
    color: '#7C7C7C',
  },
  flexWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productsWrapper: {
    marginTop: 14,
  },
  productItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  productItemImage: {
    width: 100,
    height: 100,
  },
  productItemDetail: {
    marginLeft: 14,
    width: '70%',
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
    textAlign: 'left',
  },
});

/**
 * Renders order detail screen.
 *
 * @reactProps {number} orderId - Order id.
 * @reactProps {boolean} fetching - Fetching indicator.
 * @reactProps {object} ordersActions - Orders actions.
 * @reactProps {object} order - Order information.
 */
export class OrderDetail extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    orderId: PropTypes.number,
    fetching: PropTypes.bool,
    ordersActions: PropTypes.shape({
      fetchOrder: PropTypes.func,
    }),
    order: PropTypes.shape({}),
  };

  /**
   * Gets wishlist. Sets header setup.
   */
  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Order Detail').toUpperCase(),
        },
      },
    });
  }

  /**
   * Gets order data, else closes modal.
   */
  async componentWillMount() {
    const { orderId, ordersActions } = this.props;
    const data = await ordersActions.fetchOrder(orderId);

    if (!data) {
      setTimeout(() => {
        Navigation.pop(this.props.componentId);
      });
    }
  }

  /**
   * Renders product.
   *
   * @param {object} item - Product information.
   * @param {number} index - Product index.
   *
   * @return {JSX.Element}
   */
  renderProduct = (item, index) => {
    let productImage = null;
    const imageUri = getImagePath(item);

    if (imageUri) {
      productImage = (
        <Image source={{ uri: imageUri }} style={styles.productItemImage} />
      );
    }

    return (
      <View style={styles.productItem} key={index}>
        {productImage}
        <View style={styles.productItemDetail}>
          <Text style={styles.productItemName} numberOfLines={1}>
            {item.product}
          </Text>
          <Text style={styles.productItemPrice}>
            {`${item.amount} x ${formatPrice(item.price_formatted.price)}`}
          </Text>
        </View>
      </View>
    );
  };

  /**
   * Renders row in the form.
   *
   * @param {string} title - Row title.
   * @param {string} text - Row text.
   *
   * @return {JSX.Element}
   */
  renderFieldRow = (title, text) => {
    if (text === '') {
      return null;
    }
    return <FormBlockField title={title}>{text}</FormBlockField>;
  };

  /**
   * Renders all information blocks.
   *
   * @return {JSX.Element}
   */
  renderFields() {
    const { order } = this.props;

    return (
      <React.Fragment>
        <FormBlock
          title={i18n.t('Contact information')}
          style={styles.formBlockWraper}>
          <View>
            {this.renderFieldRow(i18n.t('Email:'), order.email)}
            {this.renderFieldRow(i18n.t('Phone:'), order.phone)}
          </View>
        </FormBlock>
        <FormBlock
          title={i18n.t('Billing address')}
          style={styles.formBlockWraper}>
          <View>
            {this.renderFieldRow(i18n.t('First name:'), order.b_firstname)}
            {this.renderFieldRow(i18n.t('Last name:'), order.b_lastname)}
            {this.renderFieldRow(i18n.t('Address:'), order.b_address)}
            {this.renderFieldRow(i18n.t('City:'), order.b_city)}
            {this.renderFieldRow(i18n.t('State:'), order.b_state_descr)}
            {this.renderFieldRow(i18n.t('Country:'), order.b_country_descr)}
            {this.renderFieldRow(i18n.t('Zip code:'), order.b_zipcode)}
          </View>
        </FormBlock>
        <FormBlock
          title={i18n.t('Shipping address')}
          style={styles.formBlockWraper}>
          <View>
            {this.renderFieldRow(i18n.t('First name:'), order.s_firstname)}
            {this.renderFieldRow(i18n.t('Last name:'), order.s_lastname)}
            {this.renderFieldRow(i18n.t('Address:'), order.s_address)}
            {this.renderFieldRow(i18n.t('City:'), order.s_city)}
            {this.renderFieldRow(i18n.t('State:'), order.s_state_descr)}
            {this.renderFieldRow(i18n.t('Country:'), order.sb_country_descr)}
            {this.renderFieldRow(i18n.t('Zip code:'), order.s_zipcode)}
          </View>
        </FormBlock>
      </React.Fragment>
    );
  }

  /**
   * Renders status of order.
   *
   * @return {JSX.Element}
   */
  renderStatus = () => {
    const { order } = this.props;

    return (
      <FormBlock style={styles.formBlockWraper}>
        <View>
          {this.renderFieldRow(i18n.t('Status'), order.status_data.description)}
        </View>
      </FormBlock>
    );
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { order, fetching, settings } = this.props;

    if (fetching) {
      return (
        <View style={styles.container}>
          <Spinner visible />
        </View>
      );
    }

    const productsList = order.products.map((p, i) => this.renderProduct(p, i));

    const shippingMethodsList = order.shipping.map((s, index) => (
      <Text key={index}>{s.shipping}</Text>
    ));

    const date = new Date(order.timestamp * 1000);
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.mainHeader}>
            {i18n.t('Order')} #{order.order_id}
          </Text>
          <Text style={styles.subHeader}>
            {i18n.t('Placed on')} {format(date, settings.dateFormat)}
          </Text>

          <FormBlock>
            <Text style={styles.header}>
              {i18n.t('Products information').toUpperCase()}
            </Text>
            <View style={styles.productsWrapper}>{productsList}</View>
          </FormBlock>

          {this.renderStatus()}

          <FormBlock>
            <Text style={styles.header}>{i18n.t('Summary').toUpperCase()}</Text>
            <View style={styles.formBlockWraper}>
              <FormBlockField title={`${i18n.t('Payment method')}:`}>
                {order.payment_method.payment}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Shipping method')}:`}>
                {shippingMethodsList}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Subtotal')}:`}>
                {formatPrice(order.subtotal_formatted.price)}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Shipping cost')}:`}>
                {formatPrice(order.shipping_cost_formatted.price)}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Total')}:`}>
                {formatPrice(order.total_formatted.price)}
              </FormBlockField>
            </View>
          </FormBlock>

          {this.renderFields()}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    order: state.vendorManageOrders.current,
    fetching: state.vendorManageOrders.loadingCurrent,
    settings: state.settings,
  }),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(OrderDetail);
