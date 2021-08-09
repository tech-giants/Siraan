import {
  CIRCLES_LAYOUT_ACTION_REQUEST,
  CIRCLES_LAYOUT_ACTION_SUCCESS,
  CIRCLES_LAYOUT_ACTION_FAIL,
} from '../constants';

const initialState = {
  blocks: [],
  fetching: false,
};

let newState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case CIRCLES_LAYOUT_ACTION_REQUEST:
      const fetching = action.payload.turnOffLoader ? false : true;
      return {
        ...state,
        fetching,
      };

    case CIRCLES_LAYOUT_ACTION_SUCCESS:
      // FIXME: Brainfuck code convert object to array.
      newState = Object.keys(action.payload.blocks)
        .map((k) => {
          action.payload.blocks[k].location = action.payload.location; // eslint-disable-line
          return action.payload.blocks[k];
        })
        .sort((a, b) => a.order - b.order);
      return {
        ...state,
        blocks: newState,
        fetching: false,
      };

    case CIRCLES_LAYOUT_ACTION_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
