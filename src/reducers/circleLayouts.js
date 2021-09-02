import {
  CIRCLES_LAYOUT_ACTION_REQUEST,
  CIRCLES_LAYOUT_ACTION_FAIL,
  CIRCLES_LAYOUT_ACTION_SUCCESS,
  CHANGE_PRODUCTS_SORT,
} from '../constants';

const initialState = {
  // sortParams: {
  //   sort_by: 'product',
  //   sort_order: 'asc',
  // },
  params: {
    page: 1,
  },
  items: [],
  // filters: [],
  fetching: false,
  hasMore: false,
};

let params = {};
let items = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case CIRCLES_LAYOUT_ACTION_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CIRCLES_LAYOUT_ACTION_SUCCESS:
      items = { ...state.items };
      params = { ...action.payload.params };
      if (
        // items[params.cid] &&
        action.payload.params.page === 1
      ) {
        // items[params.cid] = [...items[params.cid], ...action.payload.products];
        items = [...action.payload.products];
      } else {
        items = [...state.items, ...action.payload.products];
      }
      return {
        ...state,
        params,
        items,
        // filters: action.payload.filters || [],
        hasMore: params.items_per_page * params.page < +params.total_items,
        fetching: false,
      };

    case CIRCLES_LAYOUT_ACTION_FAIL:
      return {
        ...state,
        fetching: false,
      };

    // case CHANGE_PRODUCTS_SORT:
    //   return {
    //     ...state,
    //     sortParams: action.payload,
    //   };

    default:
      return state;
  }
}
