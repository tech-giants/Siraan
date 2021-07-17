import { get } from 'lodash';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_REGESTRATION_SUCCESS,
  REGISTER_DEVICE_SUCCESS,
  RESTORE_STATE,
  AUTH_LOGIN_SUCCESS,
} from '../constants';

import { AuthState, AuthActionTypes } from './authTypes';

const initialState: AuthState = {
  token: null,
  ttl: null,
  logged: false,
  uuid: null,
  fetching: false,
  error: null,
  errorStatus: null,
  deviceToken: null,
  profile_id: null,
  user_id: null,
  resetPasswordStatus: '',
};

export default function (state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
        errorStatus: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl,
        logged: true,
        fetching: false,
        error: null,
        errorStatus: null,
      };

    case AUTH_REGESTRATION_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl,
        logged: true,
        fetching: false,
        error: null,
        errorStatus: null,
      };

    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload.message,
        errorStatus: action.payload.status,
      };

    case REGISTER_DEVICE_SUCCESS:
      return {
        ...state,
        deviceToken: action.payload.token,
      };

    case AUTH_LOGOUT:
      return initialState;

    case RESTORE_STATE:
      return {
        ...state,
        ...action.payload.auth,
        uuid: get(action.payload, 'auth.uuid', null)
          ? action.payload.auth.uuid
          : (+new Date()).toString(16),
      };

    default:
      return state;
  }
}
