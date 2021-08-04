// import { View } from 'react-native';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import {
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  Pressable,
  View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import React, { Component } from 'react';
import * as nav from '../services/navigation';
export default class DefaultScreen extends Component {

    renderTitleBar = () => <Text style={{color:'white',textAlign:'center',padding:16}}>Title</Text>

    renderMenu = () => <Text style={{color:'white',textAlign:'center',padding:16}}>Menu</Text>

    barcodeReceived = (event) => {
        //   nav.selectTab("home");
        Navigation.dismissModal("QR_SCREEN");
         var deep_link =  registerDrawerDeepLinks(
                  {
                    link: event.data,
                    payload: {
                      "type":"qr",
                      title: "result",
                    },
                  },
                  "HOME_SCREEN",
        );
      
        // console.log('Type: ' + event.type + '\nData: ' + event.data)
    };

    render() {
        return (
           <View style={{flex:1}}>
            < QRScannerView
                onScanResult={ this.barcodeReceived }
                renderHeaderView={ this.renderTitleBar }
                    renderFooterView={this.renderMenu}
                    hintText={"Scan QR CODE"}
                    scanBarAnimateReverse={true}
                />
           </View>
        )
    }
}