import {
  VENDOR_REVIEW_REQUEST,
  VENDOR_REVIEW_SUCCESS,
  VENDOR_REVIEW_FAIL,
} from '../../constants/index';
import Api from '../../services/api';

export const getReviews = (data) => {
  let {
    // id,
    page,
  } = data;
  let id = 16;
  console.log('vendorreviews action data', data);
  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
  };
  return async (dispatch) => {
    try {
      dispatch({
        type: VENDOR_REVIEW_REQUEST,
      });
      let response = await Api.get(
        `api/reviews?company_id=${id}&page=${page}`,
        {
          headers,
        },
      );
      console.log('vendorreviews action api response', response);
      if (response.status === 202) {
        dispatch({
          type: VENDOR_REVIEW_SUCCESS,
          payload: { ...response.data, page: page },
        });
      }
    } catch (error) {
      console.log('vendorreviews action api error', error);
      dispatch({
        type: VENDOR_REVIEW_FAIL,
        payload: response,
      });
    }
  };
};
