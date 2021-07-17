import {
  SETTLEMENTS_REQUEST,
  SETTLEMENTS_SUCCESS,
  SETTLEMENTS_FAIL,
  NOTIFICATION_SHOW,
} from '../constants';

import Api from '../services/api';
import i18n from '../utils/i18n';

export function settlements(data) {
  return (dispatch) => {
    dispatch({ type: SETTLEMENTS_REQUEST });
    return Api.post('/sra_settlements', data)
      .then((response) => {
        dispatch({
          type: SETTLEMENTS_SUCCESS,
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
            text: i18n.t('Something went wrong. Please try again later.'),
          },
        });
        dispatch({
          type: SETTLEMENTS_FAIL,
          error,
        });
      });
  };
}
