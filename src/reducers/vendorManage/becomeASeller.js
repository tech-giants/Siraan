import {
  NOTIFICATION_SHOW,
  BECOME_SELLER_REQUEST,
  BECOME_SELLER_SUCCESS,
  BECOME_SELLER_FAIL,
} from '../../constants';
const initialState = {
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BECOME_SELLER_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case BECOME_SELLER_SUCCESS:
      console.log(
        'becomeASeller BECOME_SELLER_SUCCESS action.payload',
        action.payload,
      );
      return {
        ...state,
        fetching: false,
      };

    case BECOME_SELLER_FAIL:
      console.log(
        'becomeASeller BECOME_SELLER_FAIL action.payload',
        action.payload,
      );
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
