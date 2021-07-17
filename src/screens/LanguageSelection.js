import React from 'react';
import { RadioButtonItem } from '../components/RadioButtonItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { omit } from 'lodash';

// Import actions.
import * as settingsActions from '../actions/settingsActions';
import { ScrollView } from 'react-native';

export const LanguageSelection = ({ settingsActions, settings }) => {
  const changeLanguageHandler = (language) => {
    const omitLanguage = omit(language, ['selected']);
    settingsActions.setLanguage(omitLanguage);
  };

  if (settings.currencies) {
    return (
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
