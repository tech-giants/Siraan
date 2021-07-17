import { NOTIFICATION_HIDE, NOTIFICATION_SHOW } from '../constants';

export function hide(id) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATION_HIDE,
      payload: {
        id,
      },
    });
  };
}

export function show(
  params = {
    type: 'success',
    title: '',
    text: '',
  },
) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
          ...params,
        },
      });
    }, 100);
  };
}
