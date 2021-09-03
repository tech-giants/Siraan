import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swipeout from 'react-native-swipeout';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import FastImage from 'react-native-fast-image'

// import CardView from 'react-native-cardview';

// Import actions.
import * as wishListActions from '../actions/wishListActions';
import * as cartActions from '../actions/cartActions';

// Components
import Icon from '../components/Icon';

// theme
import theme from '../config/theme';
import i18n from '../utils/i18n';
import * as nav from '../services/navigation';
import { formatPrice, getImagePath } from '../utils';
import { get } from 'lodash';

import { iconsMap } from '../utils/navIcons';
const windowWidth = Dimensions.get('window').width;
//  const productTaxedPrice = get(item, 'display_price_formatted.price', '');
//  const productPrice =
//     productTaxedPrice || get(item, 'price_formatted.price', '');
//   const showTaxedPrice = isPriceIncludesTax(item);
  
// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor:'#e3d1e4',
  },
  productItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    paddingBottom: 10,
    padding: 14,
    width: '100%',
    overflow: 'hidden',
  },
  btn: {
    width: '65%',
    backgroundColor: '#7c2981',
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    width: '100%',
    height: 30,
    fontWeight: 'bold',
    // marginTop: 5,
  },
  curvedbtn: {
    backgroundColor: '#7c2981',
    padding: 8,
    borderRadius: 10,
    height: 50,
    width: 140,
    marginLeft: 2,
  },
  curvedbtnText: {
    color: '#fff',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: 150,
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
    marginLeft: -10,
  },
  productItemImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productItemDetail: {
    marginLeft: 14,
    width: '70%',
  },
  productItemWrapper: {
    marginBottom: 15,
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyListContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 70,
  },
  emptyListIconWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emptyListIcon: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '6rem',
  },
  emptyListHeader: {
    fontSize: 18,
    color: '#999999',
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  emptyListDesc: {
    fontSize: '1rem',
    color: '#24282b',
    marginTop: '0.5rem',
  },
  headerLogo: {
    width: windowWidth,
    height: 250,
    resizeMode: 'contain',
  },
  fullView: {
    marginTop: 20,
    marginLeft: 17,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#A26EA6',
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // productItem: {
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: '#F1F1F1',
  //   flexDirection: 'row',
  //   // paddingBottom: 8,
  //   width: '95%',
  //   height: '105%',
  //   // overflow: 'hidden',
  //   alignSelf: 'center',
  //   marginTop: 20,
  //   borderRadius: 10,

  // },
  topview: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.3,
    borderColor: '#A26EA6',
    paddingVertical: 15,
    // width: 130,
    // height: 130,
    // resizeMode: 'cover',
    // // marginTop: 20,
    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius:20,
  },
  productItemDetail: {
    marginLeft: 40,
    marginRight: 14,
    width: '30%',
  },
  productItemName: {
    fontSize: 15,
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },

  textname: {
    // textAlign: 'center',
    // fontWeight: 'bold',
    // marginRight: 20,
    // marginTop: 40,
    // fontSize: 15,
    // marginLeft:10,
  },
  bottomview: {
    // flexDirection:'row',
    //   fontSize: '1.0rem',
    //   color: 'black',
    //  marginLeft:150,
    //   marginTop: -10,
    //   fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '90%',
    paddingVertical: 10,
  },
  name: {
    fontSize: '0.9rem',
    marginLeft: 20,
    width: 150,
  },
  Imagewishlist: {
    width: 60,
    height: 40,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
  },
  // image: {
  //   width: 180,
  //   height:180,
  // },
  incrementbtn: {
    fontSize: 10,
  },
});

/**
 * Renders wishlist screen.
 *
 * @reactProps {object} wishListActions - Wishlist actions.
 * @reactProps {object} wishList - Wishlist information.
 */
export class WishList extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    wishListActions: PropTypes.shape({
      fetch: PropTypes.func,
      remove: PropTypes.func,
      clear: PropTypes.func,
    }),
    wishList: PropTypes.shape({}),
    cart: PropTypes.object,
    auth: PropTypes.object,
    cartActions: PropTypes.shape({
      add: PropTypes.func,
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      refreshing: false,
      load_remove: false,
    };

    Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        this.topNavigationButtonPressed(buttonId);
      },
    );
  }

  /**
   * Gets wishlist. Sets header setup.
   */
  componentDidMount() {
    const { wishListActions } = this.props;

    wishListActions.fetch();
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: false,
        title: {
          text: i18n.t('Wish List').toUpperCase(),
        },
        rightButtons: [
          {
            id: 'clearWishList',
            icon: iconsMap.delete,
          },
        ],
      },
    });
  }

  /**
   * Listens to fetching. Refreshes icon badge value.
   */
  componentWillReceiveProps(nextProps) {
    const { wishList } = nextProps;
    if (wishList.fetching) {
      return;
    }

    this.setState({
      fetching: false,
      refreshing: false,
    });

    Navigation.mergeOptions(this.props.componentId, {
      bottomTab: {
        badge: wishList.items.length ? `${wishList.items.length}` : '',
      },
    });
  }

  /**
   * Wishlist screen navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  topNavigationButtonPressed(buttonId) {
    if (buttonId === 'clearWishList') {
      Alert.alert(
        i18n.t('Clear wish list?'),
        '',
        [
          {
            text: i18n.t('Cancel'),
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: i18n.t('Ok'),
            onPress: () => this.props.wishListActions.clear(),
          },
        ],
        { cancelable: true },
      );
    }
  }

  /**
   * Removes a product from whishlist.
   *
   * @param {object} product - Product information.
   */
  handleRemoveProduct = async (product) => {
    const { wishListActions } = this.props;
    this.setState({ load_remove: true });
    await wishListActions.remove(product.cartId);
    this.setState({ load_remove: false });
  };

  /**
   * Refreshes the display of the wishlist.
   */
  handleRefresh() {
    const { wishListActions } = this.props;
    this.setState({ refreshing: true }, () => wishListActions.fetch());
  }
  // add to cart function
  handleAddToCart(showNotification = true, product) {
    const productOptions = {};

    if (!this.props.auth.logged) {
      return nav.showLogin();
    }

    const currentProduct = product;
    product.selectedOptions = {};
    // Convert product options to the option_id: variant_id array.

    Object.keys(product.selectedOptions).forEach((k) => {
      productOptions[k] = product.selectedOptions[k];
      if (product.selectedOptions[k].variant_id) {
        productOptions[k] = product.selectedOptions[k].variant_id;
      }
    });

    const products = {
      [currentProduct.product_id]: {
        product_id: currentProduct.product_id,
        amount: 1,
        product_options: productOptions,
      },
    };

    return this.props.cartActions.add(
      { products },
      showNotification,
      this.props.cart.coupons,
    );
  }

  /**
   * Renders a product. Gets product image.
   * Sets swipeout button setup.
   *
   * @param {object} item - Product information.
   *
   * @return {JSX.Element}
   */
  renderProductItem = (item) => {
    let productImage = null;
    const imageUri = getImagePath(item);
    if (imageUri) {
      productImage = (
        <FastImage
          source={{ uri: imageUri }}
          style={styles.productItemImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
    }

    const swipeoutBtns = [
      {
        text: i18n.t('Delete'),
        type: 'delete',
        onPress: () => this.handleRemoveProduct(item),
      },
    ];

    return (
      <View style={styles.fullView}>
        <View style={styles.topview}>
          <View>
            <View>{productImage}</View>

            {/* <Image style={styles.Image}
          source={{uri: 'https://firebasestorage.googleapis.com/v0/b/siraan-68555.appspot.com/o/49735714502_f1b80c86ca_b.png?alt=media&token=bffbab85-4729-4573-ac44-3da8ed9567d4'}}
      /> */}
          </View>

          <View style={{ justifyContent: 'flex-start' }}>
            {/* <Text style={{fontSize:20,fontWeight:'bold',}}>$35.70</Text> */}
            {/* <Text style={styles.price}>
           $35.70
          </Text> */}
            <Text style={styles.productItemPrice}>
              {item.amount} x {formatPrice(item.price_formatted.price)}
            </Text>

            <View>
              <Text
                style={{ ...styles.name, ...styles.productItemName }}
                numberOfLines={1}>
                {item.product}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ ...styles.bottomview }}>
          <View>
            <Pressable
              onPress={() => this.handleRemoveProduct(item)}
              style={styles.curvedbtn}>
              <Text style={styles.curvedbtnText}>{i18n.t('Remove')}</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => this.handleAddToCart(true, item)}
              style={styles.curvedbtn}>
              <Text style={styles.curvedbtnText}>{i18n.t('Add To Cart')}</Text>
            </Pressable>
          </View>

          <View>
            {/* {!item.exclude_from_calculate && (
              <QtyOption
                max={max}
                min={min}
                initialValue={initialValue}
                step={step}
                onChange={(val) => {
                  if (
                    val <= parseInt(item.in_stock, 10) ||
                    item.out_of_stock_actions === 'B'
                    ) {
                    cartActions.changeAmount(item.cartId, val, item.company_id);
                    handleChangeAmountRequest(item, val);
                  }
                }}
                />
                )} */}
          </View>
        </View>
      </View>
    );
  };

  /**
   * Renders if the whislist is empty.
   *
   * @return {JSX.Element}
   */
  renderEmptyList = () => {
    if (this.state.fetching) {
      return null;
    }
    return (
      <View style={styles.emptyListContainer}>
        <View style={styles.emptyListIconWrapper}>
          {/* <Icon name="favorite" style={styles.emptyListIcon} />  */}
          <FastImage
            style={styles.headerLogo}
            source={require('../assets/icon_wishlist.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.emptyListHeader}>
          {i18n.t('Your Wish List is Empty!')}
        </Text>
        <View
          style={{
            fontSize: 'bold',
            fontSize: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => nav.selectTab('home')} style={styles.btn}>
            <Text style={styles.btnText}>{i18n.t('Continue Shopping')}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  /**
   * Renders list of products.
   *
   * @return {JSX.Element}
   */
  renderList() {
    const { wishList } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={wishList.items}
          keyExtractor={(item, index) => `wishlist_${index}`}
          renderItem={({ item }) => this.renderProductItem(item)}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
          ListEmptyComponent={() => this.renderEmptyList()}
        />
        {this.state.load_remove ? (
          <View
            style={{
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
      </View>
    );
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <>
        <SaldiriHeader midHeaderTitle="Wishlist" />
        <View style={styles.container}>{this.renderList()}</View>
      </>
    );
  }
}

export default connect(
  (state) => ({
    wishList: state.wishList,
    cart: state.cart,
    auth: state.auth,
  }),
  (dispatch) => ({
    wishListActions: bindActionCreators(wishListActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
  }),
)(WishList);