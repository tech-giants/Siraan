import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import FormBlock from '../components/FormBlock';
import FormBlockField from '../components/FormBlockField';
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';
import Api from '../services/api';
import { formatPrice, getImagePath } from '../utils';

import { iconsMap } from '../utils/navIcons';
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
  },
  subHeader: {
    fontSize: '0.8rem',
    color: '#7C7C7C',
    marginBottom: 24,
  },
  header: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
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
    marginTop: 30,
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
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
  },
});

/**
 * Renders the screen after a successful checkout.
 *
 * @reactProps {number} orderId - Order id.
 * @reactProps {object} navigator - Navigator.
 */
export class CheckoutComplete extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    orderId: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      orderDetail: {},
      fields: {},
    };

    Navigation.events().bindComponent(this);
  }

  /**
   * Sets title. Loads icons. Gets order data.
   */
  componentWillMount() {
    const { orderId } = this.props;
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Checkout complete').toUpperCase(),
        },
        backButton: {
          visible: false,
        },
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });

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
      .catch((e) => {
        console.log('ERROR get order: ', e);
        this.setState({
          fetching: false,
        });
      });
  }

  /**
   * Cart modal navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.setStackRoot(this.props.componentId, {
        component: {
          name: 'Cart',
        },
      });
    }
  }

  /**
   * Renders product.
   *
   * @param {object} item - Product information.
   * @param {number} index - Product index.
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
   * Renders general order information.
   *
   * @return {JSX.Element}
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

    const date = new Date(orderDetail.timestamp * 1000);

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.mainHeader}>{i18n.t('Congratulations!')}</Text>
          <Text style={styles.subHeader}>
            {i18n.t('Your order has been successfully placed.')}
          </Text>
          <FormBlock>
            <View style={styles.flexWrap}>
              <Text style={styles.header}>
                {i18n.t('order').toUpperCase()} #{orderDetail.order_id}
              </Text>
              <Text style={styles.date}>
                {`${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}
              </Text>
            </View>

            <View style={styles.productsContainer}>
              <Text style={styles.header}>
                {i18n.t('Products information').toUpperCase()}
              </Text>
              <View style={styles.productsWrapper}>{productsList}</View>
            </View>
          </FormBlock>

          {this.renderFields()}
        </ScrollView>
      </View>
    );
  }
}

export default connect((state) => ({
  cart: state.cart,
  auth: state.auth,
}))(CheckoutComplete);
