import {
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_FAIL,
  FETCH_PAGES_SUCCESS,
} from '../constants';
import Api from '../services/api';

export function fetch(layoutId, location = 'sidebar.menu') {
  return (dispatch) => {
    dispatch({ type: FETCH_PAGES_REQUEST });
    return Api.get(
      `/sra_bm_layouts/${layoutId}/sra_bm_locations/${location}/sra_bm_blocks`,
    )
      .then((response) => {
        dispatch({
          type: FETCH_PAGES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PAGES_FAIL,
          error,
        });
      });
  };
}

export const dummy = () => {};
