import { NOTIFICATION_HIDE, NOTIFICATION_SHOW } from '../constants';

const initialState = {
  items: [],
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return {
        items: [
          ...state.items,
          {
            ...action.payload,
            id: action.payload.id || Date.now(),
          },
        ],
      };

    case NOTIFICATION_HIDE:
      return {
        items: state.items.filter(
          (notification) => notification.id !== action.payload.id,
        ),
      };

    default:
      return {
        ...state,
      };
  }
}
