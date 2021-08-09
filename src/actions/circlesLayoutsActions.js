import {
  CIRCLES_LAYOUT_ACTION_REQUEST,
  CIRCLES_LAYOUT_ACTION_SUCCESS,
  CIRCLES_LAYOUT_ACTION_FAIL,
} from '../constants';
import config from '../config';
import Api from '../services/api';

export function fetch(location = 'index.index', turnOffLoader) {
  return (dispatch) => {
    dispatch({
      type: CIRCLES_LAYOUT_ACTION_REQUEST,
      payload: { turnOffLoader },
    });
    return Api.get(
      `/sra_bm_layouts/${config.layoutId}/sra_bm_locations/${location}/sra_bm_blocks`,
    )
      .then((response) => {
        dispatch({
          type: CIRCLES_LAYOUT_ACTION_SUCCESS,
          payload: {
            blocks: response.data,
            location,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: CIRCLES_LAYOUT_ACTION_FAIL,
          payload: error.response.data,
        });
      });
  };
}

export function dummy() {}
