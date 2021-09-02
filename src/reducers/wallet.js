import {
  WALLET_DATA_REQUEST,
  WALLET_DATA_SUCCESS,
  RESTORE_STATE,
  WALLET_DATA_FAIL,
} from '../constants';

const initialState = {
  data: {},
  fetching: false,
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WALLET_DATA_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case WALLET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        message: 'data fetched',
      };

    case WALLET_DATA_FAIL:
      return {
        ...state,
        message: action.payload,
        fetching: false,
      };
    case RESTORE_STATE:
      return {
        ...state,
        ...action.payload.wallet,
      };

    default:
      return state;
  }
}
