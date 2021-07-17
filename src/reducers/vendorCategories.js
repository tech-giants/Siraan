import {
  FETCH_VENDOR_CATEGORIES_REQUEST,
  FETCH_VENDOR_CATEGORIES_SUCCESS,
  FETCH_VENDOR_CATEGORIES_FAIL,
} from '../constants';

const initialState = {
  items: [],
  fetching: false,
};

function getCategoriesTree(categories, pid = 0) {
  const result = [];

  for (let i = 0; i < categories.length; i += 1) {
    if ('parent_id' in categories[i] && categories[i].parent_id == pid) {
      const found = {
        ...categories[i],
        subcategories: getCategoriesTree(categories, categories[i].category_id),
      };
      result.push(found);
    }
  }
  return result;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_VENDOR_CATEGORIES_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_VENDOR_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: getCategoriesTree(action.payload.categories, 0),
        fetching: false,
      };

    case FETCH_VENDOR_CATEGORIES_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
