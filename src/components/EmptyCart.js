import React from 'react';
import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as nav from '../services/navigation';
// Components
import Icon from './Icon';

// Links
import i18n from '../utils/i18n';
import { Navigation } from 'react-native-navigation';
const windowWidth = Dimensions.get('window').width;

// Styles
const styles = EStyleSheet.create({
  emptyListContainer: {
    // marginTop: '3rem',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 70,
  },
  emptyListIconWrapper: {
    // backgroundColor: '#6d3075',
    // width: '12rem',
    // height: '12rem',
    // borderRadius: '6rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emptyListIcon: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '6rem',
  },
  emptyListHeader: {
    fontSize: 21,
    color: '#999999',
    // marginTop: 50,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  emptyListDesc: {
    fontSize: '1rem',
    color: '#24282b',
    marginTop: '0.5rem',
  },
  headerLogo: {
    width: windowWidth,
    height: 250,
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: '#7c2981',
    padding: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    width: 260,
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
  },
});

/**
 * Renders if cart is empty.
 *
 * @return {JSX.Element}
 */
const EmptyCart = () => (
  <>
    <View style={styles.emptyListContainer}>
      <View style={styles.emptyListIconWrapper}>
        <Image
          style={styles.headerLogo}
          source={require('../assets/icon_cart.png')}
        />
        {/* <Icon name="add-shopping-cart" style={styles.emptyListIcon} /> */}
        <Text style={styles.emptyListHeader}>
          {i18n.t('Fill your cart with great products from Siraan')}
        </Text>
      </View>
      <View style={{ fontSize: 'bold', fontSize: 20 }}>
        <Pressable onPress={() => nav.selectTab('home')} style={styles.btn}>
          <Text style={styles.btnText}>{i18n.t('Shop Now')}</Text>
        </Pressable>
      </View>
    </View>
  </>
);

export default EmptyCart;
