import {
  FETCH_ORDERS_REQUEST,
  RESTORE_STATE,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
} from '../constants';

const initialState = {
  params: {},
  items: [],
  fetching: false,
};

export default function (state = initialState, action) {
  console.log('orders reducer action objectttttttttttt=>>>>', action)
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
    case RESTORE_STATE:
      return {
        ...state,
        ...action.payload.orders,
      };
    default:
      return state;
  }
}
