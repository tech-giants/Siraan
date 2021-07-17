import { Navigation } from 'react-native-navigation';
import * as appActions from './appActions';
import * as nav from '../services/navigation';
import { SET_LANGUAGE, SET_CURRENCY } from '../constants';

export const setLanguage = (language) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LANGUAGE,
      payload: language,
    });
    await appActions.initApp();
    Navigation.setRoot(nav.setRoot());
  };
};

export const setCurrency = (currency) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENCY,
      payload: currency,
    });
    await appActions.initApp();
    Navigation.setRoot(nav.setRoot());
  };
};
