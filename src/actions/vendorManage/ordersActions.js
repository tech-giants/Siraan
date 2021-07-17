import {
  VENDOR_ORDERS_REQUEST,
  VENDOR_ORDERS_FAIL,
  VENDOR_ORDERS_SUCCESS,
  VENDOR_ORDER_REQUEST,
  VENDOR_ORDER_FAIL,
  VENDOR_ORDER_SUCCESS,
  VENDOR_ORDER_UPDATE_STATUS_REQUEST,
  VENDOR_ORDER_UPDATE_STATUS_FAIL,
  VENDOR_ORDER_UPDATE_STATUS_SUCCESS,
  NOTIFICATION_SHOW,
  FETCH_ORDER_STATUSES_REQUEST,
  FETCH_ORDER_STATUSES_SUCCESS,
  FETCH_ORDER_STATUSES_FAIL,
  VENDOR_ORDERS_LOADED,
  VENDOR_ORDERS_LOADING,
} from '../../constants';
import i18n from '../../utils/i18n';
import * as vendorService from '../../services/vendors';

export function fetch(page = 0) {
  return async (dispatch) => {
    dispatch({
      type: VENDOR_ORDERS_REQUEST,
      payload: page,
    });
    const nextPage = page + 1;

    try {
      const result = await vendorService.getOrdersList(nextPage);
      dispatch({
        type: VENDOR_ORDERS_SUCCESS,
        payload: {
          items: result.data.orders,
          page: nextPage,
          hasMore: result.data.orders.length !== 0,
        },
      });
    } catch (error) {
      dispatch({
        type: VENDOR_ORDERS_FAIL,
        error,
      });
    }
  };
}

export function fetchOrder(id) {
  return async (dispatch) => {
    dispatch({
      type: VENDOR_ORDER_REQUEST,
    });

    try {
      const result = await vendorService.getOrder(id);

      if (!result.data.order.order_id) {
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'info',
            title: i18n.t('Information'),
            text: i18n.t('Order not found.'),
          },
        });
        return null;
      }

      dispatch({
        type: VENDOR_ORDER_SUCCESS,
        payload: result.data.order,
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
          type: 'info',
          title: i18n.t('Error'),
          text: i18n.t(error.errors.join('\n')),
        },
      });

      dispatch({
        type: VENDOR_ORDER_FAIL,
        error,
      });
    }
    return true;
  };
}

export function getOrderStatuses() {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ORDER_STATUSES_REQUEST,
    });

    try {
      const result = await vendorService.getOrderStatuses();

      dispatch({
        type: FETCH_ORDER_STATUSES_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ORDER_STATUSES_FAIL,
      });
    }
  };
}

export function updateVendorOrderStatus(id, status) {
  return async (dispatch) => {
    dispatch({
      type: VENDOR_ORDER_UPDATE_STATUS_REQUEST,
    });
    dispatch({
      type: VENDOR_ORDERS_LOADING,
    });

    try {
      await vendorService.updateVendorOrderStatus(id, status);
      await fetch()(dispatch);

      dispatch({
        type: VENDOR_ORDER_UPDATE_STATUS_SUCCESS,
      });
      dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
          type: 'success',
          title: i18n.t('Success'),
          text: i18n.t('Status has been changed.'),
        },
      });
      dispatch({
        type: VENDOR_ORDERS_LOADED,
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
          type: 'info',
          title: i18n.t('Error'),
          text: i18n.t(error.errors.join('\n')),
        },
      });
      dispatch({
        type: VENDOR_ORDER_UPDATE_STATUS_FAIL,
      });
    }
  };
}
