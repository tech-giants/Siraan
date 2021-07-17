import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
} from '../constants';

const initialState = {
  params: {},
  items: [],
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        items: action.payload.orders,
        params: action.payload.params,
        fetching: false,
      };

    case FETCH_ORDERS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
