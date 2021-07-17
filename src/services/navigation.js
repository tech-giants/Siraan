import { Navigation } from 'react-native-navigation';
import { iconsMap } from '../utils/navIcons';
import i18n from '../utils/i18n';
import theme from '../config/theme';

export function setRoot() {
  Navigation.setDefaultOptions({
    topBar: {
      backButton: {
        color: theme.$navBarButtonColor,
        showTitle: false,
      },
      title: {
        fontSize: theme.$navBarTitleFontSize,
        color: theme.$navBarTextColor,
      },
      background: {
        color: theme.$navBarBackgroundColor,
      },
    },
    layout: {
      backgroundColor: theme.$screenBackgroundColor,
    },
    bottomTabs: {
      backgroundColor: theme.$bottomTabsBackgroundColor,
    },
    bottomTab: {
      badgeColor: theme.$bottomTabsPrimaryBadgeColor,
      textColor: theme.$bottomTabsTextColor,
      selectedTextColor: theme.$bottomTabsSelectedTextColor,
      iconColor: theme.$bottomTabsIconColor,
      selectedIconColor: theme.$bottomTabsSelectedIconColor,
    },
  });
  return {
    root: {
      bottomTabs: {
        translucent: true,
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'Layouts',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: iconsMap.home,
                  text: i18n.t('Home'),
                },
              },
            },
          },
          {
            stack: {
              id: 'SEARCH_TAB',
              children: [
                {
                  component: {
                    id: 'SEARCH_SCREEN',
                    name: 'Search',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: iconsMap.search,
                  text: i18n.t('Search'),
                },
              },
            },
          },
          {
            stack: {
              id: 'CART_TAB',
              children: [
                {
                  component: {
                    id: 'CART_SCREEN',
                    name: 'Cart',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: iconsMap['shopping-cart'],
                  text: i18n.t('Cart'),
                },
              },
            },
          },
          {
            stack: {
              id: 'FAVORITE_TAB',
              children: [
                {
                  component: {
                    id: 'FAVORITE_SCREEN',
                    name: 'WishList',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: iconsMap.favorite,
                  text: i18n.t('Favorite'),
                },
              },
            },
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'PROFILE_SCREEN',
                    name: 'Profile',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: iconsMap.person,
                  text: i18n.t('Profile'),
                },
              },
            },
          },
        ],
      },
    },
  };
}

export function pushCategory(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'Categories',
      options: {
        topBar: {
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function showModalScrollPicker(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'ScrollPicker',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function showModalVendorDetail(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'VendorDetail',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function showModalVendor(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Vendor',
            passProps: params,
            options: {
              topBar: {
                title: {
                  text: params.company,
                },
              },
            },
          },
        },
      ],
    },
  });
}

export function showLogin(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Login',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function pushRegistration(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'Registration',
      passProps: params,
    },
  });
}

export function showRegistration(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Registration',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function showResetPassword(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'ResetPassword',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function popResetPassword(componentId, params) {
  Navigation.pop(componentId, {
    component: {
      name: 'ResetPassword',
      passProps: params,
    },
  });
}

export function pushProductDetail(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'ProductDetail',
      options: {
        topBar: {
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function pushAllProductReviews(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'AllProductReviews',
      options: {
        topBar: {
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function pushWriteReview(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'WriteReview',
      options: {
        topBar: {
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function showModalWriteReviewNew(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'WriteReviewNew',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function showPage(componentId, params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Page',
            options: {
              topBar: {
                title: {
                  text: params.title || '',
                },
              },
            },
            passProps: params,
          },
        },
      ],
    },
  });
}

export function showGallery(params = {}) {
  Navigation.showOverlay({
    component: {
      name: 'Gallery',
      passProps: params,
      options: {
        layout: {
          componentBackgroundColor: 'transparent',
          backgroundColor: 'red',
        },
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  });
}

export function showCheckoutProfile(params) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'CheckoutProfile',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function pushCheckoutAuth(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'CheckoutAuth',
      passProps: params,
    },
  });
}

export function pushCheckoutComplete(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'CheckoutComplete',
      passProps: params,
    },
  });
}

export function pushSettlementsCompleteWebView(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'SettlementsCompleteWebView',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || '',
          },
        },
      },
    },
  });
}

export function showDiscussion(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Discussion',
            passProps: params,
          },
        },
      ],
    },
  });
}

export function selectTab(name = 'home') {
  const tabsMape = {
    home: 0,
    search: 1,
    favorite: 2,
    cart: 3,
    profile: 4,
  };

  Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
    bottomTabs: {
      currentTabIndex: tabsMape[name] || 0,
    },
  });
}

export function pushProfileEdit(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'ProfileEdit',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: i18n.t('Profile'),
          },
        },
      },
    },
  });
}

export function pushOrders(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'Orders',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: i18n.t('Orders').toUpperCase(),
          },
        },
      },
    },
  });
}

export function pushOrderDetail(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'OrderDetail',
      passProps: params,
    },
  });
}

export function pushVendorManageOrders(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageOrders',
      passProps: params,
    },
  });
}

export function pushLanguageSelection(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'LanguageSelection',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: i18n.t('Select Language'),
          },
        },
      },
    },
  });
}

export function pushCurrencySelection(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'CurrencySelection',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: i18n.t('Currency'),
          },
        },
      },
    },
  });
}

export function pushVendorManageOrderDetail(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageOrderDetail',
      passProps: params,
    },
  });
}

export function pushVendorManageProducts(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageProducts',
      passProps: params,
    },
  });
}

export function pushVendorManageEditProduct(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageEditProduct',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || '',
          },
        },
      },
    },
  });
}

export function setStackVendorManageEditProduct(componentId, params = {}) {
  Navigation.setStackRoot(componentId, {
    component: {
      name: 'VendorManageEditProduct',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || '',
          },
        },
      },
    },
  });
}

export function showVendorManageCategoriesPicker(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'VendorManageCategoriesPicker',
            passProps: params,
            options: {
              topBar: {
                title: {
                  text: params.title || '',
                },
              },
            },
          },
        },
      ],
    },
  });
}

export function pushVendorManageCategoriesPicker(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageCategoriesPicker',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || '',
          },
        },
      },
    },
  });
}

export function showImagePicker(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'ImagePicker',
            passProps: params,
            options: {
              topBar: {
                title: {
                  text: i18n.t('Select product image'),
                },
              },
            },
          },
        },
      ],
    },
  });
}

export function pushVendorManagePricingInventory(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManagePricingInventory',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || i18n.t('Pricing / Inventory'),
          },
        },
      },
    },
  });
}

export function pushVendorManageShippingProperties(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageShippingProperties',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || i18n.t('Shipping properties'),
          },
        },
      },
    },
  });
}
