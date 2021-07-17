/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';
import { format } from 'date-fns';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';

// Components
import FormBlock from '../components/FormBlock';
import FormBlockField from '../components/FormBlockField';
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';
import { formatPrice, getImagePath } from '../utils';
import Api from '../services/api';
import * as nav from '../services/navigation';

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
 * @reactProps {object} notificationsActions - Notifications functions.
 * @reactProps {string} orderId - Order id.
 */
export class OrderDetail extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    notificationsActions: PropTypes.shape({
      show: PropTypes.func,
    }),
    orderId: PropTypes.string,
  };

  /**
   * @ignore
   */
  static options = {
    topBar: {
      title: {
        text: i18n.t('Order Detail').toUpperCase(),
      },
    },
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      orderDetail: {},
      fields: {},
    };
  }

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
   * Gets order information.
   */
  componentWillMount() {
    const { orderId, notificationsActions } = this.props;

    Api.get(`/sra_orders/${orderId}`)
      .then((response) => {
        const params = {
          location: 'checkout',
          action: 'update',
        };

        Api.get('/sra_profile', { params }).then(({ data }) => {
          const { fields } = data;
          delete fields.E;

          this.setState({
            fetching: false,
            orderDetail: response.data,
            fields,
          });
        });
      })
      .catch(() => {
        notificationsActions.show({
          type: 'info',
          title: i18n.t('Information'),
          text: i18n.t('Order not found.'),
        });
        setTimeout(() => {
          nav.selectTab('profile');
        });
      });
  }

  /**
   * Renders a product from an order.
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
   * Renders order informations blocks (contacts, shipping, billing).
   *
   * @param {array} orderDetail - Order information.
   * @param {object} fields - Contents information about blocks.
   */
  renderFields() {
    const { orderDetail, fields } = this.state;

    return Object.entries(fields).map(([key, section]) => {
      const country = { code: null, name: null };
      const state = { name: null };

      // Search for country (if exist)
      section.fields.forEach((field) => {
        if (field.field_type === 'O') {
          country.code = field.value;
          country.name = field.values[orderDetail[field.field_id]];
        }
      });

      // Search for state (if exist)
      if (country.code) {
        section.fields.forEach((field) => {
          if (field.field_type === 'A' && field.values[country.code]) {
            state.name =
              field.values[country.code][orderDetail[field.field_id]];
          }
        });
      }

      return (
        <FormBlock
          key={key}
          title={section.description}
          style={styles.formBlockWraper}>
          <View>
            {section.fields.map((field) => {
              if (orderDetail[field.field_id]) {
                return (
                  <FormBlockField
                    title={`${field.description}:`}
                    key={field.field_id}>
                    {field.field_type === 'O' && country.name
                      ? country.name
                      : field.field_type === 'A' && state.name
                      ? state.name
                      : orderDetail[field.field_id]}
                  </FormBlockField>
                );
              }

              return null;
            })}
          </View>
        </FormBlock>
      );
    });
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { orderDetail, fetching } = this.state;
    const { settings } = this.props;
    if (fetching) {
      return (
        <View style={styles.container}>
          <Spinner visible />
        </View>
      );
    }

    const productsList = orderDetail.product_groups.map((group) => {
      const products = Object.keys(group.products).map(
        (k) => group.products[k],
      );
      return products.map((p, i) => this.renderProduct(p, i));
    });

    const shippingMethodsList = orderDetail.shipping.map((s, index) => (
      <Text key={index}>{s.shipping}</Text>
    ));

    const date = new Date(orderDetail.timestamp * 1000);
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.mainHeader}>
            {i18n.t('Order')} #{orderDetail.order_id}
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

          <FormBlock>
            <Text style={styles.header}>{i18n.t('Summary').toUpperCase()}</Text>
            <View style={styles.formBlockWraper}>
              <FormBlockField title={`${i18n.t('Payment method')}:`}>
                {orderDetail.payment_method.payment}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Shipping method')}:`}>
                {shippingMethodsList}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Subtotal')}:`}>
                {formatPrice(orderDetail.subtotal_formatted.price)}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Shipping cost')}:`}>
                {formatPrice(orderDetail.shipping_cost_formatted.price)}
              </FormBlockField>
              <FormBlockField title={`${i18n.t('Total')}:`}>
                {formatPrice(orderDetail.total_formatted.price)}
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
    auth: state.auth,
    settings: state.settings,
  }),
  (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
  }),
)(OrderDetail);
