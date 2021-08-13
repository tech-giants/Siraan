import React from 'react';
import { Dimensions, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import store from './store';
import theme from './config/theme';
import * as nav from './services/navigation';
import * as appActions from './actions/appActions';
import { prepareIcons } from './utils/navIcons';
import registerScreens from './screens';

// Calcuate styles
const { width } = Dimensions.get('window');
EStyleSheet.build({
  $rem: width > 340 ? 18 : 16,
  // $outline: 1,
  ...theme,
});

function Start() {
  <>
    <StatusBar backgroundColor="#7c2981" barStyle="dark-light" />
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {
        (registerScreens(store),
        Navigation.events().registerAppLaunchedListener(async () => {
          await appActions.initApp();
          await prepareIcons();
          Navigation.setRoot(nav.setRoot());
        }))
      }
    </SafeAreaView>
    ;
  </>;
}

export default Start;
