import { IMAGE_PICKER_CLEAR, IMAGE_PICKER_TOGGLE } from '../constants';

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

    default:
      return state;
  }
}
