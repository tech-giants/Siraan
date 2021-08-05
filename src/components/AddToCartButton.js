import React from 'react';
import { Text, Pressable } from 'react-native';
import i18n from '../utils/i18n';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  addToCartBtnText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:5,
  },
  addToCartBtn: {
    // backgroundColor: '$primaryColor',
    backgroundColor: '#7c2981',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '70%',
    height:50,
  },
});

export const AddToCartButton = ({ onPress, buttonStyle, textStyle }) => {
  return (
    <Pressable
      style={{ ...styles.addToCartBtn, ...buttonStyle }}
      onPress={onPress}>
      <Text style={{ ...styles.addToCartBtnText, ...textStyle, width: '100%' }}>
        {i18n.t('Add to Cart').toUpperCase()}
      </Text>
    </Pressable>
  );
};
