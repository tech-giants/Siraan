import React from 'react'
import {StyleSheet, View, Text, Image } from 'react-native';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar'
import SaldiriSideBarCont from '../components/SaldiriComponents/SaldiriSideBar';

const CategoriesHub = (props) => {
    console.log('hubhubhubhubhubhubhubhubhubhubhubhubhubhubhubhubhubhubhub', props.name);
    return (
        <>
         <SaldiriHeader
        startHeaderTitle='categories name'
            />
            <SaldiriSideBarCont />
        </>
    )
}

export default CategoriesHub
const styles = StyleSheet.create({
  headerLogo: {
    width: 150,
    height: 30,
    resizeMode: 'cover',
    marginVertical: 8,
  },
});