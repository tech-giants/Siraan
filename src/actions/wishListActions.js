import {
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,
  WISH_LIST_FETCH_FAIL,
  WISH_LIST_ADD_REQUEST,
  WISH_LIST_ADD_SUCCESS,
  WISH_LIST_ADD_FAIL,
  WISH_LIST_REMOVE_REQUEST,
  WISH_LIST_REMOVE_SUCCESS,
  WISH_LIST_REMOVE_FAIL,
  WISH_LIST_CLEAR,
  NOTIFICATION_SHOW,
} from '../constants';

import { Navigation } from 'react-native-navigation';
import i18n from '../utils/i18n';
import Api from '../services/api';

export function fetch(fetching = true) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_FETCH_REQUEST,
      payload: {
        fetching,
      },
    });
    return Api.get('/sra_wish_list')
      .then((response) => {
        dispatch({
          type: WISH_LIST_FETCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: WISH_LIST_FETCH_FAIL,
          error,
        });
      });
  };
}

export function add(data, componentId) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_ADD_REQUEST,
    });
    return Api.post('/sra_wish_list', data)
      .then((response) => {
        dispatch({
          type: WISH_LIST_ADD_SUCCESS,
          payload: response.data,
        });
        Navigation.dismissModal(componentId);
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'success',
            title: i18n.t('Success'),
            text: i18n.t('The product was added to your Wish list.'),
          },
        });
        // Calculate cart
        fetch(false)(dispatch);
      })
      .catch((error) => {
        Navigation.dismissModal(componentId);
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'error',
            title: i18n.t('Error'),
            text: i18n.t('This product is already in the wish list.'),
          },
        });
        dispatch({
          type: WISH_LIST_ADD_FAIL,
          error,
        });
      });
  };
}

export function remove(cartId) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_REMOVE_REQUEST,
    });
    return Api.delete(`/sra_wish_list/${cartId}`, {})
      .then(() => {
        dispatch({
          type: WISH_LIST_REMOVE_SUCCESS,
          payload: {
            cartId,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: WISH_LIST_REMOVE_FAIL,
          error,
        });
      });
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_CLEAR,
    });
    return Api.delete('/sra_wish_list/');
  };
}
