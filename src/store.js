import { applyMiddleware, createStore } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { STORE_KEY } from './constants';

import rootReducer from './reducers';

const middlewares = [thunk];

// Apply logger if we are in debug mode.
if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares),
);

store.subscribe(() => {
  AsyncStorage.setItem(
    STORE_KEY,
    JSON.stringify({
      auth: store.getState().auth,
      cart: store.getState().cart,
      profile: store.getState().profile,
      settings: {
        ...store.getState().settings,
        languageCurrencyFeatureFlag: true,
        productReviewsAddon: {
          isEnabled: false,
          isCommentOnly: false,
        },
      },
    }),
  );
});

export default store;
