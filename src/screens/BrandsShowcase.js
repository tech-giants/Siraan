import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import { Navigation } from 'react-native-navigation';
import { fetchAllBrands } from '../actions/featuresAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import chunk from 'lodash/chunk';
import * as nav from '../services/navigation';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
//
const windowWidth = Dimensions.get('window').width;
//
const BrandsShowcase = ({ componentId, title, fetchAllBrands, features }) => {
  const [array, setArray] = useState([]);
  useEffect(() => {
    fetchAllBrands();
  }, []);
  useEffect(() => {
    const arr = [];

    // console.log(
    //   '____________________________________ object to arr useEffect working ____________________________________',
    // );
    if (!features.fetching) {
      Object.values(features.variants).map((value, key) => {
        // console.log(
        //   'object values===============>>>>>>>>>>',
        //   key,
        //   value.image_pair,
        // );
        const item = {
          variant: value.variant,
          image_path: value.image_pair
            ? value.image_pair.icon
              ? value.image_pair.icon.image_path
              : null
            : null,
          variant_id: value.variant_id,
        };
        // setArr([...arr, ...item]);
        arr.push(item);
      });
    }
    setArray(arr);
  }, [features.fetching]);
  // console.log('object values aaa===============>>>>>>>>>>', array.length);
  //
  // console.log(
  //   '____________________________________ out of useEffect data arr ____________________________________',
  // array
  // );
  // console.log(
  //   'features variantttttttttttttttttttttttttttttttttttttttttttttttttttttttt...>',
  //   features.variants,
  // );
  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
        }}>
        <SaldiriHeader
          startComponent={
            <Pressable
              onPress={() => Navigation.popToRoot(componentId)}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          }
          midHeaderTitle="Brands"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}>
          {array.length > 0 ? (
            chunk(array, 2).map((item, index) => {
              return <RowView rowkey={index} item={item} />;
            })
          ) : (
            <ActivityIndicator size={30} color="#7c2981" />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default connect(
  (state) => ({
    features: state.features,
  }),
  (dispatch) => ({
    fetchAllBrands: bindActionCreators(fetchAllBrands, dispatch),
  }),
)(BrandsShowcase);

// child components down here

const RowView = ({ item, rowkey }) => {
  return (
    <>
      <View key={rowkey} style={styles.rowViewCont}>
        {/* console.log('row view obj======>>>>>>', obj) */}
        {item.map((obj, index) => {
          return (
            <Pressable
              key={index}
              style={styles.container}
              onPress={() =>
                nav.pushCirclesLayouts('HOME_SCREEN', {
                  // allProducts: items,
                  //   title: name,
                  id: obj.variant_id,
                  title: obj.variant,
                  location: 'brands',
                })
              }>
              <View style={styles.wrapper}>
                <View style={styles.categoryTitleWrapper}>
                  <Text numberOfLines={2} style={styles.categoryTitle}>
                    {obj.variant}
                  </Text>
                </View>
                {obj.image_path ? (
                  <Image
                    source={{ uri: obj.image_path }}
                    style={{ ...styles.categoryImage, resizeMode: 'contain' }}
                  />
                ) : (
                  <Image
                    source={require('../assets/siraan_logo.png')}
                    style={{ ...styles.categoryImage, resizeMode: 'contain' }}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowViewCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    // backgroundColor: 'red',
    // width: '33.33333%',
    // width: 160,
    width: windowWidth / 2.3,
    // padding: 5,
    // shadowColor: '#E0E0E0',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // elevation: 2,
    borderRadius: 10,
    borderColor: '#7c2981',
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 5,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,

    elevation: 7,
  },
  wrapper: {
    flex: 1,
    minHeight: 70,
    overflow: 'hidden',
    position: 'relative',
    // borderRadius: '$categoryBorderRadius',
    backgroundColor: '#fff',
  },
  categoryImage: {
    height: 110,
    width: '100%',
    // resizeMode: 'cover',
    // backgroundColor: '#7c2981',
    // borderRadius: 10,
  },
  categoryTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 2,
    paddingRight: 2,
    borderBottomWidth: 0.5,
    borderColor: '#7c2981',
  },
  categoryTitle: {
    fontSize: 17,
    overflow: 'visible',
    // fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});
