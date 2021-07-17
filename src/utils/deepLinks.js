import { Linking, Alert } from 'react-native';

import i18n from './i18n';
import config from '../config';
import store from '../store';
import * as nav from '../services/navigation';
import { parseQueryString } from './index';

export const registerDrawerDeepLinks = (event, componentId) => {
  const { auth } = store.getState();

  const { payload, link } = event;
  const params = parseQueryString(link);

  if (params.dispatch === 'pages.view' && params.page_id) {
    nav.showPage(componentId, {
      title: payload.title,
      uri: `${config.siteUrl}index.php?dispatch=pages.view&page_id=${params.page_id}&s_layout=${config.layoutId}`,
    });
  } else if (params.dispatch === 'cart.content') {
    nav.selectTab('cart');
  } else if (params.dispatch === 'products.view' && params.product_id) {
    nav.pushProductDetail(componentId, {
      pid: params.product_id,
      payload,
    });
  } else if (params.dispatch === 'categories.view' && params.category_id) {
    nav.pushCategory(componentId, {
      categoryId: params.category_id,
    });
  } else if (params.dispatch === 'companies.products' && params.company_id) {
    nav.showModalVendor({
      companyId: params.company_id,
    });
  } else if (params.dispatch === 'companies.view' && params.company_id) {
    navigator.showModal({
      screen: 'VendorDetail',
      passProps: {
        vendorId: params.company_id,
      },
    });
  } else if (link === 'home/') {
    nav.selectTab('home');
  } else if (link === 'vendor/orders/') {
    nav.pushVendorManageOrders(componentId, {});
  } else if (link === 'vendor/add_product/') {
    nav.showVendorManageCategoriesPicker({
      title: i18n.t('Categories').toUpperCase(),
      parent: 0,
    });
  } else if (link === 'vendor/products/') {
    nav.pushVendorManageProducts(componentId, {});
  } else if (link.startsWith('http://') || link.startsWith('https://')) {
    Linking.canOpenURL(link).then((supported) => {
      if (!supported) {
        return Alert.alert(i18n.t("Can't handle url"), '');
      }
      return Linking.openURL(link);
    });
  }

  if (auth.logged) {
    if (params.dispatch === 'profiles.update') {
      nav.pushProfileEdit(componentId, {});
    } else if (params.dispatch === 'orders.details' && params.order_id) {
      nav.pushOrderDetail(componentId, {
        orderId: params.order_id,
      });
    } else if (params.dispatch === 'orders.search') {
      nav.pushOrders(componentId);
    }
  }
};
