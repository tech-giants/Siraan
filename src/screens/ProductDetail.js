import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';
import * as nav from '../services/navigation';
import { iconsMap } from '../utils/navIcons';
import { PRODUCT_NUM_COLUMNS } from '../utils';
import { toInteger, get } from 'lodash';
import i18n from '../utils/i18n';
import { isEmpty } from 'lodash';
import config from '../config';
import theme from '../config/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  formatPrice,
  isPriceIncludesTax,
  stripTags,
  formatDate,
} from '../utils';
import {
  VERSION_MVE,
  FEATURE_TYPE_DATE,
  FEATURE_TYPE_CHECKBOX,
} from '../constants';
import {
  View,
  ScrollView,
  Text,
  Pressable,
  Platform,
  Share,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import QtyOptionModal from '../components/SaldiriComponents/QtyOptionModal';

// Import actions.
import * as productsActions from '../actions/productsActions';
import * as wishListActions from '../actions/wishListActions';
import * as cartActions from '../actions/cartActions';
import * as vendorActions from '../actions/vendorActions';

// Components
import { ProductDetailOptions } from '../components/ProductDetailOptions';
import ProductImageSwiper from '../components/ProductImageSwiper';
import { AddToCartButton } from '../components/AddToCartButton';
import DiscussionList from '../components/DiscussionList';
import StarsRating from '../components/StarsRating';
import ReviewsBlock from '../components/ReviewsBlock';
import InAppPayment from '../components/InAppPayment';
import { QtyOption } from '../components/QtyOption';
import SectionRow from '../components/SectionRow';
import { Seller } from '../components/Seller';
import Section from '../components/Section';
import Spinner from '../components/Spinner';
import ProductListView from '../components/ProductListView';
// import { ActivityIndicator } from 'react-native-paper';

const RATING_STAR_SIZE = 14;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  descriptionBlock: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  nameText: {
    fontSize: '1.1rem',
    color: '$darkColor',
    marginBottom: 5,
    textAlign: 'left',
    // fontWeight:'bold',
  },
  starsRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCountText: {
    color: '#8F8F8F',
    marginLeft: 10,
  },
  priceText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '$darkColor',
    textAlign: 'left',
  },
  smallText: {
    fontSize: '0.8rem',
    fontWeight: 'normal',
    color: '$darkColor',
  },
  outOfStockText: {
    color: '$dangerColor',
    marginTop: 10,
    fontSize: '1rem',
    fontWeight: '500',
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listPriceText: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
    color: '$darkColor',
    textAlign: 'left',
    marginLeft: 10,
  },
  listPriceWrapperText: {
    textAlign: 'left',
  },
  promoText: {
    marginBottom: 10,
  },
  descText: {
    color: '$discussionMessageColor',
    textAlign: 'justify',
  },
  addToCartContainerWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderTopWidth: 0.8,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    marginTop: 5,
  },
  addToCartContainer: {
    padding: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperStyle: {
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
  },
  sectionBtn: {
    paddingTop: 12,
    paddingBottom: 6,
  },
  sectionBtnText: {
    color: '$primaryColor',
    textAlign: 'center',
    marginLeft: 115,
    fontSize: 17,
    maxWidth: 100,
    fontWeight: 'bold',
  },
  vendorWrapper: {
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 10,
  },
  vendorName: {
    fontSize: '0.9rem',
    textAlign: 'left',
    marginRight: 100,
  },
  vendorProductCount: {
    fontSize: '0.7rem',
    color: 'gray',
    marginBottom: 13,
    textAlign: 'left',
  },
  vendorDescription: {
    color: 'gray',
    textAlign: 'left',
  },
  rating: {
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 5,
  },
  keyboardAvoidingContainer: {
    marginBottom: Platform.OS === 'ios' ? 122 : 132,
  },
  listDiscountWrapper: {
    backgroundColor: '$productDiscountColor',
    position: 'absolute',
    top: 4,
    right: 4,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 2,
  },
  listDiscountText: {
    color: '#fff',
  },
  inAppPaymentWrapper: {
    flex: 2,
    marginRight: 10,
  },
  zeroPrice: {
    paddingTop: 10,
  },
  QtyOptionBtn: {
    maxHeight: 35,
    maxWidth: 90,

    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#8D6F18',
    marginBottom: 10,
    backgroundColor: '#E8E2D0',
  },
  dignalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    width: '70%',
  },
  dignalButton: {
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '54%',
    height: 50,
  },
  dignalButtonText: {
    textAlign: 'center',
    color: '$primaryColorText',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    position: 'absolute',
    left: 'auto',
    right: 'auto',
  },
  iconButton: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: {
    textAlign: 'center',
    color: '#7c2981',
    fontSize: 12,
    fontWeight: 'bold',
    width: '100%',
  },
  verticalDivider: {
    height: '60%',
    borderLeftWidth: 0.8,
    borderColor: '#d1d1d1',
  },
  flatlistSectionHeading: {
    // backgroundColor: 'red',
    width: '100%',
    paddingVertical: 5,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
});

/**
 * Renders product detail screen.
 *
 * @param {number} pid - Product id.
 * @param {object} productsActions - Products actions.
 * @param {object} wishListActions - Wishlist actions.
 * @param {object} vendorActions - Vendor actions.
 * @param {object} cartActions - Cart actions.
 * @param {object} discussion - Discussion store data.
 * @param {string} componentId - Component id.
 * @param {object} auth - Auth store data.
 * @param {boolean} hideWishList - Hide wishlist or not flag.
 * @param {object} wishList - Wishlist store data.
 *
 * @return {JSX.Element}
 */
export const ProductDetail = ({
  pid,
  productsActions,
  wishListActions,
  vendorActions,
  cartActions,
  discussion,
  componentId,
  auth,
  hideWishList,
  wishList,
  cart,
  settings,
  products,
  peopleAlsoViews,
  orders,
}) => {
  const [product, setProduct] = useState(null);
  const [fromThisStore, setFromThisStore] = useState([]);
  const [renderFromThisStoreData, setRenderFromThisStoreData] = useState([]);
  const [peopleAlsoView, setPeopleAlsoView] = useState([]);
  const [renderPeopleAlsoViewData, setRenderPeopleAlsoViewData] = useState([]);
  const [writeReviewCond, setWriteReviewCond] = useState(false);
  const [product_first, setProduct_first] = useState(true);
  const [second_indicate, setsecond_inddicator] = useState(false);
  var product_first_ = true;
  const [amount, setAmount] = useState(1);
  const [vendor, setVendor] = useState(null);
  const [modalVisible, setmodalVisible] = useState(false);
  const [productInWishList, setProductInWishList] = useState(false);
  const [wishListProduct, setWishListProduct] = useState({});
  const listener = {
    navigationButtonPressed: ({ buttonId }) => {
      if (buttonId === 'wishlist') {
        handleAddToWishList();
      }

      if (buttonId === 'share') {
        handleShare();
      }
    },
  };

  const fetchData = async (currentPid) => {
    const currentProduct = await productsActions.fetch(currentPid);
    const currentVendor = await vendorActions.fetch(currentProduct.company_id);
    const step = parseInt(currentProduct.qty_step, 10) || 1;
    setAmount(step);
    setVendor(currentVendor);
    setProduct(currentProduct);
    setsecond_inddicator(false);
    checkWishList();
  };
  useEffect(() => {
    setWriteReviewCond(false);
    fetchData(pid);
  }, []);
  useEffect(() => {
    console.log('orders products =============>> ', orders);
    var flag = true;
    // console.log
    var keys = Object.keys(orders.productsID);
    console.log('Keyyyss===> ', keys);

    for (var i = 0; i < keys.length; i++) {
      var order = orders.productsID[keys[i]];
      if (order) {
        for (var j = 0; j < order.length; j++) {
          if (order[j].product_id == pid) {
            if (orders.items[i].status == 'C') {
              setWriteReviewCond(true);
              break;
            } else {
              break;
            }
          }
        }
      }

      // console.log("keys============>data>>>>>>>.. ",orders.productsID[keys[i]]);
    }
    // if (Object.keys(orders.productsID).length > 0) {
    //   Object.values(orders.productsID).map((item) => {
    //     if (item) {
    //       if (item.length > 0) {
    //         // setWriteReviewCond(false);

    //         for (var i = 0; i < item.length; i++) {
    //           console.log(
    //             'item===================>> ',
    //             item,
    //             item[i].product_id === pid,
    //           );
    //           if (item[i].product_id === pid) {
    //             setWriteReviewCond(true);
    //             break;
    //           }
    //          }
    //       }
    //     } else {
    //       setWriteReviewCond(false);
    //     }
    //   });
    // } else {
    //   setWriteReviewCond(false);
    // }
    return;
  }, []);
  console.log('write wrivew condition========>', writeReviewCond);
  // useEffect(() => {
  //   // orders.items.map((item) => {
  //   //   if (item.product_id == pid) {
  //   //     console.log('this item is ordered =========')
  //   //   } else {
  //   //     console.log('this item is nottttttttt ordered =========')

  //   //   }
  //   // });
  // }, [wishList || wishList.items || wishList.fetching]);

  useEffect(() => {
    var flag = false;
    wishList.items.map((item) => {
      if (item.product_id == pid) {
        flag = true;
        setProductInWishList(true);
        setWishListProduct(item);
      }
      //  item.product_id == pid
      //    ? setProductInWishList(true)
      //   : setProductInWishList(false)
    });
    if (flag == false) {
      setProductInWishList(false);
    }
  }, [wishList || wishList.items || wishList.fetching]);

  useEffect(() => {
    if (product) {
      const setTopBarOptions = (product) => {
        const topBar = {
          title: {
            text: product.product,
          },
        };

        topBar.rightButtons = [
          {
            id: 'share',
            icon: iconsMap.share,
          },
        ];

        if (!hideWishList && !product.isProductOffer) {
          const wishListActive = wishList.items.some(
            (item) => parseInt(item.product_id, 10) === product.product_id,
          );
          // topBar.rightButtons.push({
          //   id: 'wishlist',
          //   icon: iconsMap.favorite,
          //   color: wishListActive
          //     ? theme.$primaryColor
          //     : theme.$navBarButtonColor,
          // });
        }

        Navigation.mergeOptions(componentId, {
          topBar,
        });
      };

      setTopBarOptions(product);
    }

    const listeners = Navigation.events().registerComponentListener(
      listener,
      componentId,
    );

    return () => {
      listeners.remove();
    };
  }, [componentId, listener, product, hideWishList, wishList]);

  /**
   * Changes variations.
   *
   * @param {string} variantId - Variation id.
   * @param {string} variantOption - Selected variatoin data.
   */
  const changeVariationHandler = async (variantId, variantOption) => {
    const selectedVariationPid = variantOption.product_id;
    const currnetVariationPid = product.selectedVariants[variantId].product_id;

    if (currnetVariationPid === selectedVariationPid) {
      return null;
    }
    setsecond_inddicator(true);
    fetchData(selectedVariationPid);
    // setsecond_inddicator(false)
  };

  /**
   * Changes options.
   *
   * @param {string} optionId - Option id.
   * @param {string} selectedOptionValue - Selected option data.
   */
  const changeOptionHandler = async (optionId, selectedOptionValue) => {
    const newOptions = { ...product.selectedOptions };
    newOptions[optionId] = selectedOptionValue;
    setsecond_inddicator(true);
    const recalculatedProduct = await productsActions.recalculatePrice(
      product.product_id,
      newOptions,
    );

    setProduct({ ...recalculatedProduct });
    setsecond_inddicator(false);
  };

  /**
   * Renders variations and options block.
   *
   * @return {JSX.Element}
   */
  const renderVariationsAndOptions = () => {
    if (isEmpty(product.selectedOptions) && isEmpty(product.selectedVariants)) {
      return null;
    }

    return (
      <Section
        location="productDetail"
        title={i18n.t('Select')}
        wrapperStyle={styles.wrapperStyle}
        topDivider>
        <ProductDetailOptions
          options={product.convertedVariants}
          selectedOptions={product.selectedVariants}
          changeOptionHandler={changeVariationHandler}
        />
        <ProductDetailOptions
          options={product.convertedOptions}
          selectedOptions={product.selectedOptions}
          changeOptionHandler={changeOptionHandler}
        />
      </Section>
    );
  };

  /**
   * Renders discount label.
   *
   * @return {JSX.Element}
   */
  const renderDiscountLabel = () => {
    if (!product.list_discount_prc && !product.discount_prc) {
      return null;
    }

    const discount = product.list_discount_prc || product.discount_prc;

    return (
      <View style={styles.listDiscountWrapper}>
        <Text style={styles.listDiscountText}>
          {`${i18n.t('Discount')} ${discount}%`}
        </Text>
      </View>
    );
  };

  /**
   * Renders main images of the product.
   *
   * @return {JSX.Element}
   */
  const renderImage = () => {
    return (
      <View>
        <ProductImageSwiper>{product.images}</ProductImageSwiper>
        {renderDiscountLabel()}
      </View>
    );
  };

  /**
   * Renders a name of the product.
   *
   * @return {JSX.Element}
   */
  const renderName = () => {
    return <Text style={styles.nameText}>{product.product}</Text>;
  };

  /**
   * Renders rating.
   *
   * @return {JSX.Element}
   */
  const renderRating = () => {
    let ratingValue;
    let reviewCount;

    if (settings.productReviewsAddon?.isEnabled) {
      ratingValue = product.average_rating;
      reviewCount = product.product_reviews_count;
    } else {
      const activeDiscussion = discussion.items[`p_${product.product_id}`];
      ratingValue = activeDiscussion?.average_rating;
      reviewCount = activeDiscussion?.posts.length;
    }

    if (!ratingValue) {
      return null;
    }

    return (
      <View style={styles.starsRatingWrapper}>
        <StarsRating
          size={RATING_STAR_SIZE}
          value={Number(ratingValue)}
          isRatingSelectionDisabled
        />
        <Text style={styles.ratingCountText}>
          {reviewCount} {i18n.t('reviews')}
        </Text>
      </View>
    );
  };

  /**
   * Renders price.
   *
   * @return {JSX.Element}
   */
  const renderPrice = () => {
    let discountPrice = null;
    let showDiscount = false;

    if (product.list_discount_prc && product.discount_prc) {
      discountPrice = product.base_price_formatted.price;
      showDiscount = true;
    } else if (
      toInteger(product.list_price) &&
      toInteger(product.list_price) !== toInteger(product.base_price)
    ) {
      discountPrice = product.list_price_formatted.price;
      showDiscount = true;
    }

    const inStock = !Number(product.amount);
    const isProductPriceZero = Math.ceil(product.price) !== 0;
    const productTaxedPrice = get(product, 'taxed_price_formatted.price', '');
    const productPrice =
      productTaxedPrice || get(product, 'price_formatted.price', '');
    const showTaxedPrice = isPriceIncludesTax(product);

    // if (inStock) {
    //   return (
    //     <Text style={styles.outOfStockText}>{i18n.t('Out of stock')}</Text>
    //   );
    // }

    return (
      <View
      // style={styles.priceWrapper}
      >
        {isProductPriceZero ? (
          <>
            <Text style={styles.priceText}>
              {formatPrice(productPrice)}
              {showTaxedPrice && (
                <Text style={styles.smallText}>
                  {` (${i18n.t('Including tax')})`}
                </Text>
              )}
            </Text>
          </>
        ) : (
          <Text style={styles.zeroPrice}>
            {i18n.t('Contact us for a price')}
          </Text>
        )}
        {showDiscount && isProductPriceZero && (
          <Text style={styles.listPriceText}>{formatPrice(discountPrice)}</Text>
        )}
      </View>
    );
  };

  /**
   * Renders description block.
   *
   * @return {JSX.Element}
   */
  const renderDesc = () => {
    if (!product.full_description) {
      return null;
    }

    return (
      <Section
        location="productDetail"
        title={i18n.t('Description')}
        wrapperStyle={styles.wrapperStyle}
        topDivider>
        <Text style={styles.descText}>
          {stripTags(product.full_description).trim()}
        </Text>
      </Section>
    );
  };

  /**
   * Renders quantity switcher.
   *
   * @return {JSX.Element}
   */
  const renderQuantitySwitcher = () => {
    const step = parseInt(product.qty_step, 10) || 1;
    const max = parseInt(product.max_qty, 10) || parseInt(product.amount, 10);
    const min = parseInt(product.min_qty, 10) || step;
    if (product.isProductOffer) {
      return null;
    }
    return (
      <>
        {max > 0 ? (
          <Text style={{ marginLeft: 5, fontSize: 10, color: 'green' }}>
            In Stock {max}
          </Text>
        ) : (
          <Text style={{ marginLeft: 5, fontSize: 10, color: 'red' }}>
            Out of Stock
          </Text>
        )}
        <Pressable
          disabled={max > 0 ? false : true}
          style={{
            ...styles.addToCartContainerWrapper,
            ...styles.QtyOptionBtn,
          }}
          onPress={() => setmodalVisible(!modalVisible)}>
          <Text>Qty: {max > 0 ? amount : 0} </Text>
          {modalVisible ? (
            <MaterialIcons name="keyboard-arrow-up" size={20} color="#7c2981" />
          ) : (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color="#7c2981"
            />
          )}
        </Pressable>
        <QtyOptionModal
          setAmount={setAmount}
          hideModal={() => setmodalVisible(!modalVisible)}
          max={max}
          min={min}
          modalVisible={modalVisible}
        />
        {/* <QtyOption
        max={max}
        min={min}
        initialValue={amount || min}
        step={step}
        onChange={(val) => {
          setAmount(val);
        }}
      /> */}
      </>
    );
  };

  const renderNewDiscussion = () => {
    const title = i18n.t('Reviews');

    return (
      <Section
        location="productDetail"
        title={title}
        topDivider
        wrapperStyle={styles.wrapperStyle}
        showRightButton={true}
        rightButtonText={i18n.t('Write a Review')}
        onRightButtonPress={() => {
          if (!auth.logged) {
            return nav.showLogin();
          }
          if (!writeReviewCond) {
            return console.log(
              'review when order delivereddddddddddddddddddddd neewwww',
            );
          } else {
            nav.showModalWriteReviewNew({
              discussionType: 'P',
              productId: product.product_id,
              fetchData,
            });
          }
        }}>
        <ReviewsBlock
          componentId={componentId}
          productId={product.product_id}
          productReviews={product.product_reviews}
          fetchData={fetchData}
        />
      </Section>
    );
  };

  const renderOldDiscussion = () => {
    let activeDiscussion = discussion.items[`p_${product.product_id}`];
    const masMore = activeDiscussion.search.total_items > 2;
    const title = i18n.t('Reviews');

    return (
      <Section
        location="productDetail"
        title={title}
        topDivider
        wrapperStyle={styles.wrapperStyle}
        showRightButton={true}
        rightButtonText={i18n.t('Write a Review')}
        onRightButtonPress={() => {
          if (!auth.logged) {
            return nav.showLogin();
          }
          if (!writeReviewCond) {
            return console.log(
              'review when order delivereddddddddddddddddddddd oldddd',
            );
          } else {
            nav.pushWriteReview(componentId, {
              activeDiscussion,
              discussionType: 'P',
              discussionId: product.product_id,
            });
          }
        }}>
        <DiscussionList
          items={activeDiscussion.posts.slice(0, 2)}
          type={activeDiscussion.type}
        />
        {masMore && (
          <Pressable
            style={styles.sectionBtn}
            onPress={() => {
              nav.showDiscussion({
                componentId,
                productId: product.product_id,
              });
            }}>
            <Text style={styles.sectionBtnText}>{i18n.t('View All')}</Text>
          </Pressable>
        )}
      </Section>
    );
  };
  /**
   * Renders descussion block.
   *
   * @return {JSX.Element}
   */
  const renderDiscussion = () => {
    if (product.rating && !settings.productReviewsAddon?.isEnabled) {
      return renderOldDiscussion();
    }
    if (settings.productReviewsAddon?.isEnabled) {
      return renderNewDiscussion();
    }
    return null;
  };

  /**
   * Share function.
   */
  const handleShare = () => {
    const url = `${config.siteUrl}index.php?dispatch=products.view&product_id=${product.product_id}`;
    Share.share(
      {
        message: url,
        title: product.product,
        url,
      },
      {
        dialogTitle: product.product,
        tintColor: 'black',
      },
    );
  };

  /**
   * Add to whishlist function.
   */
  const handleAddToWishList = async (productOffer) => {
    const productOptions = {};

    const currentProduct = productOffer || product;

    if (!auth.logged) {
      return nav.showLogin();
    }

    if (
      typeof currentProduct.selectedOptions === 'object' &&
      currentProduct.selectedOptions !== null
    ) {
      // Convert product options to the option_id: variant_id array.
      Object.keys(currentProduct.selectedOptions).forEach((k) => {
        productOptions[k] = currentProduct.selectedOptions[k];
        if (currentProduct.selectedOptions[k].variant_id) {
          productOptions[k] = currentProduct.selectedOptions[k].variant_id;
        }
      });
    }

    const products = {
      [currentProduct.product_id]: {
        product_id: currentProduct.product_id,
        amount: currentProduct.selectedAmount || 1,
        product_options: productOptions,
      },
    };
    setsecond_inddicator(true);
    const a = await wishListActions.add({ products }, componentId);
    setsecond_inddicator(false);
  };

  /**
   * Renders features block.
   *
   * @return {JSX.Element}
   */
  const renderFeatures = () => {
    const renderFeatureItem = (feature, index, last) => {
      const { description, feature_type, value_int, value, variant } = feature;

      let newValue = null;
      switch (feature_type) {
        case FEATURE_TYPE_DATE:
          newValue = formatDate(value_int * 1000);
          break;
        case FEATURE_TYPE_CHECKBOX:
          newValue = feature.value === 'Y' ? i18n.t('Yes') : i18n.t('No');
          break;
        default:
          newValue = value || variant;
      }

      return (
        <SectionRow
          name={description}
          value={newValue}
          last={last}
          key={index}
        />
      );
    };

    const features = Object.keys(product.product_features).map(
      (k) => product.product_features[k],
    );

    if (!features.length) {
      return null;
    }

    const lastElement = features.length - 1;

    return (
      <Section
        location="productDetail"
        title={i18n.t('Features')}
        wrapperStyle={styles.wrapperStyle}
        topDivider>
        {features.map((item, index) =>
          renderFeatureItem(item, index, index === lastElement),
        )}
      </Section>
    );
  };

  /**
   * Renders vendor information.
   *
   * @return {JSX.Element}
   */
  const renderVendorInfo = () => {
    if (config.version !== VERSION_MVE || !vendor || product.isProductOffer) {
      return null;
    }

    return (
      <Section
        location="productDetail"
        title={i18n.t('Vendor')}
        wrapperStyle={styles.wrapperStyle}
        topDivider
        showRightButton={true}
        rightButtonText={i18n.t('Details')}
        onRightButtonPress={() => {
          nav.showModalVendorDetail({
            vendorId: vendor.company_id,
          });
        }}>
        <View style={styles.vendorWrapper}>
          <Text style={styles.vendorName}>{vendor.company}</Text>
          <Text style={styles.vendorProductCount}>
            {i18n.t('{{count}} item(s)', { count: vendor.products_count })}
          </Text>
          <Text style={styles.vendorDescription}>
            {stripTags(vendor.description)}
          </Text>
        </View>

        {renderFromThisStore()}
        {/* <Pressable
          style={styles.sectionBtn}
          onPress={() => {
            nav.showModalVendor({
              companyId: vendor.company_id,
            });
          }}>
          <Text style={styles.sectionBtnText}>{i18n.t('Visit Store')}</Text>
        </Pressable> */}
      </Section>
    );
  };
  /**
   * Renders sellers if common products for vendor is turn on.
   *
   * @return {JSX.Element}
   */
  const renderSellers = () => {
    if (!product.isProductOffer) {
      return null;
    }
    //
    return (
      <Section
        location="productDetail"
        title={i18n.t('Sellers')}
        wrapperStyle={styles.wrapperStyle}
        topDivider>
        {product.productOffers.products.map((el, index) => {
          return (
            <Seller
              productOffer={el}
              handleAddToWishList={() => handleAddToWishList(el)}
              isLastVendor={product.productOffers.products.length - 1 === index}
              key={index}
              onPress={() => handleAddToCart(true, el)}
            />
          );
        })}
      </Section>
    );
  };

  /**
   * render people also view block
   *
   */

  useEffect(() => {
    if (product) {
      if (peopleAlsoView.length == 0) {
        vendorActions.peopleAlsoView(pid, pid, product.category_ids);
      }
    }
  }, [product]);
  useEffect(() => {
    if (product && !peopleAlsoViews.fetching) {
      setPeopleAlsoView(peopleAlsoViews.products);
    }
  }, [peopleAlsoViews]);

  useEffect(() => {
    if (peopleAlsoView.length > 0) {
      setRenderPeopleAlsoViewData(peopleAlsoView.slice(0, 6));
    }
  }, [peopleAlsoView]);

  const renderPeopleAlsoView = () => {
    if (peopleAlsoViews.fetching) {
      return (
        <ActivityIndicator size={30} style={styles.indicator} color="#7c2981" />
      );
    } else if (!peopleAlsoViews.fetching && peopleAlsoView.length > 0) {
      return (
        <>
          <Section
            location="productDetail"
            title={i18n.t('People Also Viewed')}
            wrapperStyle={styles.wrapperStyle}
            topDivider>
            <Text
              style={{
                ...styles.flatlistSectionHeading,
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#7c2981',
              }}>
              people who viewed this item also viewed :
            </Text>

            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={renderPeopleAlsoViewData}
                removeClippedSubviews
                keyExtractor={(item, index) => `fromThisStore${index}`}
                key={(item, index) => index}
                initialNumToRender={10}
                // ListHeaderComponent={() => this.renderHeader()}
                numColumns={2}
                renderItem={(item, index) => (
                  <ProductListView
                    key={index}
                    // styledView={true}
                    // location="Categories"
                    // viewStyle={this.state.gridView ? 'grid' : 'list'}
                    product={item}
                    onPress={(product) =>
                      nav.pushProductDetail(componentId, {
                        pid: product.product_id,
                      })
                    }
                  />
                )}
                // onEndReached={() => this.handleLoadMore()}
              />
              {peopleAlsoView.length > 6 ? (
                <Pressable
                  onPress={() =>
                    setRenderPeopleAlsoViewData(
                      renderPeopleAlsoViewData.length < 7
                        ? peopleAlsoView
                        : peopleAlsoView.slice(0, 6),
                    )
                  }>
                  <Text
                    style={{
                      ...styles.flatlistSectionHeading,
                      fontSize: 15,
                      textAlign: 'right',
                      paddingHorizontal: 10,
                    }}>
                    {renderPeopleAlsoViewData.length < 7
                      ? 'show more'
                      : 'show less'}
                  </Text>
                </Pressable>
              ) : null}
            </>
          </Section>
        </>
      );
    }
    return null;
  };

  /**
   * Add to cart function.
   *
   * @param {boolean} showNotification - Show notification or not.
   * @param {object} productOffer - Selected product offer data.
   */
  // const handleAddToCart = async (showNotification = true, productOffer) => {
  //   const productOptions = {};
  //   if (!auth.logged) {
  //     return nav.showLogin();
  //   }
  //   const currentProduct = productOffer || product;

  //   Object.keys(product.selectedOptions).forEach((k) => {
  //     productOptions[k] = product.selectedOptions[k];
  //     if (product.selectedOptions[k].variant_id) {
  //       productOptions[k] = product.selectedOptions[k].variant_id;
  //     }
  //   });

  //   const products = {
  //     [currentProduct.product_id]: {
  //       product_id: currentProduct.product_id,
  //       amount,
  //       product_options: productOptions,
  //     },
  //   };
  //   setsecond_inddicator(true);
  //   const a = await cartActions.add(
  //     { products },
  //     showNotification,
  //     cart.coupons,
  //   );
  //   setsecond_inddicator(false);
  // };
  const handleAddToCart = async (
    move = false,
    showNotification = true,
    productOffer,
  ) => {
    const productOptions = {};

    if (!auth.logged) {
      return nav.showLogin();
    }

    const currentProduct = productOffer || product;

    Object.keys(product.selectedOptions).forEach((k) => {
      productOptions[k] = product.selectedOptions[k];
      if (product.selectedOptions[k].variant_id) {
        productOptions[k] = product.selectedOptions[k].variant_id;
      }
    });

    const products = {
      [currentProduct.product_id]: {
        product_id: currentProduct.product_id,
        amount,
        product_options: productOptions,
      },
    };
    setsecond_inddicator(true);
    const a = await cartActions.add(
      { products },
      showNotification,
      cart.coupons,
    );
    setsecond_inddicator(false);
    if (move) {
      nav.showCart(cart);
    }
  };
  /**
   * Renders from same store block.
   *
   * @return {JSX.Element}
   */
  const fetchThisStoreProducts = () => {
    if (product) {
      vendorActions.fromThisStore(vendor.company_id, pid);
    }
  };
  useEffect(() => {
    if (fromThisStore.length == 0) {
      fetchThisStoreProducts();
    }
  }, [product]);

  useEffect(() => {
    if (product && !products.fetching) {
      setFromThisStore(products.items[vendor.company_id]);
    }
  }, [products]);

  useEffect(() => {
    if (fromThisStore.length > 0) {
      setRenderFromThisStoreData(fromThisStore.slice(0, 6));
    }
  }, [fromThisStore]);

  const renderFromThisStore = () => {
    // console.log('form this store data ===>>>', fromThisStore);
    if (products.fetching) {
      return (
        <ActivityIndicator
          // size="large"
          size={30}
          style={styles.indicator}
          color="#7c2981"
        />
      );
    } else if (!products.fetching && fromThisStore.length > 0) {
      return (
        <>
          <Text
            style={{
              ...styles.flatlistSectionHeading,
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#7c2981',
            }}>
            From the same Store
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={renderFromThisStoreData}
            removeClippedSubviews
            keyExtractor={(item, index) => `fromThisStore${index}`}
            key={(item, index) => index}
            initialNumToRender={10}
            // ListHeaderComponent={() => this.renderHeader()}
            numColumns={2}
            renderItem={(item, index) => (
              <ProductListView
                key={index}
                // styledView={true}
                // location="Categories"
                // viewStyle={this.state.gridView ? 'grid' : 'list'}
                product={item}
                onPress={(product) =>
                  nav.pushProductDetail(componentId, {
                    pid: product.product_id,
                  })
                }
              />
            )}
            // onEndReached={() => this.handleLoadMore()}
          />
          {fromThisStore.length > 6 ? (
            <Pressable
              onPress={() =>
                setRenderFromThisStoreData(
                  renderFromThisStoreData.length < 7
                    ? fromThisStore
                    : fromThisStore.slice(0, 6),
                )
              }>
              <Text
                style={{
                  ...styles.flatlistSectionHeading,
                  fontSize: 15,
                  textAlign: 'right',
                  paddingHorizontal: 10,
                }}>
                {renderFromThisStoreData.length < 7 ? 'show more' : 'show less'}
              </Text>
            </Pressable>
          ) : null}
        </>
      );
    }
    return null;
  };

  /**
   * Renders add to cart block.
   *
   * @return {JSX.Element}
   */

  // const checkWishList = () => {
  //   wishList.items.map((item) => {
  //     item.product_id == pid
  //       ? (setProductInWishList(true),
  //         console.log('setProductInWishList==>', productInWishList))
  //       : (setProductInWishList(false),
  //         console.log('setProductInWishList==>', productInWishList));
  //   });
  // };

  const renderAddToCart = () => {
    const canPayWithApplePay = Platform.OS === 'ios' && config.applePay;

    if (product.isProductOffer) {
      return null;
    }

    return (
      <View style={styles.addToCartContainerWrapper}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            nav.showModalVendor({
              companyId: vendor.company_id,
            });
          }}>
          <MaterialCommunityIcons
            name="storefront-outline"
            size={25}
            color="#7c2981"
          />

          <Text style={styles.iconButtonText}>Store</Text>
        </Pressable>
        <View style={styles.verticalDivider} />
        {!wishList.fetching ? (
          <Pressable
            style={styles.iconButton}
            onPress={() => {
              productInWishList
                ? wishListActions.remove(wishListProduct.cartId)
                : handleAddToWishList();
            }}>
            {productInWishList ? (
              <MaterialIcons name="favorite" size={25} color="#7c2981" />
            ) : (
              <MaterialIcons name="favorite-border" size={25} color="#7c2981" />
            )}

            <Text style={styles.iconButtonText}>Wish</Text>
          </Pressable>
        ) : (
          <View style={styles.iconButton}>
            <ActivityIndicator
              // size="large"
              size={15}
              color="#7c2981"
            />
          </View>
        )}
        <View style={styles.dignalButtonWrapper}>
          <Pressable
            onPress={() => handleAddToCart(true, false)}
            style={{
              ...styles.dignalButton,
              borderBottomColor: '#a26ea6',
              marginRight: -25,
            }}>
            <Text style={styles.dignalButtonText}>Buy Now</Text>
          </Pressable>
          {/*  */}
          <Pressable
            onPress={() => handleAddToCart()}
            style={{ ...styles.dignalButton, borderBottomColor: '#7c2981' }}>
            <Text style={styles.dignalButtonText}>Add to cart</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (!product) {
    return <Spinner visible={true} />;
  }
  // console.log('whish list data =======>>>', pid, wishList);
  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderImage()}
          <View style={styles.descriptionBlock}>
            {renderPrice()}
            {renderName()}
            {renderRating()}
          </View>
          {renderQuantitySwitcher()}
          {renderVariationsAndOptions()}
          {renderSellers()}
          {renderDesc()}
          {renderFeatures()}
          {renderDiscussion()}
          {renderVendorInfo()}
          {renderPeopleAlsoView()}
        </ScrollView>
      </View>
      {renderAddToCart()}

      {second_indicate ? (
        <View
          style={{
            display: 'none',
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(25, 22, 26, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            // size="large"
            size={45}
            style={styles.indicator}
            color="#7c2981"
          />
        </View>
      ) : null}
    </>
  );
};

export default connect(
  (state) => ({
    settings: state.settings,
    discussion: state.discussion,
    auth: state.auth,
    cart: state.cart,
    wishList: state.wishList,
    products: state.products,
    peopleAlsoViews: state.peopleAlsoView,
    orders: state.orders,
  }),
  (dispatch) => ({
    cartActions: bindActionCreators(cartActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
    wishListActions: bindActionCreators(wishListActions, dispatch),
    vendorActions: bindActionCreators(vendorActions, dispatch),
  }),
)(ProductDetail);
