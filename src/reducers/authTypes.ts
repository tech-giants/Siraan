import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_STATE,
  AUTH_REGESTRATION_REQUEST,
  AUTH_REGESTRATION_SUCCESS,
  AUTH_REGESTRATION_FAIL,
  NOTIFICATION_SHOW,
  REGISTER_DEVICE_REQUEST,
  REGISTER_DEVICE_SUCCESS,
  REGISTER_DEVICE_FAIL,
  FETCH_PROFILE_FIELDS_REQUEST,
  FETCH_PROFILE_FIELDS_SUCCESS,
  FETCH_PROFILE_FIELDS_FAIL,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  AUTH_LOGOUT,
  RESTORE_STATE,
} from '../constants';

export interface AuthState {
  token: null | string;
  ttl: null | number;
  logged: boolean;
  uuid: null | string;
  fetching: boolean;
  error: null | string;
  errorStatus: null | number;
  deviceToken: null | string;
  profile_id: null | string;
  user_id: null | number;
}

// AUTH_LOGIN_REQUEST
interface AuthLoginRequestAction {
  type: typeof AUTH_LOGIN_REQUEST;
}

// AUTH_REGESTRATION_SUCCESS
interface AuthRegistrationSuccessPayload {
  token: string;
  ttl: number;
}

interface AuthRegistrationSuccessAction {
  type: typeof AUTH_REGESTRATION_SUCCESS;
  payload: AuthRegistrationSuccessPayload;
}

// AUTH_LOGIN_FAIL
interface AuthLoginFailPayload {
  message: string;
  status: number;
}

interface AuthLoginFailAction {
  type: typeof AUTH_LOGIN_FAIL;
  payload: AuthLoginFailPayload;
}

// REGISTER_DEVICE_SUCCESS
interface RegisterDeviceSuccessPayload {
  token: string;
}

interface RegisterDeviceSuccessAction {
  type: typeof REGISTER_DEVICE_SUCCESS;
  payload: RegisterDeviceSuccessPayload;
}

// AUTH_LOGOUT
interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

// RESTORE_STATE
interface RestoreStatePayload {
  auth: {
    uuid: string;
  };
}

interface RestoreStateAction {
  type: typeof RESTORE_STATE;
  payload: RestoreStatePayload;
}

interface FetchProfileRequestAction {
  type: typeof FETCH_PROFILE_REQUEST;
}

interface FetchProfileSuccessAction {
  type: typeof FETCH_PROFILE_SUCCESS;
}

interface FetchProfileFailAction {
  type: typeof FETCH_PROFILE_FAIL;
}

interface FetchProfileFieldsRequestAction {
  type: typeof FETCH_PROFILE_FIELDS_REQUEST;
}

interface FetchProfileFieldsSuccessAction {
  type: typeof FETCH_PROFILE_FIELDS_SUCCESS;
}

interface FetchProfileFieldsFailAction {
  type: typeof FETCH_PROFILE_FIELDS_FAIL;
}

interface UpdateProfileRequestAction {
  type: typeof UPDATE_PROFILE_REQUEST;
}

interface UpdateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
}

interface NotificationShowPayload {
  type: string;
  title: string;
  text: string;
}

interface NotificationShowAction {
  type: typeof NOTIFICATION_SHOW;
  payload: NotificationShowPayload;
}

interface UpdateProfileFailAction {
  type: typeof UPDATE_PROFILE_FAIL;
}

interface AuthRegistrationRequestAction {
  type: typeof AUTH_REGESTRATION_REQUEST;
}

interface AuthRegistrationFailAction {
  type: typeof AUTH_REGESTRATION_FAIL;
}

interface RegisterDeviceRequestAction {
  type: typeof REGISTER_DEVICE_REQUEST;
}

interface RegisterDeviceFailAction {
  type: typeof REGISTER_DEVICE_FAIL;
}

interface AuthLoginSuccessPayload {
  token: string;
  ttl: number;
}

interface AuthLoginSuccessAction {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: AuthLoginSuccessPayload;
}

interface AuthResetStateAction {
  type: typeof AUTH_RESET_STATE;
}

export interface DeviceInfoData {
  device_id: string;
  locale: string;
  platform: string;
  token: string;
}

export interface UpdateProfileParams {
  email: string;
  firstname: string;
  lastname: string;
  password1: string;
  password2: string;
  phone: string;
  s_address: string;
  s_city: string;
  s_country: string;
  s_state: string;
  s_zipcode: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateProfileParams {
  email: string | undefined;
  firstname: string;
  lastname: string;
  password1: string;
  password2: string;
  phone: string;
}

export type AuthActionTypes =
  | AuthLoginRequestAction
  | AuthLoginFailAction
  | AuthLogoutAction
  | AuthRegistrationSuccessAction
  | RegisterDeviceSuccessAction
  | RestoreStateAction
  | FetchProfileRequestAction
  | FetchProfileSuccessAction
  | FetchProfileFailAction
  | FetchProfileFieldsSuccessAction
  | FetchProfileFieldsFailAction
  | FetchProfileFieldsRequestAction
  | UpdateProfileRequestAction
  | UpdateProfileSuccessAction
  | NotificationShowAction
  | UpdateProfileFailAction
  | AuthRegistrationRequestAction
  | AuthRegistrationFailAction
  | RegisterDeviceRequestAction
  | RegisterDeviceFailAction
  | AuthLoginSuccessAction
  | AuthResetStateAction;
