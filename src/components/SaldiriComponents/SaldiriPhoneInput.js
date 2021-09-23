import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { AndroidToast } from './SaldiriMessagesComponents';

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
  // const onChangeText = ({
  //   dialCode,
  //   unmaskedPhoneNumber,
  //   phoneNumber,
  //   // isVerified,
  // }) => {
  //   let rawNumber = `${dialCode}${phoneNumber}`;
  //   callBack({
  //     dialCode: dialCode,
  //     number: unmaskedPhoneNumber,
  //     mobileNumber: rawNumber.replace(/ /g, ''),
  //   });

  // };
  const [inputVal, setInputVal] = useState('');
  useEffect(() => {
    onChangeText(inputVal);
  }, [inputVal]);

  const onChangeText = (val) => {
    let rawNumber = `+92${val}`;
    callBack({
      dialCode: '+92',
      number: val.replace(/ /g, ''),
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
            {/* <IntlPhoneInput
              disableCountryChange={true}
              onChangeText={(text) => onChangeText(text)}
              defaultCountry="PK"
              phoneInputStyle={styles.input}
              containerStyle={styles.inputCont}
              flagStyle={styles.iconStyle}
              placeholder="Mobile Number"
            /> */}
            <View style={{ ...styles.inputCont, ...styles.displayRow }}>
              <View style={styles.iconStyle}>
                <Image
                  style={styles.iconImageStyle}
                  source={require('../../assets/pakistan.png')}
                />
              </View>
              <Text style={styles.countryCodeText}>+92</Text>
              <TextInput
                value={inputVal}
                style={{
                  ...styles.input,
                  ...styles.inputStyle,
                }}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                // onChangeText={(text) => onChangeText(text)}
                onChangeText={(e) => {
                  let text = e.replace(/ /g, '');
                  text.length <= 10 ? setInputVal(text) : setInputVal(inputVal);
                }}
              />
            </View>
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
    marginLeft: 10,
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
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    // backgroundColor: 'red',
  },
  iconImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  countryCodeText: {
    paddingVertical: 0,
    paddingLeft: 10,
    // flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
