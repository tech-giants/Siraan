import React from 'react';
import { RadioButtonItem } from '../components/RadioButtonItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as settingsActions from '../actions/settingsActions';
import { ScrollView, Text, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';

export const CurrencySelection = ({ settingsActions, settings, componentId }) => {
  const changeLanguageHandler = (currency) => {
    const omitCurrency = omit(currency, ['selected']);
    settingsActions.setCurrency(omitCurrency);
  };
  if (settings.currencies) {
    return (
      <>
        <SaldiriHeader
          startComponent={
            <Pressable
              onPress={() => Navigation.popToRoot(componentId)}
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          }
          midHeaderTitle="Select Currency"
        />
        <Text style={styles.text1}>Choose Your Currency</Text>
        <ScrollView>
          {settings.currencies.map((el, index) => (
            <RadioButtonItem
              key={index}
              item={el}
              onPress={!el.selected && changeLanguageHandler}
              title={el.currencyCode}
            />
          ))}
        </ScrollView>
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
)(CurrencySelection);

const styles = EStyleSheet.create({
  text1:{
    justifyContent:'center',
    alignItems:'center',
       fontSize:20,
       fontWeight:'bold',
       padding:18,
       color:'#7c2981',
      //  paddingHorizontal:17,
  },
})
