import {
  FETCH_ALL_BRANDS_REQUEST,
  FETCH_ALL_BRANDS_FAIL,
  FETCH_ALL_BRANDS_SUCCESS,
} from '../constants';

const initialState = {
  variants: {},
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_BRANDS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ALL_BRANDS_SUCCESS:
      // items = { ...state.items };
      // params = { ...action.payload.params };
      // if (
      //   // items[params.cid] &&
      //   action.payload.params.page === 1
      // ) {
      //   // items[params.cid] = [...items[params.cid], ...action.payload.products];
      //   items = [...action.payload.products];
      // } else {
      //   items = [...state.items, ...action.payload.products];
      // }
    
      return {
        ...state,
        variants: action.payload,
        fetching: false,
      };

    case FETCH_ALL_BRANDS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
