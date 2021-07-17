import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: false,
  nsSeparator: ':::',
  keySeparator: false,
  fallbackLng: 'en',
});

export default i18n;
