import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Platform,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PRODUCT_NUM_COLUMNS } from '../utils';

// Import actions.
import * as vendorActions from '../actions/vendorActions';
import * as productsActions from '../actions/productsActions';

// Components
import Spinner from '../components/Spinner';
import VendorInfo from '../components/VendorInfo';
import CategoryBlock from '../components/CategoryBlock';
import ProductListView from '../components/ProductListView';
import SortProducts from '../components/SortProducts';
import { iconsMap } from '../utils/navIcons';
import * as nav from '../services/navigation';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Renders product detail screen.
 *
 * @reactProps {object} vendors - Vendors information from store.
 * @reactProps {object} vendorCategories - Vendor product categories.
 * @reactProps {object} products - Vendor products.
 * @reactProps {object} vendorActions - Vendor actions.
 * @reactProps {object} productsActions - Products actions.
 * @reactProps {string or number} companyId - Vendor company id.
 */
export class Vendor extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    vendors: PropTypes.shape({}),
    vendorCategories: PropTypes.shape({}),
    products: PropTypes.shape({}),
    vendorActions: PropTypes.shape({
      categories: PropTypes.func,
      products: PropTypes.func,
      fetch: PropTypes.func,
    }),
    productsActions: PropTypes.shape({
      fetchDiscussion: PropTypes.func,
    }),
    companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    this.isFirstLoad = true;

    this.state = {
      gridView: true,
      filters: '',
      products: [],
      refreshing: false,
      gridView: true,
      isLoadMoreRequest: false,
      vendor: {
        logo_url: null,
      },
      discussion: {
        search: {
          page: 1,
        },
      },
    };
    Navigation.events().bindComponent(this);
  }

  /**
   * Gets vendor product categories.
   * Checks vendor state doesn`t empty else gets it.
   * Sets header setup.
   */
  componentWillMount() {
    const { vendors, companyId, vendorActions, productsActions } = this.props;

    vendorActions.categories(companyId);
    this.handleLoad();

    if (!vendors.items[companyId] && !vendors.fetching) {
      vendorActions.fetch(companyId);
    } else {
      this.setState(
        {
          vendor: vendors.items[companyId],
        },
        () => {
          productsActions.fetchDiscussion(
            this.state.vendor.company_id,
            { page: this.state.discussion.search.page },
            'M',
          );
        },
      );
    }

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });
  }

  /**
   * If more products are received, sets them in the state.
   */
  componentWillReceiveProps(nextProps) {
    const { products, vendors, companyId } = nextProps;
    const vendorProducts = products.items[companyId];
    if (vendorProducts) {
      this.setState(
        {
          products: vendorProducts,
          refreshing: false,
        },
        () => {
          this.isFirstLoad = false;
        },
      );
    }

    if (vendors.items[companyId]) {
      this.setState({ vendor: vendors.items[companyId] });
    }
  }

  /**
   * Vendor modal navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  /**
   * Loads products.
   *
   * @param {number} page - Page number.
   */
  handleLoad = (page = 1) => {
    const { companyId, vendorActions, products } = this.props;
    const { filters } = this.state;
    return vendorActions.products(companyId, page, {
      ...products.sortParams,
      features_hash: filters,
    });
  };

  /**
   * Loads more products.
   */
  handleLoadMore() {
    const { products } = this.props;
    const { isLoadMoreRequest } = this.state;

    if (products.hasMore && !isLoadMoreRequest) {
      this.setState({
        isLoadMoreRequest: true,
      });
      this.handleLoad(products.params.page + 1).then(() => {
        this.setState({
          isLoadMoreRequest: false,
        });
      });
    }
  }
  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      this.handleLoad,
    );
  }

  /**
   * Renders header.
   *
   * @return {JSX.Element}
   */
  renderFooter() {
    const { products } = this.props;
    const { isLoadMoreRequest } = this.state;
    // if (isLoadMoreRequest || (products.fetching && products.hasMore)) {
    //   return  <ActivityIndicator
    //       // style`={{ display: isLoadMoreRequest ? 'flex' : 'none' }}
    //       size={30}
    //       color="#7c2981"
    //     />
    //    <ActivityIndicator size="large" animating />;  }

    // return null;
    return (
      <ActivityIndicator
        style={{
          display: isLoadMoreRequest ? 'flex' : 'none',
        }}
        size={30}
        color="#7c2981"
      />
    );
  }
  renderHeader() {
    const {
      vendorCategories,
      companyId,
      products,
      productsActions,
    } = this.props;
    const { vendor } = this.state;

    if (!vendor.logo_url) {
      return null;
    }

    const productHeader = (
      <SortProducts
        handleGridView={{
          state: this.state.gridView,
          set_state: () => this.setState({ gridView: !this.state.gridView }),
        }}
        sortParams={products.sortParams}
        filters={products.filters}
        onChange={(sort) => {
          productsActions.changeSort(sort);
          this.handleLoad();
        }}
        onChangeFilter={(filters) => {
          this.setState({ filters }, this.handleLoad);
        }}
      />
    );

    return (
      <View>
        <VendorInfo
          onViewDetailPress={() =>
            nav.showModalVendorDetail({ vendorId: companyId })
          }
          logoUrl={vendor.logo_url}
          productsCount={vendor.products_count}
        />
        <CategoryBlock
          items={vendorCategories.items}
          onPress={(category) => {
            nav.pushCategory(this.props.componentId, {
              category,
              companyId,
            });
          }}
        />
        {productHeader}
      </View>
    );
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { vendorCategories, vendors } = this.props;
    const { products } = this.state;

    if (vendorCategories.fetching || vendors.fetching) {
      return <Spinner visible />;
    }

    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
          }}>
          <View style={{ maxHeight: 50, justifyContent: 'flex-start' }}>
            <Pressable
              onPress={() => Navigation.dismissModal(this.props.componentId)}
              style={{
                width: 50,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={20} color="#16191a" />
            </Pressable>
          </View>
          <View style={styles.container}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={products}
              keyExtractor={(item) => +item.product_id}
              // removeClippedSubviews
              // initialNumToRender={20}
              ListHeaderComponent={() => this.renderHeader()}
              ListFooterComponent={() => this.renderFooter()}
              numColumns={this.state.gridView ? PRODUCT_NUM_COLUMNS : 1}
              key={this.state.gridView ? PRODUCT_NUM_COLUMNS : 1}
              renderItem={(item) => (
                <ProductListView
                  styledView={true}
                  viewStyle={this.state.gridView ? 'grid' : 'list'}
                  location="Categories"
                  product={item}
                  onPress={(product) =>
                    nav.pushProductDetail(this.props.componentId, {
                      pid: product.product_id,
                    })
                  }
                />
              )}
              onRefresh={() => this.handleRefresh()}
              refreshing={this.state.refreshing}
              onEndReachedThreshold={0.5}
              onEndReached={() => this.handleLoadMore()}
            />
            <View style={{ width: '100%', height: 10 }} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default connect(
  (state) => ({
    vendorCategories: state.vendorCategories,
    products: state.products,
    vendors: state.vendors,
  }),
  (dispatch) => ({
    vendorActions: bindActionCreators(vendorActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(Vendor);
