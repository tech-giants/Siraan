import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import ProductListView from '../components/ProductListView';
import chunk from 'lodash/chunk';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import * as nav from '../services/navigation';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';

const AllProducts = ({ allProducts, title, componentId }) => {
  //   console.log('all products data', allProducts[0]);
  const renderProduct = (items, index) => (
    <View key={index} style={styles.chunk}>
      {items.map((item, chunkIndex) => (
        <ProductListView
          key={chunkIndex}
          product={{ item }}
          onPress={(product) => {
            nav.pushProductDetail('HOME_SCREEN', {
              pid: product.product_id,
            });
          }}
        />
      ))}
    </View>
  );
  const itemsList = chunk(allProducts, 2).map((items, index) =>
    renderProduct(items, index),
  );

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
              onPress={() => Navigation.pop(componentId)}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          }
          midHeaderTitle={title}
        />
        {/* <FlatList numColumns={2} key={2} data={allProducts} renderItem={(item) => {
              return <Text>{item.product}</Text>
      }} />
      <Text>all products</Text> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {itemsList}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  chunk: {
    // flex: 1,
    flexDirection: 'row',
  },
});
