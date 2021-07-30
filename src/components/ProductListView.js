import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import toInteger from 'lodash/toInteger';
import get from 'lodash/get';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_IMAGE_WIDTH, formatPrice, getImagePath } from '../utils';
import i18n from '../utils/i18n';
import StarsRating from '../components/StarsRating';
import { PRODUCT_NUM_COLUMNS } from '../utils';

const RATING_STAR_SIZE = 14;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '$productBorderColor',
    borderRadius: '$borderRadius',
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 220,
    flex: 2,
    // maxWidth: `${Math.floor(94 / PRODUCT_NUM_COLUMNS)}%`,
    maxWidth: 150,
  },
  styledViewContainer: {
    borderWidth: 0.5,
    borderColor: '#a0a0a0',
    // borderColor: '$productBorderColor',
    // borderRadius: '$borderRadius',
    // backgroundColor: 'red',
    // margin: 5,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 220,
    flex: 2,
    // width: windowWidth/2,
    width: '100%',
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
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 120,
    flex: 1,
    // width: windowWidth/2,
    width: '100%',
    // maxWidth: `${Math.floor(94 / PRODUCT_NUM_COLUMNS)}%`,
    // maxWidth: 150,
  },
  productImage: {
    width: PRODUCT_IMAGE_WIDTH,
    height: PRODUCT_IMAGE_WIDTH,
  },
  description: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  productName: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '0.8rem'
  },
  productNameList: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '1rem'
  },
  productPrice: {
    color: '#73626B',
    fontWeight: 'bold',
    textAlign: 'left',
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
          {i18n.t('-')} {`${discount}%`}
        </Text>
      </View>
    );
  };

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

    if (toInteger(item.discount_prc)) {
      discountPrice = item.base_price_formatted.price;
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
          <Text numberOfLines={1} style={styles.productPrice}>
            {formatPrice(productPrice)}
          </Text>
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
        value={item.average_rating}
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
                  <Image
                    style={styles.productImage}
                    source={{ uri: imageUri }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                )}
              </View>
              {this.renderDiscount()}
              <View style={styles.description}>
                <Text
                  numberOfLines={1}
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
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.container} onPress={() => onPress(item)}>
              <View>
                {imageUri !== null && (
                  <Image
                    style={styles.productImage}
                    source={{ uri: imageUri }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                )}
              </View>
              {this.renderDiscount()}
              <View style={styles.description}>
                <Text numberOfLines={1} style={styles.productName}>
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

export default connect((state) => ({
  settings: state.settings,
}))(ProductListView);
