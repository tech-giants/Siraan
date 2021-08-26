import {
  WALLET_DATA_REQUEST,
  WALLET_DATA_FAIL,
  WALLET_DATA_SUCCESS,
} from '../constants';
import Api from '../services/api';

export function fetch(id) {
  return (dispatch) => {
    dispatch({
      type: WALLET_DATA_REQUEST,
    });
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
    };
    return (
      Api.get(`/wallet?user_id=${id}`, { headers })
        // return Api.get(`/wallet?user_id=119`, { headers })
        .then((response) => {
          dispatch({
            type: WALLET_DATA_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: WALLET_DATA_FAIL,
            payload: error,
          });
        })
    );
  };
}
