import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import IntlPhoneInput from 'react-native-intl-phone-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SaldiriPhoneInput = ({
  callBack,
  label,
  w50,
  successMessage,
  message,
  value,
  ...res
}) => {
  const onChangeText = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    // isVerified,
  }) => {
    let rawNumber = `${dialCode}${phoneNumber}`;
    callBack({
      dialCode: dialCode,
      number: unmaskedPhoneNumber,
      mobileNumber: rawNumber.replace(/ /g, ''),
    });
  };
  //
  return (
    <>
      <View
        style={{ ...styles.SaldiriTextInputCont, width: w50 ? '49%' : '100%' }}>
        {label ? (
          <Text style={styles.SaldiriTextInputLabel}> {label} </Text>
        ) : null}

        <View style={styles.SaldiriTextInputFieldCont}>
          <View style={styles.inputContainer}>
            <IntlPhoneInput
              disableCountryChange={true}
              onChangeText={(text) => onChangeText(text)}
              defaultCountry="PK"
              phoneInputStyle={styles.input}
              containerStyle={styles.inputCont}
              flagStyle={styles.iconStyle}
              placeholder="Mobile Number"
            />
            {/* <Text style={{color: 'red', marginHorizontal: 5}}>*</Text> */}
          </View>
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

export default SaldiriPhoneInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    // height: windowHeight / 15,
    // height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  inputCont: {
    width: windowWidth / 1.2,
    height: windowHeight / 16,
    // lineHeight:20,
    borderColor: '#ccc',
  },
  iconStyle: {
    height: windowHeight / 15,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 40,
    fontSize: 25,
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

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
