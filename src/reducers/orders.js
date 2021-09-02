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
  productsID: {},
};

export default function (state = initialState, action) {
  // console.log('orders reducer action objectttttttttttt=>>>>', action)
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      console.log('orders reducer fetchingggggggggggg=>>>>', action)
      return {
        ...state,
        fetching: true,
      };
      
      case FETCH_ORDERS_SUCCESS:
      console.log('orders reducer succcesssssssssssssssss=>>>>', action)
      return {
        ...state,
        items: action.payload.orders,
        params: action.payload.params,
        fetching: false,
        productsID : action.payload.orders.product_id
      };
      
      case FETCH_ORDERS_FAIL:
      console.log('orders reducer failllllllllllllllllllllllll=>>>>', action)
      return {
        ...state,
        fetching: false,
      };
      case RESTORE_STATE:
        console.log('orders reducer restoreeeeeeeeeeeeeeeeeeeeeeeeee=>>>>', action)
        return {
          ...state,
        ...action.payload.orders,
      };
    default:
      return state;
  }
}
