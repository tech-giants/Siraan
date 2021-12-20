import {
  IMAGE_PICKER_TOGGLE,
  IMAGE_PICKER_CLEAR,
  IMAGE_PICKER_REMOVE,
} from '../constants';

export function clear() {
  return (dispatch) => {
    dispatch({
      type: IMAGE_PICKER_CLEAR,
    });
  };
}

export function toggle(images) {
  return async (dispatch) => {
    dispatch({
      type: IMAGE_PICKER_TOGGLE,
      payload: images,
    });
  };
}
export function remove(image) {
  return async (dispatch) => {
    dispatch({
      type: IMAGE_PICKER_REMOVE,
      payload: image,
    });
  };
}
