import React from 'react';
import { RadioButtonItem } from '../components/RadioButtonItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as settingsActions from '../actions/settingsActions';
import { ScrollView,Text } from 'react-native';

export const CurrencySelection = ({ settingsActions, settings }) => {
  const changeLanguageHandler = (currency) => {
    const omitCurrency = omit(currency, ['selected']);
    settingsActions.setCurrency(omitCurrency);
  };
  if (settings.currencies) {
    return (
      <>
       <SaldiriHeader
        midHeaderTitle='Select Currency'
        />
          <Text style={styles.text1}>
       Choose Your Currency
    </Text>
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
