import {
  FETCH_ALL_BRANDS_REQUEST,
  FETCH_ALL_BRANDS_FAIL,
  FETCH_ALL_BRANDS_SUCCESS,
  //
  FETCH_FEATURES_REQUEST,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_FAIL,
} from '../constants';
import Api from '../services/api';

///////////////////////////////
export function fetchAllBrands(
  items_per_page = 5,
  page = 1,
  sort_by = 'timestamp',
) {
  const params = {
    items_per_page,
    sort_by,
    page,
    // ...advParams,
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
  };
  return async (dispatch) => {
    // console.log('brands product fetch response >>>>>>>>>>> in fetch func ')
    dispatch({ type: FETCH_ALL_BRANDS_REQUEST });

    await Api.get(`features/18`, { headers })
      .then((response) => {
        dispatch({
          type: FETCH_ALL_BRANDS_SUCCESS,
          payload: response.data.variants,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ALL_BRANDS_FAIL,
          error,
        });
      });
  };
}
///////////////////////////////

///////////   features  ////////////////////
export function fetchFeatures(id) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
  };
  return async (dispatch) => {
    // console.log('brands product fetch response >>>>>>>>>>> in fetch func ')
    dispatch({ type: FETCH_FEATURES_REQUEST + id });

    await Api.get(`features/${id}`, { headers })
      .then((response) => {
        console.log('fetchFeaturesfetchFeatures response', response);
        dispatch({
          type: FETCH_FEATURES_SUCCESS + id,
          payload: response.data.variants,
        });
      })
      .catch((error) => {
        console.log('fetchFeaturesfetchFeatures error', error);
        dispatch({
          type: FETCH_FEATURES_FAIL + id,
          error,
        });
      });
  };
}
///////////////////////////////
