import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../Button';

const SaldiriFormBlock = (props) => {
  return (
    <>
      <View
        style={{
          ...styles.FormBlockContainer,
          // width: Dimensions.get('window').width - 25,
          width: 340,
        }}>
        {props.children}
        {/* <Text>saldiri form block</Text> */}
      </View>
    </>
  );
};
export default SaldiriFormBlock;
const styles = EStyleSheet.create({
  FormBlockContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    // height: 100,
    // paddingHorizontal: 5,
    marginVertical: 10,
    shadowColor: '#19161a',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6.27,
    elevation: 3,
    zIndex: 1000,
  },

  container: {
    margin: 0,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  containerSimple: {
    padding: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  header: {
    marginBottom: 14,
    fontWeight: 'bold',
    fontSize: '0.9rem',
    textAlign: 'left',
  },
  btnWrapper: {
    marginTop: 14,
    marginBottom: 14,
  },
});
