import { Platform } from 'react-native';
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import {
  AuthActionTypes,
  DeviceInfoData,
  CreateProfileParams,
  LoginData,
  UpdateProfileParams,
  LoginDataHybrid,
} from '../../reducers/authTypes';
import {
  NOTIFICATION_SHOW,
  BECOME_SELLER_REQUEST,
  BECOME_SELLER_SUCCESS,
  BECOME_SELLER_FAIL,
} from '../../constants';
import Api from '../../services/api';
import i18n from '../../utils/i18n';
import store from '../../store';

export function createSellerProfile(
  data: CreateProfileParams,
  componentId: string,
) {
// console.log('data, componentId',data, componentId)
  return (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: BECOME_SELLER_REQUEST });
      const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
  };
    return Api.post('/vendors', data,{ headers })
      .then((response) => {
        dispatch({
          type: BECOME_SELLER_SUCCESS,
          payload: response,
        });
        Navigation.pop(componentId);
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'success',
            title: i18n.t('Successful'),
            text: i18n.t('Your request for vendor account has been sent successfully. We will contact you soon after viewing your profile'),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: BECOME_SELLER_FAIL,
          payload: error,
        });
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'warning',
            title: i18n.t('Vendor Account not created!'),
            text: error.response.data.message,
          },
        });
      });
  };
}
