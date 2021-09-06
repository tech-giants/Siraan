// import { View ,StatusBar } from 'react-native';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  Pressable,
  View,
  SafeAreaView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import React, { Component } from 'react';
import * as nav from '../services/navigation';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
export default class DefaultScreen extends Component {
  renderTitleBar = () => {
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SaldiriHeader
          startComponent={
            <Pressable
              onPress={() => Navigation.dismissModal('QR_SCREEN')}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          }
          midHeaderTitle="Scan QR code"
        />

        {/* <Text style={{ color: 'white', textAlign: 'center', padding: 16 }}>
        Title
      </Text> */}
      </>
    );
  };
  renderMenu = () => (
    <Text style={{ color: 'white', textAlign: 'center', padding: 16 }}>
      Menu
    </Text>
  );

  barcodeReceived = (event) => {
    //   nav.selectTab("home");
    Navigation.dismissModal('QR_SCREEN');
    var deep_link = registerDrawerDeepLinks(
      {
        link: event.data,
        payload: {
          type: 'qr',
          title: 'result',
        },
      },
      'HOME_SCREEN',
    );

    // console.log('Type: ' + event.type + '\nData: ' + event.data)
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View style={{ flex: 1 }}>
          <QRScannerView
            onScanResult={this.barcodeReceived}
            renderHeaderView={this.renderTitleBar}
            // renderFooterView={this.renderMenu}
            hintText={'Scan QR CODE'}
            scanBarAnimateReverse={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
