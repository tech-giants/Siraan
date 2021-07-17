import { get } from 'lodash';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  NOTIFICATION_SHOW,
} from '../constants';
import Api from '../services/api';
import i18n from '../utils/i18n';

export function create(data) {
  return (dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST });
    return Api.post('/sra_orders/', data)
      .then((response) => {
        dispatch({
          type: ORDER_CREATE_SUCCESS,
          payload: response.data,
        });
        return response;
      })
      .catch((error) => {
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'error',
            title: i18n.t('Error'),
            text: get(
              error,
              'response.data.message',
              i18n.t('Something went wrong. Please try again later.'),
            ),
          },
        });
        dispatch({
          type: ORDER_CREATE_FAIL,
          error,
        });
      });
  };
}

export function fetch(page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    return Api.get(`/sra_orders?page=${page}`)
      .then((response) => {
        dispatch({
          type: FETCH_ORDERS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ORDERS_FAIL,
          error,
        });
      });
  };
}
