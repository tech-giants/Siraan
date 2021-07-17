import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAIL,
} from '../constants';

const initialState = {
  items: {},
  fetching: false,
  currentVendor: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_VENDOR_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_VENDOR_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.company_id]: action.payload,
        },
        fetching: false,
        currentVendor: action.payload,
      };

    case FETCH_VENDOR_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
