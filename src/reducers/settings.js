import { get } from 'lodash';
import {
  SET_CURRENCY,
  SET_LANGUAGE,
  GET_CURRENCIES,
  GET_LANGUAGES,
  RESTORE_STATE,
  LANGUAGE_CURRENCY_FEATURE_FLAG_OFF,
  SET_ADDONS_SETTINGS,
} from '../constants';

const initialState = {
  selectedCurrency: {
    symbol: '',
    currencyCode: '',
  },
  selectedLanguage: {
    langCode: '',
    name: '',
  },
  productReviewsAddon: {
    isEnabled: false,
    isCommentOnly: false,
  },
  dateFormat: '',
  languageCurrencyFeatureFlag: true,
  languages: null,
  currencies: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENCY:
      const newSelectedCurrency = {
        currencyCode: action.payload.currencyCode,
        symbol: action.payload.symbol,
      };
      return {
        ...state,
        selectedCurrency: newSelectedCurrency,
      };

    case GET_CURRENCIES:
      return {
        ...state,
        languageCurrencyFeatureFlag: true,
        currencies: action.payload.map((el) => {
          return {
            selected: el.currency_code === state.selectedCurrency.currencyCode,
            currencyCode: el.currency_code,
            symbol: el.symbol,
          };
        }),
      };

    case SET_LANGUAGE:
      const newSelectedLanguage = {
        langCode: action.payload.langCode,
        name: action.payload.name,
      };
      return {
        ...state,
        selectedLanguage: newSelectedLanguage,
      };

    case GET_LANGUAGES:
      return {
        ...state,
        languageCurrencyFeatureFlag: true,
        languages: action.payload.map((el) => {
          return {
            selected: el.lang_code === state.selectedLanguage.langCode,
            langCode: el.lang_code,
            name: el.name,
          };
        }),
      };

    case LANGUAGE_CURRENCY_FEATURE_FLAG_OFF:
      return {
        ...state,
        languageCurrencyFeatureFlag: false,
      };

    case SET_ADDONS_SETTINGS:
      const dateFormat = get(
        action.payload,
        'settings.appearance.calendar_date_format',
      );
      action.payload === 'day_first' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';
      const productReviewsAddon = get(action.payload, 'addons.product_reviews');
      const isCommentOnly =
        productReviewsAddon?.review_fields.length === 1 ? true : false;

      return {
        ...state,
        productReviewsAddon: {
          isEnabled: productReviewsAddon?.is_enabled,
          isCommentOnly,
        },
        dateFormat: dateFormat === 'day_first' ? 'dd/MM/yyyy' : 'MM/dd/yyyy',
      };

    case RESTORE_STATE:
      return {
        ...state,
        ...action.payload.settings,
      };

    default:
      return state;
  }
}
