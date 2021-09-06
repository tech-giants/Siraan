import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
  RESET_SEARCH,
} from '../constants';

const initialState = {
  params: {
    page: 1,
  },
  items: [],
  fetching: false,
  hasMore: false,
  isFirstLoad: true,
};

let params = {};
let items = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        fetching: true,
        items: state.isFirstLoad ? {} : state.items,
      };

    case SEARCH_PRODUCTS_SUCCESS:
      items = [];
      params = { ...action.payload.params };

      if (params.page != 1) {
        items = [...state.items, ...action.payload.products];
      } else {
        items = [...action.payload.products];
      }

      return {
        params,
        items,
        fetching: false,
        hasMore: params.items_per_page * params.page < +params.total_items,
        isFirstLoad: false,
      };

    case SEARCH_PRODUCTS_FAIL:
      return {
        ...state,
        fetching: false,
        hasMore: false,
        isFirstLoad: true,
      };
    case RESET_SEARCH:
      return initialState;

    default:
      return state;
  }
}
