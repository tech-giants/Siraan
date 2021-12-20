import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import Header from './src/Component/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Navigation } from 'react-native-navigation';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../services/navigation';
import Icon from '../components/Icon';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';

function Dukaan(props) {
  let { componentId, profile } = props;
  console.log('profle', profile);
  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle="My Store"
      />
      <View style={styles.mainContainer}>
        <View style={{ ...styles.banner, backgroundColor: '#e3d1e4' }}>
          <FastImage
            source={require('../assets/siraan_logo.png')}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {profile.company_name}
            </Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {profile.email}
            </Text>
          </View>
        </View>
        <View style={styles.bannerContainer}>
          {/* <View style={styles.priceContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000',
              padding: 20,
            }}>
            RS 0
          </Text>
          <Text style={{ fontSize: 17, bottom: 20, left: 20 }}>
            You do not have any orders yet
          </Text>
          <Pressable style={styles.buttonPressable}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Today</Text>
          </Pressable>
        </View> */}
          <View
            style={{
              width: '100%',
            }}>
            <View style={styles.cardsRow}>
              <Pressable
                style={styles.cardCont}
                onPress={() => nav.VendorAddProduct(componentId)}>
                <FontAwesome name="product-hunt" size={30} color="#7c2981" />
                <Text style={{ color: '#7c2981', fontWeight: 'bold' }}>
                  Create Product
                </Text>
                {/* <Text style={{ fontSize: 10 }}>Create POS bills </Text> */}
              </Pressable>
              <Pressable
                style={styles.cardCont}
                onPress={() => nav.ViewOrders(componentId)}>
                <FontAwesome name="list-alt" size={30} color="#7c2981" />
                <Text style={{ color: '#7c2981', fontWeight: 'bold' }}>
                  My Orders
                </Text>
                {/* <Text style={{ fontSize: 10 }}>Add Prodcut and variants </Text> */}
              </Pressable>
            </View>
            <View style={styles.cardsRow}>
              <Pressable
                style={styles.cardCont}
                onPress={() => nav.ViewProduct(componentId)}>
                <FontAwesome name="reorder" size={30} color="#7c2981" />
                <Text style={{ color: '#7c2981', fontWeight: 'bold' }}>
                  My Products
                </Text>
              </Pressable>

              <Pressable
                style={styles.cardCont}
                onPress={() => nav.Review(componentId)}>
                <MaterialIcons name="rate-review" size={30} color="#7c2981" />
                <Text style={{ color: '#7c2981', fontWeight: 'bold' }}>
                  My Reviews
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default connect(
  (state) => ({
    auth: state.auth,
    pages: state.pages,
    cart: state.cart,
    profile: state.profile,
    settings: state.settings,
    wallet: state.wallet,
  }),
  (dispatch) => ({}),
)(Dukaan);

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
  },
  banner: {
    flex: 1,
    backgroundColor: '#7c2981',
    zIndex: 0,
    // height: '40%',
  },
  bannerContainer: {
    position: 'relative',
    backgroundColor: 'white',
    // height:'30%'
    flex: 2,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // height: '60%',
  },
  // priceContainer: {
  //   position: 'absolute',
  //   top: -70,
  //   alignSelf: 'center',
  //   width: 320,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   zIndex: 1,
  // },
  // buttonPressable: {
  //   padding: 7,
  //   backgroundColor: '#7c2981',
  //   color: '#fff',
  //   borderBottomEndRadius: 7,
  //   borderBottomLeftRadius: 7,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.0,
  //   elevation: 4,
  // },
  cardCont: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  logo: {
    resizeMode: 'contain',
    width: 230,
    height: 150,
    alignSelf: 'center',
  },
});
