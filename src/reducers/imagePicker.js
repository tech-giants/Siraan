import {
  IMAGE_PICKER_CLEAR,
  IMAGE_PICKER_TOGGLE,
  IMAGE_PICKER_REMOVE,
} from '../constants';

const initialState = {
  selected: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IMAGE_PICKER_CLEAR:
      return {
        ...state,
        selected: [],
      };

    case IMAGE_PICKER_TOGGLE:
      return {
        ...state,
        selected: action.payload,
      };
    case IMAGE_PICKER_REMOVE:
      let selected = state.selected;
      selected = selected.filter((item) => action.payload !== item);
      return {
        ...state,
        selected,
      };

    default:
      return state;
  }
}
