import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import i18n from '../utils/i18n';
import Icon from './Icon';

// Components
import StarsRating from './StarsRating';
import { AddToCartButton } from './AddToCartButton';

const RATING_STAR_SIZE = 14;

const styles = (isStock, lastBlock, lastVendor, wishListActive) =>
  EStyleSheet.create({
    container: {
      paddingVertical: '1rem',
      borderBottomWidth: lastVendor ? 0 : 1,
      borderColor: '$menuItemsBorderColor',
    },
    containerBlock: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: !lastBlock ? 20 : 0,
    },
    title: {
      fontSize: '0.9rem',
    },
    place: {
      color: 'gray',
    },
    stock: {
      textAlign: 'right',
      marginRight: 10,
      color: isStock ? '#149624' : '#961414',
    },
    priceText: {
      fontSize: '1rem',
    },
    buttonsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    addTocCartBtn: {
      width: 130,
      marginLeft: 10,
    },
    favoriteIcon: {
      color: wishListActive ? '$primaryColor' : '$navBarButtonColor',
    },
  });

export const Seller = ({
  productOffer,
  isLastVendor,
  onPress,
  handleAddToWishList,
}) => {
  const isStock = !!parseInt(productOffer.amount, 10);
  const wishlist = useSelector((state) => state.wishList);
  const wishListActive = wishlist.items.some(
    (item) =>
      parseInt(item.product_id, 10) === parseInt(productOffer.product_id, 10),
  );

  return (
    <View style={styles(null, null, isLastVendor).container}>
      <View style={{ ...styles().containerBlock }}>
        <View>
          <Text style={styles().title}>{productOffer.company_name}</Text>
          {productOffer.company?.city && productOffer.company?.country ? (
            <Text style={styles().place}>
              {productOffer.company.country}, {productOffer.company.city}
            </Text>
          ) : null}
        </View>
        <View>
          {productOffer.company?.average_rating && (
            <StarsRating
              value={productOffer.company.average_rating}
              isRatingSelectionDisabled
              size={RATING_STAR_SIZE}
            />
          )}
          <Text style={styles(isStock).stock}>
            {isStock ? i18n.t('In stock') : i18n.t('Out of stock')}
          </Text>
        </View>
      </View>
      <View style={styles(null, 'lastBlock').containerBlock}>
        <Text style={styles().priceText}>
          {productOffer.price_formatted.price}
        </Text>
        <View style={styles().buttonsWrapper}>
          <TouchableOpacity onPress={handleAddToWishList}>
            <Icon
              name="favorite"
              style={styles(null, null, null, wishListActive).favoriteIcon}
            />
          </TouchableOpacity>
          {isStock && (
            <AddToCartButton
              buttonStyle={styles().addTocCartBtn}
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};
