import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />

  </>
);
// const MyStatusBar = ({ backgroundColor, ...props }) => (
//   <View style={[styles.statusBar, { backgroundColor }]}>
//     <SafeAreaView>
//     </SafeAreaView>
//   </View>
// );



const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
export default MyStatusBar;
