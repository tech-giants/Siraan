import React from 'react';
import {
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { RadioButtonItem } from '../components/RadioButtonItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
// Import actions.
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
import * as settingsActions from '../actions/settingsActions';

export const LanguageSelection = ({
  settingsActions,
  settings,
  componentId,
}) => {
  const changeLanguageHandler = (language) => {
    const omitLanguage = omit(language, ['selected']);
    settingsActions.setLanguage(omitLanguage);
  };

  if (settings.currencies) {
    return (
      <>
        <>
          <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop:
                Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
            }}>
            <SaldiriHeader
              startComponent={
                <Pressable
                  onPress={() => Navigation.pop(componentId)}
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="arrow-back" size={20} color="#16191a" />
                </Pressable>
              }
              midHeaderTitle="Select Language"
            />
            <Text style={styles.text1}>Choose Your Language</Text>
            <ScrollView>
              {settings.languages.map((el, index) => (
                <RadioButtonItem
                  key={index}
                  item={el}
                  onPress={!el.selected && changeLanguageHandler}
                  title={el.name}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </>
      </>
    );
  }
  return null;
};

export default connect(
  (state) => ({
    settings: state.settings,
  }),
  (dispatch) => ({
    settingsActions: bindActionCreators(settingsActions, dispatch),
  }),
)(LanguageSelection);
const styles = EStyleSheet.create({
  text1: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 18,
    color: '#7c2981',
    //  paddingHorizontal:17,
  },
});
