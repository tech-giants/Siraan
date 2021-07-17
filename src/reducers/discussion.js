import {
  FETCH_DISCUSSION_REQUEST,
  FETCH_DISCUSSION_SUCCESS,
  FETCH_DISCUSSION_FAIL,
  POST_DISCUSSION_REQUEST,
  POST_DISCUSSION_SUCCESS,
  POST_DISCUSSION_FAIL,
} from '../constants';

const initialState = {
  isNewPostSent: false,
  fetching: false,
  items: {},
};

let items = {}; // eslint-disable-line

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DISCUSSION_REQUEST:
      return {
        ...state,
        fetching: true,
        isNewPostSent: false,
      };

    case FETCH_DISCUSSION_SUCCESS:
      if (action.payload.page !== 1) {
        items[action.payload.id] = {
          ...state.items[action.payload.id],
          ...action.payload.discussion,
          posts: [
            ...state.items[action.payload.id].posts,
            ...action.payload.discussion.posts,
          ],
        };
      } else {
        items[action.payload.id] = action.payload.discussion;
      }

      return {
        ...state,
        items,
        fetching: false,
      };

    case FETCH_DISCUSSION_FAIL:
      return {
        ...state,
        fetching: false,
      };

    case POST_DISCUSSION_REQUEST:
    case POST_DISCUSSION_FAIL:
      return {
        ...state,
        postSentFetching: true,
        fetching: true,
      };

    case POST_DISCUSSION_SUCCESS:
      return {
        ...state,
        postSentFetching: false,
        fetching: false,
      };

    default:
      return state;
  }
}
