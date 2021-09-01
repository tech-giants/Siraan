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
  // console.log('people also view reduser rrrrrrrrrrrrrrrrrrrrrrrrrrr')
  switch (action.type) {
    case PEOPLE_ALSO_VIEW_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case PEOPLE_ALSO_VIEW_SUCCESS:
      // console.log('people also view reduser successsssssssssssssssss',action.payload)
      return {
        ...state,
        data: action.payload,
        products: action.payload.products ,
        fetching: false,
      };

    case PEOPLE_ALSO_VIEW_FAIL:
      // console.log('people also view reduser failllllllllllllllllllllll')
      return {
        ...state,
        fetching: false,
      };
    

    default:
      return state;
  }
}
