import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Cart from './screens/Cart';
import Page from './screens/Page';
import Login from './screens/Login';
import Orders from './screens/Orders';
import Vendor from './screens/Vendor';
import Search from './screens/Search';
import Gallery from './screens/Gallery';
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit';
import Layouts from './screens/Layouts';
import WishList from './screens/WishList';
import Discussion from './screens/Discussion';
import Categories from './screens/Categories';
import WriteReview from './screens/WriteReview';
import WriteReviewNew from './screens/WriteReviewNew';
import OrderDetail from './screens/OrderDetail';
import ImagePicker from './screens/ImagePicker';
import VendorDetail from './screens/VendorDetail';
import ScrollPicker from './screens/ScrollPicker';
import CheckoutAuth from './screens/CheckoutAuth';
import Registration from './screens/Registration';
import ResetPassword from './screens/ResetPassword';
import ProductDetail from './screens/ProductDetail';
import Notification from './components/Notification';
import CheckoutPayment from './screens/CheckoutPayment';
import CheckoutComplete from './screens/CheckoutComplete';
import CheckoutShipping from './screens/CheckoutShipping';
import CheckoutProfile from './screens/CheckoutProfile';
import SettlementsCompleteWebView from './screens/SettlementsCompleteWebView';
import VendorManageOrders from './screens/VendorManage/Orders';
import VendorManageProducts from './screens/VendorManage/Products';
import VendorManageAddProductStep1 from './screens/VendorManage/AddProductStep1';
import VendorManageAddProductStep2 from './screens/VendorManage/AddProductStep2';
import VendorManageAddProductStep3 from './screens/VendorManage/AddProductStep3';
import VendorManageEditProduct from './screens/VendorManage/EditProduct';
import VendorManagePricingInventory from './screens/VendorManage/PricingInventory';
import VendorManageShippingProperties from './screens/VendorManage/ShippingProperties';
import VendorManageCategoriesPicker from './screens/VendorManage/CategoriesPicker';
import VendorManageOrderDetail from './screens/VendorManage/OrderDetail';
import LanguageSelection from './screens/LanguageSelection';
import CurrencySelection from './screens/CurrencySelection';
import AllProductReviews from './screens/AllProductReviews';
import AllProducts from './screens/AllProducts';
import CirclesLayouts from './screens/CirclesLayouts';
import BrandsShowcase from './screens/BrandsShowcase';
//
import CategoriesHub from './screens/CategoriesHub';
import QrScanner from './screens/QrScanner';
import BecomeSeller from './screens/BecomeSeller';
import SaldiriContactUs from './components/SaldiriComponents/SaldiriContactUs';
import VendorManageFeatures from './screens/VendorManage/Features';

import Dukaan from './screens/Dukaan';
import ViewOrders from './screens/VendorManage/ViewOrders';
import ViewProduct from './screens/VendorManage/ViewProduct';
import OrderInfo from './screens/VendorManage/OrderInfo';
import ProductInfo from './screens/VendorManage/ProductInfo';
import OrderStatus from './screens/VendorManage/OrderStatus';
import ProductStatus from './screens/VendorManage/ProductStatus';
import OrderSortBy from './screens/VendorManage/OrderSortBy';
import SortOrders from './screens/VendorManage/SortOrders';
import SortProducts from './screens/VendorManage/SortProducts';
import FilterOrder from './screens/VendorManage/FilterOrder';
import FilterOrders from './screens/VendorManage/FilterOrders';
import FilterProducts from './screens/VendorManage/FilterProducts';
import VendorAddProduct from './screens/VendorManage/VendorAddProduct';
import ProductType from './screens/VendorManage/ProductType';
import ProductTypeCategory from './screens/VendorManage/ProductTypeCategory';
import Review from './screens/VendorManage/Review/Review';
import Card from './screens/VendorManage/Review/Card';
import AddVariants from './screens/VendorManage/AddVariants';
import SizeVariants from './screens/VendorManage/SizeVariants';
import ColorVariants from './screens/VendorManage/ColorVariants';
import StyleVariants from './screens/VendorManage/StyleVariants';
import MaterialVariants from './screens/VendorManage/MaterialVariants';

const screenList = [
  { name: 'Page', component: Page },
  { name: 'Cart', component: Cart },
  { name: 'Login', component: Login },
  { name: 'Registration', component: Registration },
  { name: 'ResetPassword', component: ResetPassword },
  { name: 'Search', component: Search },
  { name: 'Vendor', component: Vendor },
  { name: 'Gallery', component: Gallery },
  { name: 'Layouts', component: Layouts },
  { name: 'WishList', component: WishList },
  { name: 'Categories', component: Categories },
  { name: 'VendorDetail', component: VendorDetail },
  { name: 'ScrollPicker', component: ScrollPicker },
  { name: 'CheckoutAuth', component: CheckoutAuth },
  { name: 'ProductDetail', component: ProductDetail },
  { name: 'CheckoutProfile', component: CheckoutProfile },
  { name: 'CheckoutShipping', component: CheckoutShipping },
  { name: 'CheckoutPayment', component: CheckoutPayment },
  { name: 'WriteReview', component: WriteReview },
  { name: 'WriteReviewNew', component: WriteReviewNew },
  { name: 'CheckoutComplete', component: CheckoutComplete },
  { name: 'Notification', component: Notification },
  { name: 'Discussion', component: Discussion },
  { name: 'SettlementsCompleteWebView', component: SettlementsCompleteWebView },
  { name: 'ProfileEdit', component: ProfileEdit },
  { name: 'Profile', component: Profile },
  { name: 'Orders', component: Orders },
  { name: 'OrderDetail', component: OrderDetail },
  { name: 'VendorManageOrders', component: VendorManageOrders },
  { name: 'VendorManageOrderDetail', component: VendorManageOrderDetail },
  { name: 'VendorManageProducts', component: VendorManageProducts },
  { name: 'VendorManageEditProduct', component: VendorManageEditProduct },
  { name: 'ImagePicker', component: ImagePicker },
  { name: 'LanguageSelection', component: LanguageSelection },
  { name: 'CurrencySelection', component: CurrencySelection },
  { name: 'AllProductReviews', component: AllProductReviews },
  //
  { name: 'QrScanner', component: QrScanner },
  { name: 'SaldiriContactUs', component: SaldiriContactUs },
  { name: 'CategoriesHub', component: CategoriesHub },
  { name: 'AllProducts', component: AllProducts },
  { name: 'CirclesLayouts', component: CirclesLayouts },
  { name: 'BrandsShowcase', component: BrandsShowcase },
  { name: 'BecomeSeller', component: BecomeSeller },
  {
    name: 'VendorManageAddProductStep1',
    component: VendorManageAddProductStep1,
  },
  {
    name: 'VendorManageCategoriesPicker',
    component: VendorManageCategoriesPicker,
  },
  {
    name: 'VendorManageAddProductStep2',
    component: VendorManageAddProductStep2,
  },
  {
    name: 'VendorManageAddProductStep3',
    component: VendorManageAddProductStep3,
  },
  {
    name: 'VendorManagePricingInventory',
    component: VendorManagePricingInventory,
  },
  {
    name: 'VendorManageFeatures',
    component: VendorManageFeatures,
  },
  {
    name: 'VendorManageShippingProperties',
    component: VendorManageShippingProperties,
  },
  {
    name: 'Dukaan',
    component: Dukaan,
  },
  {
    name: 'ViewOrders',
    component: ViewOrders,
  },
  {
    name: 'ViewProduct',
    component: ViewProduct,
  },
  {
    name: 'OrderInfo',
    component: OrderInfo,
  },

  {
    name: 'ProductInfo',
    component: ProductInfo,
  },

  {
    name: 'OrderStatus',
    component: OrderStatus,
  },
  {
    name: 'ProductStatus',
    component: ProductStatus,
  },
  {
    name: 'OrderSortBy',
    component: OrderSortBy,
  },
  {
    name: 'SortOrders',
    component: SortOrders,
  },
  {
    name: 'SortProducts',
    component: SortProducts,
  },
  {
    name: 'FilterOrder',
    component: FilterOrder,
  },
  {
    name: 'FilterOrders',
    component: FilterOrders,
  },
  {
    name: 'FilterProducts',
    component: FilterProducts,
  },
  {
    name: 'VendorAddProduct',
    component: VendorAddProduct,
  },
  {
    name: 'ProductType',
    component: ProductType,
  },
  {
    name: 'ProductTypeCategory',
    component: ProductTypeCategory,
  },
  {
    name: 'Review',
    component: Review,
  },

  {
    name: 'Card',
    component: Card,
  },
  {
    name: 'AddVariants',
    component: AddVariants,
  },
  {
    name: 'SizeVariants',
    component: SizeVariants,
  },
  {
    name: 'ColorVariants',
    component: ColorVariants,
  },
  {
    name: 'StyleVariants',
    component: StyleVariants,
  },
  {
    name: 'MaterialVariants',
    component: MaterialVariants,
  },
];

// register all screens of the app (including internal ones)
export default function registerScreens(store) {
  screenList.map((item) =>
    Navigation.registerComponentWithRedux(
      item.name,
      () => item.component,
      Provider,
      store,
    ),
  );
}
