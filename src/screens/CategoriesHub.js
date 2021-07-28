import React,{useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import SaldiriSideBarCont from '../components/SaldiriComponents/SaldiriSideBar';
import orderBy from 'lodash/orderBy';

const CategoriesHub = (props) => {
  // console.log("prposss==================> ",props)

    //  console.log("prposss==================> 11 ",props)
  const categoriesList = orderBy(props, (i) => parseInt(i.position, 10), [
    'asc',
  ]);
  
  console.log("categoriesList ===. ",categoriesList);
  return (
    <>
      {/* <SaldiriHeader startHeaderTitle="categories name" /> */}

      <SaldiriSideBarCont items={categoriesList.slice(0, categoriesList.length-2)} />
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
