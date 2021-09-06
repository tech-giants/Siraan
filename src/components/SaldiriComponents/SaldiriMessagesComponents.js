import React, { useState } from 'react';
import {
  ToastAndroid,
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import { child } from 'react-native-extended-stylesheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AlertBox = (title, message, btnArr) => {
  Alert.alert(title, message, btnArr);
};

const AndroidToast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

const OverLayModal = ({ children }) => {
  return (
    <>
      <View style={styles.OverLayModal}>
        <View style={styles.modalCont}>{children}</View>
      </View>
    </>
  );
};
export { AlertBox, AndroidToast, OverLayModal };

const styles = StyleSheet.create({
  OverLayModal: {
    position: 'absolute',
    flex: 1,
    zIndex: 100,
    // elevation: 100,
    backgroundColor: 'rgba(105, 104, 104, 0.6)',
    // backgroundColor: '#696868',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalCont: {
    // backgroundColor: '#e3d1e4',
    backgroundColor: '#fff',
    width: windowWidth - 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
