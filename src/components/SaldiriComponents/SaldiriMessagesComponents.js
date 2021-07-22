import React, { useState } from 'react';
import {ToastAndroid, View, StyleSheet, Button, Alert } from 'react-native';

const AlertBox = (title, message, btnArr) => {
    Alert.alert(title, message, btnArr);
}

const AndroidToast =(message)=>{
    ToastAndroid.showWithGravityAndOffset(
     message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
}


export { AlertBox, AndroidToast};
