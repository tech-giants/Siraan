import {
  VENDOR_REVIEW_REQUEST,
  VENDOR_REVIEW_SUCCESS,
  VENDOR_REVIEW_FAIL,
} from '../../constants';
const initialState = {
  fetching: false,
  loadingMore: false,
  data: [],
  params: {
    page: 0,
  },
  hasMore: true,
};

export default function (state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case VENDOR_REVIEW_REQUEST:
      let fetching = state.data.length < 1;
      let loadingMore = state.data.length > 1;
      return {
        ...state,
        fetching,
        loadingMore,
      };

    case VENDOR_REVIEW_SUCCESS:
      let { params, page } = payload;
      let total_items = parseInt(params.total_items);
      let data = page > 1 ? [...state.data, ...payload.data] : payload.data;
      let hasMore = data.length < total_items;
      return {
        ...state,
        fetching: false,
        loadingMore: false,
        data,
        params,
        hasMore,
      };

    case VENDOR_REVIEW_FAIL:
      return {
        ...state,
        fetching: false,
        loadingMore: false,
      };

    default:
      return state;
  }
}
