import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SaldiriTextArea = ({
  label,
  optional,
  w50,
  successMessage,
  message,
  value,
  type,
  validateMessage,
  show_error,
  passwordToMatch,
  rightIcon,
  ...res
}) => {
  const [tempValue, setTempValue] = useState(value);

  const [inputMessage, setinputMessage] = useState(null);
  const [errorMessage, seterrorMessage] = useState(show_error);
  const [showPassword, setshowPassword] = useState(true);
  return (
    <>
      <View
        style={{ ...styles.SaldiriTextInputCont, width: w50 ? '49%' : '100%' }}>
        {label && optional ? (
          <View style={styles.lableOptionalWrapper}>
            <Text style={{ ...styles.SaldiriTextInputLabel }}> {label} </Text>
            <Text
              style={{ ...styles.SaldiriTextInputOptional, color: '#E3D1E4' }}>
              (optional)
            </Text>
          </View>
        ) : label ? (
          <View style={styles.lableRequirWrapper}>
            <Text style={styles.SaldiriTextInputLabel}>
              {label}{' '}
              <Text
                style={{ ...styles.SaldiriTextInputOptional, color: 'red' }}>
                *
              </Text>
            </Text>
          </View>
        ) : null}

        <View style={styles.SaldiriTextInputFieldCont}>
          <TextInput
            multiline={true}
            {...res}
            value={value}
            style={styles.SaldiriTextInputField}
          />

          {/* for custom icons at right position  */}
          {rightIcon ? rightIcon : null}
        </View>

        {/* {inputMessage === null || value === '' ? null : (
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

export default SaldiriTextArea;

const styles = StyleSheet.create({
  SaldiriTextInputCont: {
    marginVertical: 5,
  },
  SaldiriTextInputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
  },
  SaldiriTextInputOptional: {
    fontSize: 14,
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },

  lableOptionalWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  lableRequirWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  SaldiriTextInputFieldCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: '#19161a',
    borderWidth: 0.5,
    borderRadius: 10,
    maxHeight: 100,
    minHeight: 45,
    overflow: 'hidden',
    paddingLeft: 12,
    paddingVertical: 10,
    paddingRight: 8,
  },
  SaldiriTextInputField: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
});
