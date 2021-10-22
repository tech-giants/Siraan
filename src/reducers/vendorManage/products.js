import {
  VENDOR_FETCH_PRODUCTS_FAIL,
  VENDOR_FETCH_PRODUCTS_SUCCESS,
  VENDOR_FETCH_PRODUCT_REQUEST,
  VENDOR_FETCH_PRODUCT_FAIL,
  VENDOR_FETCH_PRODUCT_SUCCESS,
  VENDOR_DELETE_PRODUCT_SUCCESS,
  VENDOR_UPDATE_PRODUCT_REQUEST,
  VENDOR_UPDATE_PRODUCT_FAIL,
  VENDOR_UPDATE_PRODUCT_SUCCESS,
  VENDOR_PRODUCT_CHANGE_CATEGORY,
  UPDATE_PRODUCT_FEATURES_REQUEST,
  UPDATE_PRODUCT_FEATURES_SUCCESS,
  UPDATE_PRODUCT_FEATURES_FAIL,
  VENDOR_CREATE_PRODUCT_FAIL,
  VENDOR_CREATE_PRODUCT_SUCCESS,
  VENDOR_CREATE_PRODUCT_REQUEST,
} from '../../constants';

const initialState = {
  items: [],
  loading: false,
  hasMore: true,
  page: 0,
  loadingCurrent: true,
  // loadingCurrent: false,
  current: {},
  updating: false,
  creatingProduct: false,
};

let foundProduct;
let newItems;

export default function (state = initialState, action) {
  switch (action.type) {
    case VENDOR_FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case VENDOR_FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasMore: action.payload.hasMore,
        page: action.payload.page,
        items:
          action.payload.page === 1
            ? action.payload.items
            : [...state.items, ...action.payload.items],
      };

    case VENDOR_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.product_id !== action.payload),
      };

    case VENDOR_UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        loadingCurrent: false,
      };

    case VENDOR_UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        current: {
          ...state.current,
          ...action.payload.product,
        },
      };

    case VENDOR_UPDATE_PRODUCT_SUCCESS:
      foundProduct = state.items.findIndex(
        (item) => item.product_id === action.payload.id,
      );
      newItems = [...state.items];
      newItems[foundProduct] = {
        ...newItems[foundProduct],
        ...action.payload.product,
      };

      return {
        ...state,
        loading: false,
        current: {
          ...state.current,
          ...action.payload.product,
        },
        items: newItems,
      };

    case VENDOR_FETCH_PRODUCT_REQUEST:
      console.log('VENDOR_FETCH_PRODUCT_REQUEST', action.payload);
      return {
        ...state,
        loadingCurrent: action.payload,
      };

    case VENDOR_FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loadingCurrent: false,
      };

    case VENDOR_FETCH_PRODUCT_FAIL:
      return {
        ...state,
        loadingCurrent: true,
      };

    case VENDOR_PRODUCT_CHANGE_CATEGORY:
      return {
        ...state,
        current: {
          ...state.current,
          categories: action.payload,
        },
      };
    case UPDATE_PRODUCT_FEATURES_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case UPDATE_PRODUCT_FEATURES_SUCCESS:
      return {
        ...state,
        updating: false,
      };
    case UPDATE_PRODUCT_FEATURES_FAIL:
      return {
        ...state,
        updating: false,
      };
    case VENDOR_CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        creatingProduct: true,
      };
    case VENDOR_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        creatingProduct: false,
      };
    case VENDOR_CREATE_PRODUCT_FAIL:
      return {
        ...state,
        creatingProduct: false,
      };

    default:
      return state;
  }
}
