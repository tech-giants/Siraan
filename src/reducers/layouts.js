import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,
} from '../constants';

const initialState = {
  blocks: [],
  fetching: false,
};

let newState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LAYOUTS_BLOCKS_REQUEST:
      const fetching = action.payload.turnOffLoader ? false : true;
      return {
        ...state,
        fetching,
      };

    case FETCH_LAYOUTS_BLOCKS_SUCCESS:
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

    case FETCH_LAYOUTS_BLOCKS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
