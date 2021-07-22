import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const SaldiriTextInput = ({label, successMessage, message, value, ...res }) => {
    // console.log("saldiri text input change text ", value)
  return (
    <>
      <View style={styles.SaldiriTextInputCont}>
        <Text style={styles.SaldiriTextInputLabel}> {label} </Text>
        <View style={styles.SaldiriTextInputFieldCont}>
          <TextInput {...res} value={value}  style={styles.SaldiriTextInputField} />
        </View>
        {
          message?
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
        </View> : null
        }
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
    marginTop: 5,
  },
  SaldiriTextInputField: {
    // backgroundColor: 'red',
    borderColor: '#19161a',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
});
