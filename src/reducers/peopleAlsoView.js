import {
  PEOPLE_ALSO_VIEW_REQUEST,
  PEOPLE_ALSO_VIEW_SUCCESS,
  PEOPLE_ALSO_VIEW_FAIL,
} from '../constants';

const initialState = {
  data: {},
  fetching: false,
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PEOPLE_ALSO_VIEW_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case PEOPLE_ALSO_VIEW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        products: action.payload.products ,
        fetching: false,
      };

    case PEOPLE_ALSO_VIEW_FAIL:
      return {
        ...state,
        fetching: false,
      };
    

    default:
      return state;
  }
}
