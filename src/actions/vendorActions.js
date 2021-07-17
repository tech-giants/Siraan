import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_FAIL,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_CATEGORIES_REQUEST,
  FETCH_VENDOR_CATEGORIES_SUCCESS,
  FETCH_VENDOR_CATEGORIES_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  DISCUSSION_DISABLED,
} from '../constants';
import Api from '../services/api';
import * as productsActions from './productsActions';

const PROFILE_TYPE_SELLER = 'S';

export function fetch(id, type = 'M', params) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_VENDOR_REQUEST,
    });

    try {
      const sraVendorsResult = await Api.get(`/sra_vendors/${id}/`);
      const sraProfileFieldsResult = await Api.get(
        `/sra_profile_fields/?profile_type=${PROFILE_TYPE_SELLER}`,
      );
      sraVendorsResult.data.contactInformationFields =
        sraProfileFieldsResult.data;
      dispatch({
        type: FETCH_VENDOR_SUCCESS,
        payload: sraVendorsResult.data,
      });
      if (sraVendorsResult.data.discussion_type !== DISCUSSION_DISABLED) {
        productsActions.fetchDiscussion(id, params, type)(dispatch);
      }
      return sraVendorsResult.data;
    } catch (error) {
      dispatch({
        type: FETCH_VENDOR_FAIL,
        error,
      });
    }
  };
}

export function categories(cid) {
  return (dispatch) => {
    dispatch({
      type: FETCH_VENDOR_CATEGORIES_REQUEST,
    });

    return Api.get(`/sra_categories/?company_ids=${cid}&items_per_page=500`)
      .then((response) => {
        dispatch({
          type: FETCH_VENDOR_CATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_VENDOR_CATEGORIES_FAIL,
          error,
        });
      });
  };
}

export function products(companyId, page = 1, sort = {}) {
  const params = {
    page,
    company_id: companyId,
    get_filters: true,
    ...sort,
  };

  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    return Api.get('/sra_products', { params })
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: {
            ...response.data,
            params: {
              ...response.data.params,
              cid: response.data.params.company_id,
            },
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PRODUCTS_FAIL,
          error,
        });
      });
  };
}
