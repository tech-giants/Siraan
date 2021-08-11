import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, Image, Pressable, Dimensions, Button } from 'react-native';
import toInteger from 'lodash/toInteger';
import get from 'lodash/get';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_IMAGE_WIDTH, formatPrice, getImagePath } from '../utils';
import i18n from '../utils/i18n';
import StarsRating from '../components/StarsRating';
import { PRODUCT_NUM_COLUMNS } from '../utils';
import * as cartActions from '../actions/cartActions';
import { bindActionCreators } from 'redux';
import * as nav from '../services/navigation';
import FastImage from 'react-native-fast-image'

const RATING_STAR_SIZE = 14;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  container: {
    borderWidth: 1,
    // borderColor: '$productBorderColor',
    borderColor: '#ddcbde',
    borderRadius: '$borderRadius',
    backgroundColor: '#fff',
    margin: 5,
    // padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 230,
    flex: 2,
    // maxWidth: `${Math.floor(94 / PRODUCT_NUM_COLUMNS)}%`,
    width: windowWidth / 2.1,
  },
  styledViewContainer: {
    borderWidth: 0.5,
    borderColor: '#a0a0a0',
    // borderColor: '$productBorderColor',
    // borderRadius: '$borderRadius',
    // backgroundColor: 'red',
    // margin: 5,
    // padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 250,
    maxHeight: 280,
    // flex: 2,
    width: windowWidth / 2,
    // width: '100%',
    paddingHorizontal: 5,
    // maxWidth: `${Math.floor(94 / PRODUCT_NUM_COLUMNS)}%`,
    // maxWidth: 150,
  },
  styledListViewContainer: {
    borderWidth: 0.5,
    borderColor: '#a0a0a0',
    // borderColor: '$productBorderColor',
    // borderRadius: '$borderRadius',
    // backgroundColor: 'red',
    // margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    minHeight: 150,
    flex: 1,
    width: windowWidth,
    // width: '100%',
    // maxWidth: `${Math.floor(94 / PRODUCT_NUM_COLUMNS)}%`,
    // maxWidth: 150,
  },
  productImage: {
    width: PRODUCT_IMAGE_WIDTH,
    height: PRODUCT_IMAGE_WIDTH,
  },
  description: {
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  descriptionList: {
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    // width: '90%',
    flex: 1,
  },
  productName: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  productNameList: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '0.9rem',
    maxWidth: '100%',
    overflow: 'visible',
    flex:1,
  },
  productPrice: {
    fontSize: 14,
    color: '#7c2781',
    fontWeight: 'bold',
    // textAlign: 'left',
  },
  productDiscountPrice: {
    fontSize: 14,
    color: '#73626B',
    // fontWeight: 'bold',
    textAlign: 'left',
    textDecorationLine: 'line-through',
    marginHorizontal: 5,
  },
  listDiscountWrapper: {
    backgroundColor: '$productDiscountColor',
    position: 'absolute',
    top: 4,
    right: 4,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: '$borderRadius',
  },
  priceWrapper: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'red',
    maxHeight: 30,
  },
  listPriceText: {
    textDecorationLine: 'line-through',
    color: '$darkColor',
    textAlign: 'left',
    paddingRight: 4,
    paddingTop: 2,
    fontSize: 12,
  },
  listDiscountText: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 12,
  },
  rating: {
    marginLeft: -10,
    marginRight: -10,
    marginTop: 0,
  },
  addToCartBtnView: {
    position: 'absolute',
    bottom: 10,
    // backgroundColor: 'red',
    // paddingHorizontal: 10,
    // // paddingVertical: 5,
    // borderColor: '#8D6F18',
    // borderWidth: 1,
    // borderRadius: 10,
    // backgroundColor: '#E8E2D0',
    width: '100%',
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartBtnPress: {
    paddingHorizontal: 10,
    borderColor: '#8D6F18',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#E8E2D0',
    // width: '100%',
  },
});

/**
 * Renders a product card.
 *
 * @reactProps {object} product - Product information.
 * @reactProps {function} onPress - Opens product screen.
 */
class ProductListView extends PureComponent {
  /**
   * @ignore
   */
  static propTypes = {
    product: PropTypes.shape({
      item: PropTypes.object,
    }),
    onPress: PropTypes.func,
    styledView: PropTypes.bool,
    viewStyle: PropTypes.string,
    location: PropTypes.string,
    cart: PropTypes.object,
    auth: PropTypes.object,
    cartActions: PropTypes.shape({
      add: PropTypes.func,
    }),
  };

  /**
   * Renders discount.
   *
   * @return {JSX.Element}
   */
  renderDiscount = () => {
    const { product } = this.props;
    const { item } = product;

    if (!item.list_discount_prc && !item.discount_prc) {
      return null;
    }

    const discount = item.list_discount_prc || item.discount_prc;

    return (
      <View style={styles.listDiscountWrapper}>
        <Text style={styles.listDiscountText}>
          {i18n.t()} {`${discount}% off`}
        </Text>
      </View>
    );
  };
  handleAddToCart(showNotification = true, product) {
    const productOptions = {};

    if (!this.props.auth.logged) {
      return nav.showLogin();
    }

    const currentProduct = product;
    product.selectedOptions = {};
    // Convert product options to the option_id: variant_id array.

    Object.keys(product.selectedOptions).forEach((k) => {
      productOptions[k] = product.selectedOptions[k];
      if (product.selectedOptions[k].variant_id) {
        productOptions[k] = product.selectedOptions[k].variant_id;
      }
    });

    const products = {
      [currentProduct.product_id]: {
        product_id: currentProduct.product_id,
        amount: 1,
        product_options: productOptions,
      },
    };

    return this.props.cartActions.add(
      { products },
      showNotification,
      this.props.cart.coupons,
    );
  }
  /**
   * Renders price.
   *
   * @return {JSX.Element}
   */
  renderPrice = () => {
    const { product } = this.props;
    const { item } = product;
    const productTaxedPrice = get(item, 'taxed_price_formatted.price', '');
    const productPrice =
      productTaxedPrice || get(item, 'price_formatted.price', product.price);
    let discountPrice = null;
    let realPrice = null;

    if (toInteger(item.list_discount_prc)) {
      discountPrice = item.base_price_formatted.price;
      realPrice = item.list_price_formatted.price;
    } else if (toInteger(item.list_price)) {
      discountPrice = item.list_price_formatted.price;
    }

    const isProductPriceZero = Math.ceil(item.price) === 0;
    const showDiscount =
      isProductPriceZero && (item.discount_prc || item.list_discount_prc);

    return (
      <View style={styles.priceWrapper}>
        {showDiscount && (
          <Text style={styles.listPriceText}>{discountPrice}</Text>
        )}
        {isProductPriceZero ? (
          <Text>{i18n.t('Contact us for a price')}</Text>
        ) : (
          <View
            style={{
              ...styles.priceWrapper,
              // textAlign: 'center',
              // backgroundColor: 'red',
              width: '100%',
              // flex:1,
              justifyContent:
                this.props.viewStyle === 'grid' &&
                this.props.location === 'Categories'
                  ? 'center'
                  : 'flex-start',
            }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.productPrice,
                textAlign:
                  realPrice &&
                  this.props.viewStyle === 'grid' &&
                  this.props.location === 'Categories'
                    ? 'right'
                    : !realPrice &&
                      this.props.viewStyle === 'grid' &&
                      this.props.location === 'Categories'
                    ? 'center'
                    : !realPrice &&
                      this.props.viewStyle === 'list' &&
                      this.props.location === 'Categories'
                    ? 'left'
                    : 'center',
                width: realPrice ? '50%' : '90%',
              }}>
              {formatPrice(productPrice)}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...styles.productDiscountPrice,
                // textAlign: 'left',
                // width: '50%',
              }}>
              {realPrice}
            </Text>
          </View>
        )}
      </View>
    );
  };

  /**
   * Renders rating.
   *
   * @return {JSX.Element}
   */
  renderRating = () => {
    const {
      product: { item },
    } = this.props;

    return (
      <StarsRating
        value={0.01}
        // value={item.average_rating}
        size={RATING_STAR_SIZE}
        isRatingSelectionDisabled
      />
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { product, onPress, location, styledView, viewStyle } = this.props;
    const { item } = product;
    // console.log('product ', item)
    const imageUri = getImagePath(item);

    return (
      <>
        {location === 'Categories' ? (
          <>
            <Pressable
              style={
                viewStyle === 'grid'
                  ? styles.styledViewContainer
                  : styles.styledListViewContainer
              }
              onPress={() => onPress(item)}>
              <View>
                {imageUri !== null && (
                  <FastImage
                    style={styles.productImage}
                    source={{ uri: imageUri }}
                    resizeMode={FastImage.resizeMode.contain}

                    // resizeMethod="resize"
                    // resizeMethod="contain"
                  />
                )}
              </View>
              {this.renderDiscount()}
              <View
                style={
                  viewStyle === 'grid'
                    ? styles.description
                    : styles.descriptionList
                }>
                <Text
                  numberOfLines={viewStyle === 'grid' ? 2 : 3}
                  // numberOfLines={2}
                  style={
                    viewStyle === 'grid'
                      ? styles.productName
                      : styles.productNameList
                  }>
                  {item.product}
                </Text>
                {this.renderRating()}
                {this.renderPrice()}
              </View>
              <View
                style={{
                  ...styles.addToCartBtnView,
                  justifyContent: viewStyle === 'grid' ? 'center' : 'flex-end',
                  alignItems: viewStyle === 'grid' ? 'center' : 'flex-end',
                  // // right: viewStyle === 'grid' ? 20: null,
                }}>
                <Pressable
                  style={styles.addToCartBtnPress}
                  onPress={() => this.handleAddToCart(true, item)}>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 5,
                      color: '#8D6F18',
                    }}>
                    Add to Cart
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.container} onPress={() => onPress(item)}>
              <View>
                {imageUri !== null && (
                  <FastImage
                    style={styles.productImage}
                    source={{ uri: imageUri }}
                    resizeMode={FastImage.resizeMode.contain}
                    resizeMethod="resize"
                  />
                )}
              </View>
              {this.renderDiscount()}
              <View style={styles.description}>
                <Text numberOfLines={2} style={styles.productName}>
                  {item.product}
                </Text>
                {this.renderRating()}
                {this.renderPrice()}
              </View>
            </Pressable>
          </>
        )}
      </>
    );
  }
}

export default connect(
  (state) => ({
    settings: state.settings,
    cart: state.cart,
    auth: state.auth,
  }),
  (dispatch) => ({
    cartActions: bindActionCreators(cartActions, dispatch),
  }),
)(ProductListView);
