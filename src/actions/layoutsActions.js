import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,
} from '../constants';
import config from '../config';
import Api from '../services/api';

export function fetch(location = 'index.index', turnOffLoader) {
  return (dispatch) => {
    dispatch({
      type: FETCH_LAYOUTS_BLOCKS_REQUEST,
      payload: { turnOffLoader },
    });
    return Api.get(
      `/sra_bm_layouts/${config.layoutId}/sra_bm_locations/${location}/sra_bm_blocks`,
    )
      .then((response) => {
        dispatch({
          type: FETCH_LAYOUTS_BLOCKS_SUCCESS,
          payload: {
            blocks: response.data,
            location,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_LAYOUTS_BLOCKS_FAIL,
          payload: error.response.data,
        });
      });
  };
}

export function dummy() {}
