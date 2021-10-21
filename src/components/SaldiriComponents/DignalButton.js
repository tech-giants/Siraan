import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const DignalButton = (props) => {
  const { onPress, title, materialIcons, validationMessage } = props;
  return (
    <View style={styles.dignalButtonWrapper}>
      {!validationMessage ? null : (
        <View
          style={{
            // width: '100%',
            backgroundColor: '#c16fc6',
            flexDirection: 'row',
            padding: 10,
            position: 'relative',
            borderRadius: 10,
          }}>
          <Text
            style={{
              // ...styles.SaldiriTextInputMessage,
              fontStyle: 'italic',
              // color:  'red',
              textTransform: 'lowercase',
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {validationMessage}
          </Text>
          <View
            style={{
              // paddingHorizontal: 10,
              position: 'absolute',
              right: -6,
              top: '35%',
              width: 0,
              height: 0,
              borderTopColor: 'transparent',
              borderTopWidth: 6.5,
              borderRightWidth: 13,
              borderRightColor: '#c16fc6',
              borderBottomWidth: 6.5,
              borderBottomColor: 'transparent',
              transform: [{ rotate: '50deg' }],
            }}
          />
        </View>
      )}
      <Pressable
        onPress={onPress}
        style={{
          ...styles.dignalButton,
          borderBottomColor: '#7c2981',
        }}>
        <Text
          style={{
            ...styles.dignalButtonText,
            // justifyContent: 'center',
            // alignItems: 'center',
            //           textAlign: 'center'
          }}>
          {/* {materialIcons ? (
            <MaterialIcons name={materialIcons} color="#fff" size={15} />
          ) : null} */}
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export const DignalButtonGroup = (props) => {
  const { onPressR, titleR, onPressL, titleL } = props;
  return (
    <View style={styles.dignalButtonWrapper}>
      <Pressable
        onPress={onPressL}
        style={{
          ...styles.dignalButton,
          borderBottomColor: '#a26ea6',
          marginRight: -25,
        }}>
        <Text style={styles.dignalButtonText}>{titleL}</Text>
      </Pressable>
      {/*  */}
      <Pressable
        onPress={onPressR}
        style={{ ...styles.dignalButton, borderBottomColor: '#7c2981' }}>
        <Text style={styles.dignalButtonText}>{titleR}</Text>
      </Pressable>
    </View>
  );
};

const styles = EStyleSheet.create({
  dignalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // height: '100%',
    width: '100%',
  },
  dignalButton: {
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 50,
  },
  dignalButtonText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    position: 'absolute',
    left: 'auto',
    right: 'auto',
    textTransform: 'capitalize',
  },
});
