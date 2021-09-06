import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swipeout from 'react-native-swipeout';
import { get } from 'lodash';
import { connect } from 'react-redux';

// Components
import { QtyOption } from './QtyOption';

import FastImage from 'react-native-fast-image';

// Links
import i18n from '../utils/i18n';
import { getImagePath, isPriceIncludesTax } from '../utils';

// Theme
import theme from '../config/theme';

// Styles
const styles = EStyleSheet.create({
  fullView: {
    marginTop: 20,
    marginLeft: 17,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#A26EA6',
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItemImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  // productItem: {
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: '#F1F1F1',
  //   flexDirection: 'row',
  //   // paddingBottom: 8,
  //   width: '95%',
  //   height: '105%',
  //   // overflow: 'hidden',
  //   alignSelf: 'center',
  //   marginTop: 20,
  //   borderRadius: 10,

  // },
  topview: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.3,
    borderColor: 'rgba(162, 110, 166, 0.5)',

    paddingVertical: 15,

    // width: 130,
    // height: 130,
    // resizeMode: 'cover',
    // // marginTop: 20,
    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius:20,
  },
  productItemDetail: {
    marginLeft: 40,
    marginRight: 14,
    width: '30%',
  },
  productItemName: {
    fontSize: 15,
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },

  textname: {
    // textAlign: 'center',
    // fontWeight: 'bold',
    // marginRight: 20,
    // marginTop: 40,
    // fontSize: 15,
    // marginLeft:10,
  },
  bottomview: {
    // flexDirection:'row',
    //   fontSize: '1.0rem',
    //   color: 'black',
    //  marginLeft:150,
    //   marginTop: -10,
    //   fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '90%',
  },
  name: {
    fontSize: '0.9rem',
    marginLeft: 20,
    width: 150,
  },
  Image: {
    width: 120,
    height: 120,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
  },
  incrementbtn: {
    fontSize: 10,
  },
});

/**
 * Renders a product.
 *
 * @param {object} cartActions - Cart actions.
 * @param {object} item - Product infromation.
 *
 * @return {JSX.Element}
 */
const CartProductItem = ({ cartActions, item, cart }) => {
  /**
   * Changes the quantity of product.
   *
   * @param {object} item - Product infromation.
   * @param {number} amount - Amount of product.
   */
  const [show_onchange_loading, set_loading] = useState(false);
  const handleChangeAmountRequest = async (item, amount) => {
    const newItem = { ...item, amount, coupons: cart.coupons };
    var a = await cartActions.change(newItem.cartId, newItem);
    set_loading(false);
  };

  /**
   * Removes product.
   *
   * @param {object} product - Product infromation.
   */
  const handleRemoveProduct = async (product) => {
    var a = await cartActions.remove(product.cartId, cart.coupons);
    set_loading(false);
  };

  /**
   * Gets product image path. Creats image component.
   */
  let productImage = null;
  const imageUri = getImagePath(item);
  if (imageUri) {
    productImage = (
      <FastImage
        source={{ uri: imageUri }}
        style={styles.productItemImage}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }

  /**
   * Settings of swipeout.
   */
  const swipeoutBtns = [
    {
      text: i18n.t('Delete'),
      type: 'delete',
      onPress: () => handleRemoveProduct(item),
    },
  ];

  /**
   * Settings for choosing the quantity of product.
   */
  const step = parseInt(item.qty_step, 10) || 1;
  const max = parseInt(item.max_qty, 10) || parseInt(item.in_stock, 10);
  const min = parseInt(item.min_qty, 10) || step;
  const initialValue = parseInt(item.amount, 10);

  /**
   * Calculates price of product including taxes.
   */
  const productTaxedPrice = get(item, 'display_price_formatted.price', '');
  const productPrice =
    productTaxedPrice || get(item, 'price_formatted.price', '');
  const showTaxedPrice = isPriceIncludesTax(item);

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  return (
    <View style={styles.fullView}>
      <View style={styles.topview}>
        <View>{productImage}</View>

        {/* <Image style={styles.Image}
          source={{uri: 'https://firebasestorage.googleapis.com/v0/b/siraan-68555.appspot.com/o/49735714502_f1b80c86ca_b.png?alt=media&token=bffbab85-4729-4573-ac44-3da8ed9567d4'}}
      /> */}

        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={styles.price}>
            {`${item.amount} x ${productPrice}`}
            {showTaxedPrice && (
              <Text style={styles.smallText}>
                {` (${i18n.t('Including tax')})`}
              </Text>
            )}
          </Text>

          <View>
            <Text
              style={{ ...styles.name, ...styles.productItemName }}
              numberOfLines={1}>
              {item.product}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ ...styles.bottomview }}>
        <View>
          {!item.exclude_from_calculate && (
            <QtyOption
              max={max}
              min={min}
              initialValue={initialValue}
              step={step}
              onChange={(val) => {
                if (
                  val <= parseInt(item.in_stock, 10) ||
                  item.out_of_stock_actions === 'B'
                ) {
                  set_loading(true);
                  cartActions.changeAmount(item.cartId, val, item.company_id);
                  handleChangeAmountRequest(item, val);
                }
              }}
            />
          )}
        </View>
        <Pressable
          onPress={() => {
            set_loading(true);
            handleRemoveProduct(item);
          }}>
          <Text
            style={{
              fontSize: 13,
              color: '#A26EA6',
              justifyContent: 'space-between',
            }}>
            Remove From Cart
          </Text>
        </Pressable>
      </View>

      {show_onchange_loading ? (
        <View
          style={{
            borderRadius: 10,
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
            zIndex: 100,
          }}>
          <ActivityIndicator
            // size="large"
            size={45}
            style={styles.indicator}
            color="#7c2981"
          />
        </View>
      ) : null}
    </View>
  );
};

CartProductItem.propTypes = {
  cartActions: PropTypes.shape({}),
  item: PropTypes.shape({}),
};

export default connect((state) => ({
  cart: state.cart,
}))(CartProductItem);
