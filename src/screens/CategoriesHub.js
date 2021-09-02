import React,{useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import SaldiriSideBarCont from '../components/SaldiriComponents/SaldiriSideBar';
import orderBy from 'lodash/orderBy';
import Spinner from '../components/Spinner';
const CategoriesHub = (props) => {
 
  return (
    <>
       {/* <SaldiriHeader startHeaderTitle="categories name" />  */}
  {props.data?(<SaldiriSideBarCont items={props} />):(<Spinner visible/>)}
       {/* <SaldiriSideBarCont items={categoriesList.slice(0, categoriesList.length-2)} />  */}
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