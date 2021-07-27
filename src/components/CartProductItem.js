import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image,Button,Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swipeout from 'react-native-swipeout';
import { get } from 'lodash';
import { connect } from 'react-redux';

// Components
import { QtyOption } from './QtyOption';

// Links
import i18n from '../utils/i18n';
import { getImagePath, isPriceIncludesTax } from '../utils';

// Theme
import theme from '../config/theme';

// Styles
const styles = EStyleSheet.create({
  fullView: {
    marginTop:20,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#A26EA6',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
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
    fontSize:15,
  },
  
  
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft:20,
   marginTop:20,
 
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
    width: '90%'
  },
  name: {
    fontSize: '0.9rem',
    marginLeft: 20,
    width:150,
  },
  Image: {
    width: 120,
    height: 120,
    marginTop: 10,
    marginLeft: 20,
    borderRadius:10,
    
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
  const handleChangeAmountRequest = (item, amount) => {
    const newItem = { ...item, amount, coupons: cart.coupons };
    cartActions.change(newItem.cartId, newItem);
  };

  /**
   * Removes product.
   *
   * @param {object} product - Product infromation.
   */
  const handleRemoveProduct = (product) => {
    cartActions.remove(product.cartId, cart.coupons);
  };

  /**
   * Gets product image path. Creats image component.
   */
  let productImage = null;
  const imageUri = getImagePath(item);
  if (imageUri) {
    productImage = (
      <Image source={{ uri: imageUri }} style={styles.productItemImage} />
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

        <View style={styles.image}>
       <Image style={styles.Image}
          source={{uri: 'https://firebasestorage.googleapis.com/v0/b/siraan-68555.appspot.com/o/49735714502_f1b80c86ca_b.png?alt=media&token=bffbab85-4729-4573-ac44-3da8ed9567d4'}}
      />
        </View>
        <View style={{ justifyContent: 'flex-start'}}>
          <Text style={styles.price}>
            {`${item.amount} x ${productPrice}`}
              {showTaxedPrice && (
                <Text style={styles.smallText}>
                  {` (${i18n.t('Including tax')})`}
                </Text>
              )}
          </Text>
            
          <View >
            <Text  style={{ ...styles.name, ...styles.productItemName }} numberOfLines={1}>{item.product}</Text>
            
             </View>
        </View>


      </View>


      <View style={{...styles.bottomview, }}>
        <View  >
          
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
                    cartActions.changeAmount(item.cartId, val, item.company_id);
                    handleChangeAmountRequest(item, val);
                  }
                }}
                />
                )}
                </View>
             <Pressable >
              <Text style={{fontSize:13,color:'#A26EA6',justifyContent:'space-between'}}>Remove From Cart
              </Text>
            </Pressable>
         
          

      </View>
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
