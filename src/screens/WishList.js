import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  Pressable,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swipeout from 'react-native-swipeout';

// Import actions.
import * as wishListActions from '../actions/wishListActions';

// Components
import Icon from '../components/Icon';

// theme
import theme from '../config/theme';
import i18n from '../utils/i18n';
import * as nav from '../services/navigation';
import { formatPrice, getImagePath } from '../utils';

import { iconsMap } from '../utils/navIcons';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  productItemImage: {
    width: 100,
    height: 100,
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
    textAlign: 'left',
  },
  emptyListContainer: {
    marginTop: '3rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyListIconWrapper: {
    backgroundColor: '#6d3075',
    width: '12rem',
    height: '12rem',
    borderRadius: '6rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListIcon: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '6rem',
  },
  emptyListHeader: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'black',
    marginTop: '1rem',
    paddingLeft: '0.25rem',
    paddingRight: '0.25rem',
    textAlign: 'center',
  },
  emptyListDesc: {
    fontSize: '1rem',
    color: '#24282b',
    marginTop: '0.5rem',
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
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      refreshing: false,
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
        title: {
          text:i18n.t('Wish List').toUpperCase(),
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
  handleRemoveProduct = (product) => {
    const { wishListActions } = this.props;
    wishListActions.remove(product.cartId);
  };

  /**
   * Refreshes the display of the wishlist.
   */
  handleRefresh() {
    const { wishListActions } = this.props;
    this.setState({ refreshing: true }, () => wishListActions.fetch());
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
        <Image source={{ uri: imageUri }} style={styles.productItemImage} />
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
      <View style={styles.productItemWrapper}>
        <Swipeout
          autoClose
          right={swipeoutBtns}
          backgroundColor={theme.$navBarBackgroundColor}>
          <Pressable
            style={styles.productItem}
            onPress={() =>
              nav.pushProductDetail(this.props.componentId, {
                pid: item.product_id,
                hideSearch: true,
                hideWishList: true,
              })
            }>
            {productImage}
            <View style={styles.productItemDetail}>
              <Text style={styles.productItemName} numberOfLines={1}>
                {item.product}
              </Text>
              <Text style={styles.productItemPrice}>
                {item.amount} x {formatPrice(item.price_formatted.price)}
              </Text>
            </View>
          </Pressable>
        </Swipeout>
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
          <Icon name="favorite" style={styles.emptyListIcon} />
        </View>
        <Text style={styles.emptyListHeader}>
          {i18n.t('Your Wish List is Empty.')}
        </Text>
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
      </View>
    );
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

export default connect(
  (state) => ({
    wishList: state.wishList,
  }),
  (dispatch) => ({
    wishListActions: bindActionCreators(wishListActions, dispatch),
  }),
)(WishList);
