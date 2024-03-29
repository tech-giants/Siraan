import { Navigation } from 'react-native-navigation';
import { iconsMap } from '../utils/navIcons';
import i18n from '../utils/i18n';
import theme from '../config/theme';

export function setRoot() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
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
      orientation: ['portrait'],
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
                    name: 'CategoriesHub',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                  title: {
                    text: 'Categories',
                  },
                },
                bottomTab: {
                  icon: iconsMap['grid-on'],
                  text: i18n.t('Categories'),
                },
              },
            },
          },
          // {
          //   stack: {
          //     id: 'SEARCH_TAB',
          //     children: [
          //       {
          //         component: {
          //           id: 'SEARCH_SCREEN',
          //           name: 'CategoriesHub',

          //         },
          //       },
          //     ],
          //     options: {
          //       bottomTab: {
          //         icon: iconsMap.grid-view,
          //         text: i18n.t('Categories'),
          //       },
          //     },
          //   },
          // },
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
                  text: i18n.t('My Account'),
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

export function pushAllProducts(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'AllProducts',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}
export function pushCirclesLayouts(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'CirclesLayouts',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}
export function pushBrandsShowcase(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'BrandsShowcase',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function showQrScanner(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'QR_SCREEN',
            name: 'QrScanner',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
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
// saldiri nav added 👇
export function showCategoriesHub(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'CategoriesHub',
            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}
export function showSaldiriContactUs(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'CONTACT_US_SCREEN',
            name: 'SaldiriContactUs',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function showSearch(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'SALDIRI_SEARCH_SCREEN',
            name: 'Search',
            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}
export function showDataTable(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'DataTable',
            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}
export function showCart(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: 'Cart',
            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}
// saldiri nav added 👆

export function pushRegistration(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'Registration',
      passProps: params,
    },
  });
}
export function pushBecomeSeller(componentId, params) {
  Navigation.push(componentId, {
    component: {
      name: 'BecomeSeller',
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
    cart: 2,
    favorite: 3,
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
          visible: false,
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
          visible: false,
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
          visible: false,
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

export function pushVendorManageFeatures(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorManageFeatures',
      passProps: params,
      options: {
        topBar: {
          title: {
            text: params.title || i18n.t('Features'),
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

export function Dukaan(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'Dukaan',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function ViewOrders(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'ViewOrders',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function ViewProduct(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'ViewProduct',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function OrderInfo(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'OrderInfo',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function ProductInfo(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'ProductInfo',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function VendorAddProduct(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'VendorAddProduct',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function OrderStatus(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'OrderStatus',
            name: 'OrderStatus',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function ProductStatus(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'ProductStatus',
            name: 'ProductStatus',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function OrderSortBy(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'OrderSortBy',
            name: 'OrderSortBy',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function SortOrders(companyId, params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'SortOrders',
            name: 'SortOrders',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}
export function SortProducts(companyId, params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'SortProducts',
            name: 'SortProducts',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function FilterOrder(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'FilterOrder',
            name: 'FilterOrder',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function FilterOrders(componentId, params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'FilterOrders',
            name: 'FilterOrders',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}
export function FilterProducts(componentId, params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'FilterProducts',
            name: 'FilterProducts',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function ProductType(params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'ProductType',
            name: 'ProductType',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function ProductTypeCategory(componentId, params = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'ProductTypeCategory',
            name: 'ProductTypeCategory',

            passProps: params,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function Review(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'Review',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function Card(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'Card',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function AddVariants(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'AddVariants',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function SizeVariants(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'SizeVariants',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function ColorVariants(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'ColorVariants',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}

export function StyleVariants(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'StyleVariants',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}
export function MaterialVariants(componentId, params = {}) {
  Navigation.push(componentId, {
    component: {
      name: 'MaterialVariants',
      options: {
        topBar: {
          visible: false,
          backButtonTitle: '',
        },
      },
      passProps: params,
    },
  });
}
