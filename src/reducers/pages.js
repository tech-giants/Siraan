import {
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_FAIL,
  FETCH_PAGES_SUCCESS,
} from '../constants';

const initialState = {
  items: [],
  empty: true,
  fetching: true,
};
let pages;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGES_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PAGES_SUCCESS:
      // FIXME: Brainfuck code convert object to array.
      pages = [];
      Object.keys(action.payload).forEach((id) => {
        if (action.payload[id].type === 'pages') {
          pages = [...pages, ...action.payload[id].content.items];
        }
      });
      return {
        ...state,
        items: pages,
        empty: !!pages.length,
        fetching: false,
      };

    case FETCH_PAGES_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
