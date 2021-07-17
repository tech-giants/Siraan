import {
  VENDOR_CATEGORIES_CLEAR,
  VENDOR_PRODUCT_CHANGE_CATEGORY,
  VENDOR_UPDATE_PRODUCT_SUCCESS,
} from '../../constants';

const initialState = {
  selected: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VENDOR_CATEGORIES_CLEAR:
      return {
        ...state,
        selected: [],
      };

    case VENDOR_PRODUCT_CHANGE_CATEGORY:
      return {
        ...state,
        selected: action.payload,
      };

    case VENDOR_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        selected: [],
      };

    default:
      return state;
  }
}
