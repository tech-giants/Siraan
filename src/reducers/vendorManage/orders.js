import {
  VENDOR_ORDERS_FAIL,
  VENDOR_ORDERS_SUCCESS,
  VENDOR_ORDER_REQUEST,
  VENDOR_ORDER_FAIL,
  VENDOR_ORDER_SUCCESS,
  VENDOR_ORDER_UPDATE_STATUS_SUCCESS,
  FETCH_ORDER_STATUSES_SUCCESS,
  VENDOR_ORDERS_LOADING,
  VENDOR_ORDERS_LOADED,
  VENDOR_ORDERS_FILTER,
} from '../../constants';

const initialState = {
  items: [],
  loading: true,
  hasMore: true,
  page: 0,
  loadingCurrent: true,
  current: {},
  orderStatuses: [],
  filterStatus: [
    { title: 'processed', value: false, status: 'P' },
    { title: 'complete', value: false, status: 'C' },
    { title: 'open', value: false, status: 'O' },
    { title: 'failed', value: false, status: 'F' },
    { title: 'declined', value: false, status: 'D' },
    { title: 'backordered', value: false, status: 'B' },
    { title: 'cancelled', value: false, status: 'I' },
    { title: 'awaiting_call', value: false, status: 'Y' },
  ],
};

let items = [];
let index = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case VENDOR_ORDERS_FILTER:
      console.log(
        'ordersReducer vendor filter action.payload filterStatus',
        action.payload,
      );
      let { obj, index } = act.payload;
      let { status, value } = obj;
      let filterStatus = [...state.filterStatus];
      filterStatus[index] = obj;
      let filteredItemsObj = {
        P: [],
        C: [],
        O: [],
        F: [],
        D: [],
        B: [],
        I: [],
        Y: [],
      };
      let filteredItems = [];
      //
      if (value) {
        let newArr = state.items.filter((element) => element.status === status);
        filteredItemsObj = { ...filteredItemsObj, [status]: newArr };
      } else {
        filteredItemsObj = { ...filteredItemsObj, [status]: [] };
      }
      Object.values(filteredItemsObj).map((item) => {
        return (filteredItems = filteredItems.concat(item));
      });
      return {
        ...state,
        filterStatus,
        items: filteredItems,
      };
    case VENDOR_ORDERS_FAIL:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case VENDOR_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case VENDOR_ORDERS_LOADED:
      return {
        ...state,
        loading: false,
      };

    case VENDOR_ORDERS_SUCCESS:
      return {
        ...state,
        hasMore: action.payload.hasMore,
        page: action.payload.page,
        items:
          action.payload.page === 1
            ? action.payload.items
            : [...state.items, ...action.payload.items],
        loading: false,
      };

    case VENDOR_ORDER_REQUEST:
      return {
        ...state,
        loadingCurrent: true,
      };

    case VENDOR_ORDER_SUCCESS:
      return {
        ...state,
        loadingCurrent: false,
        current: action.payload,
      };

    case VENDOR_ORDER_FAIL:
      return {
        ...state,
        loadingCurrent: false,
      };

    case FETCH_ORDER_STATUSES_SUCCESS:
      return {
        ...state,
        orderStatuses: action.payload.order_statuses,
      };

    case VENDOR_ORDER_UPDATE_STATUS_SUCCESS:
      items = [...state.items];
      index =
        items.findIndex((item) => item.order_id === action.payload.id) || 0;
      items[index].status = action.payload.status;

      return {
        ...state,
        items,
        current: action.payload.status,
      };

    default:
      return state;
  }
}
