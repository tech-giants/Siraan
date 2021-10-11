import {
  FETCH_ALL_BRANDS_REQUEST,
  FETCH_ALL_BRANDS_FAIL,
  FETCH_ALL_BRANDS_SUCCESS,
  //
  FETCH_FEATURES_REQUEST,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_FAIL,
} from '../constants';

const initialState = {
  variants: {},
  fetching: false,
  colors: [],
  sizes: [],
  fetchingColors: false,
  fetchingSizes: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_BRANDS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ALL_BRANDS_SUCCESS:
      return {
        ...state,
        variants: action.payload,
        fetching: false,
      };

    case FETCH_ALL_BRANDS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    // --------------------------- 548 is size features id
    case `${FETCH_FEATURES_REQUEST}548`:
      return {
        ...state,
        fetchingSizes: true,
      };
    case `${FETCH_FEATURES_SUCCESS}548`:
      let sizesArr = [];
      let sizesObj = action.payload;
      Object.values(sizesObj).map((value, key) => {
        const item = {
          variant: value.variant,
          variant_id: value.variant_id,
        };
        sizesArr.push(item);
      });
      console.log(`FETCH_FEATURES_SUCCESS 548`, sizesArr);
      return {
        ...state,
        fetchingSizes: false,
        sizes: sizesArr,
      };
    case `${FETCH_FEATURES_FAIL}548`:
      return {
        ...state,
        fetchingSizes: false,
      };

    //  -------------------------- 549 is color features id
    case `${FETCH_FEATURES_REQUEST}549`:
      return {
        ...state,
        fetchingColors: true,
      };
    case `${FETCH_FEATURES_SUCCESS}549`:
      let colorArr = [];
      let colorsObj = action.payload;
      Object.values(colorsObj).map((value, key) => {
        const item = {
          variant: value.variant,
          variant_id: value.variant_id,
        };
        colorArr.push(item);
      });
      console.log(`FETCH_FEATURES_SUCCESS`, colorArr);
      return {
        ...state,
        fetchingColors: false,
        colors: colorArr,
      };
    case `${FETCH_FEATURES_FAIL}549`:
      return {
        ...state,
        fetchingColors: false,
      };

    default:
      return state;
  }
}
