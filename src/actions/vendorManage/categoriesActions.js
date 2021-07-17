import {
  VENDOR_CATEGORIES_TOGGLE,
  VENDOR_CATEGORIES_CLEAR,
} from '../../constants';

export function clear() {
  return async (dispatch) => {
    dispatch({
      type: VENDOR_CATEGORIES_CLEAR,
    });
  };
}

export function toggleCategory(id) {
  return async (dispatch) => {
    dispatch({
      type: VENDOR_CATEGORIES_TOGGLE,
      payload: id,
    });
  };
}
