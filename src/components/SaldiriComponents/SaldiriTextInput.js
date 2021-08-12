import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SaldiriTextInput = ({
  label,
  optional,
  w50,
  successMessage,
  message,
  value,
  type,
  validateMessage,
  show_error,
  ...res
}) => {
  // const [value, setInputvalue] = useState(value);

  const [inputMessage, setinputMessage] = useState(null);
  const [errorMessage, seterrorMessage] = useState(show_error);
  const [showPassword, setshowPassword] = useState(true);

  const emailValidate = (text = value) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (value !== null && value !== '') {
      if (reg.test(text) === false) {
        setinputMessage('invalid email address');
        seterrorMessage(true);
        // return false;
      } else {
        seterrorMessage(false);
        setinputMessage('valid email address');
      }
    }
  };

  const passwordCheck = () => {
    if (value !== null && value !== '') {
      if (value.length >= 8) {
        setinputMessage('valid password ');
        seterrorMessage(false);
      } else {
        setinputMessage('password must be grater than 8  digits');
        seterrorMessage(true);
      }
    }
  };
useEffect(() => {
  if (validateMessage) {
    setinputMessage(validateMessage.message);
    seterrorMessage(validateMessage.error);
  }
}, [validateMessage]);
  
  useEffect(() => {
    if (type === 'email' && (value !== '' || value !== null)) {
      emailValidate();
      return;
    }
    if (type === 'password' && value !== '') {
      passwordCheck();
      return;
    }
    return;
  }, [value]);

  // console.log('saldiri text input change text ', type ,value, value !== '');
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
            // onChangeText={(e) => setInputvalue(e)}
            value={value}
            style={styles.SaldiriTextInputField}
            secureTextEntry={type === 'password' ? showPassword : false}
            // onBlur={() => onBlur_()}
          />

          {type === 'password' ? (
            <Pressable onPress={() => setshowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#16191a"
              />
            </Pressable>
          ) : null}
        </View>
        {/* {inputMessage === null && value === '' ? null : (
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
                textTransform: 'lowercase',
                color: !errorMessage ? 'green' : 'red',
              }}>
              {inputMessage}
            </Text>
          </View>
        )} */}
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
    flexDirection: 'row',
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
    // width: '100%',
    flex: 1,
    // paddingHorizontal: 15,
    // marginHorizontal:10,
  },
});
