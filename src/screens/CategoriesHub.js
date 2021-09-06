import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import SaldiriSideBarCont from '../components/SaldiriComponents/SaldiriSideBar';
import orderBy from 'lodash/orderBy';
import Spinner from '../components/Spinner';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
const CategoriesHub = (props) => {
  // console.log("prposss==================> ",props)

  //  console.log("prposss==================> 11 ",props)

  // console.log("categoriesList ===. ",categoriesList);
  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
        }}>
        {/* <SaldiriHeader startHeaderTitle="categories name" />  */}
        {props.data ? (
          <SaldiriSideBarCont items={props} />
        ) : (
          <Spinner visible />
        )}
        {/* <SaldiriSideBarCont items={categoriesList.slice(0, categoriesList.length-2)} />  */}
      </SafeAreaView>
    </>
  );
};

export default CategoriesHub;
const styles = StyleSheet.create({
  headerLogo: {
    width: 150,
    height: 30,
    resizeMode: 'cover',
    marginVertical: 8,
  },
});
