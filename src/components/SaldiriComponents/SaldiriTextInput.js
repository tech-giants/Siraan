import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const SaldiriTextInput = ({
  label,
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
        {label ? (
          <Text style={styles.SaldiriTextInputLabel}> {label} </Text>
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
    width: '100%',
    marginVertical: 5,
  },
  SaldiriTextInputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
