import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

const SaldiriTextInput = ({
  label,
  optional,
  w50,
  successMessage,
  message,
  value,
  ...res
}) => {
  // console.log("saldiri text input change text ", value)
  return (
    <>
      <View
        style={{ ...styles.SaldiriTextInputCont, width: w50 ? '49%' : '100%' }}>
        {label && optional ? (
          <View style={styles.lableOptionalWrapper}>
            <Text style={{ ...styles.SaldiriTextInputLabel }}> {label} </Text>
            <Text style={styles.SaldiriTextInputOptional}> (optional) </Text>
          </View>
        ) : label ? (
          <View style={styles.lableOptionalWrapper}>
            <Text style={styles.SaldiriTextInputLabel}> {label} </Text>
          </View>
        ) : null}

        <View style={styles.SaldiriTextInputFieldCont}>
          <TextInput
            {...res}
            value={value}
            style={styles.SaldiriTextInputField}
          />
        </View>
        {message ? (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                ...styles.SaldiriTextInputMessage,
                fontStyle: 'italic',
                // color:  'red',
                color: successMessage === true ? 'green' : 'red',
              }}>
              here come input related message
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default SaldiriTextInput;

const styles = StyleSheet.create({
  SaldiriTextInputCont: {
    // backgroundColor: '#ccc',
    // width: '100%',
    marginVertical: 5,
  },
  SaldiriTextInputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
  },
  SaldiriTextInputOptional: {
    color: '#E3D1E4',
    fontSize: 14,
    // fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
  lableOptionalWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  SaldiriTextInputFieldCont: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    margin: 5,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
    borderColor: '#19161a',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  SaldiriTextInputField: {
    // backgroundColor: 'red',
    // borderColor: '#19161a',
    // borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    // paddingHorizontal: 15,
    // marginHorizontal:10,
  },
});
