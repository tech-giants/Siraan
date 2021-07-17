import {
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,
  WISH_LIST_FETCH_FAIL,
  WISH_LIST_ADD_SUCCESS,
  WISH_LIST_REMOVE_REQUEST,
  WISH_LIST_REMOVE_SUCCESS,
  WISH_LIST_CLEAR,
} from '../constants';

const initialState = {
  items: [],
  fetching: false,
};

let newState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case WISH_LIST_FETCH_REQUEST:
      return {
        ...state,
        fetching: action.payload.fetching,
      };

    case WISH_LIST_FETCH_SUCCESS:
      newState = Object.keys(action.payload.products).map((k) => ({
        ...action.payload.products[k],
        cartId: k,
      }));
      return {
        ...state,
        items: newState,
        fetching: false,
      };

    case WISH_LIST_FETCH_FAIL:
      return initialState;

    case WISH_LIST_ADD_SUCCESS:
      return {
        ...state,
        fetching: false,
      };

    case WISH_LIST_REMOVE_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case WISH_LIST_REMOVE_SUCCESS:
      return {
        ...state,
        items: [...state.items].filter(
          (i) => i.cartId !== action.payload.cartId,
        ),
        fetching: false,
      };

    case WISH_LIST_CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
