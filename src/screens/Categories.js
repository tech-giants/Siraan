import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_NUM_COLUMNS } from '../utils';
import i18n from '../utils/i18n';
import { BLOCK_CATEGORIES } from '../constants';

// Import actions.
import * as productsActions from '../actions/productsActions';

// Components
import Spinner from '../components/Spinner';
import VendorInfo from '../components/VendorInfo';
import SortProducts from '../components/SortProducts';
import CategoryBlock from '../components/CategoryBlock';
import ProductListView from '../components/ProductListView';

import * as nav from '../services/navigation';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  emptyList: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '$darkColor',
    marginTop: '1rem',
  },
});

/**
 * Renders categories screen.
 *
 * @reactProps {object} navigator - Navigator.
 * @reactProps {number, string} categoryId - Category id.
 * @reactProps {number, string} companyId - Company id.
 * @reactProps {object} category - Category information.
 * @reactProps {object} vendors - Vendors information.
 * @reactProps {object} products - Products information.
 * @reactProps {object} layouts - Information about all blocks from the main page.
 * @reactProps {object} productsActions - Products actions.
 */
export class Categories extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    categoryId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    companyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    category: PropTypes.shape({}),
    vendors: PropTypes.shape({
      items: PropTypes.object,
    }),
    products: PropTypes.shape({
      items: PropTypes.object,
    }),
    layouts: PropTypes.shape({
      blocks: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    productsActions: PropTypes.shape({
      fetchByCategory: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    this.activeCategoryId = 0;
    this.isFirstLoad = true;

    this.state = {
      filters: '',
      products: [{}],
      subCategories: [],
      refreshing: false,
      isLoadMoreRequest: false,
    };
  }

  /**
   * Collects the content of the selected category.
   */
  async componentDidMount() {
    const { products, categoryId, layouts } = this.props;

    let { category } = this.props;

    if (categoryId) {
      const categories = layouts.blocks.find(
        (b) => b.type === BLOCK_CATEGORIES,
      );
      const items = Object.keys(categories.content.items).map(
        (k) => categories.content.items[k],
      );
      category = this.findCategoryById(items);
    }
    this.activeCategoryId = category.category_id;
    const categoryProducts = products.items[this.activeCategoryId];
    const newState = {};

    if ('subcategories' in category && category.subcategories.length) {
      newState.subCategories = category.subcategories;
    }

    if (categoryProducts) {
      newState.refreshing = false;
      newState.products = categoryProducts;
    }

    this.setState(
      (state) => ({
        ...state,
        ...newState,
      }),
      this.handleLoad,
    );

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: category.category,
        },
      },
    });
  }

  /**
   * Updates products in the state.
   *
   * @param {*} nextProps - Incoming props.
   */
  componentWillReceiveProps(nextProps) {
    const { products } = nextProps;
    const categoryProducts = products.items[this.activeCategoryId];
    if (categoryProducts) {
      this.setState({
        products: categoryProducts,
        refreshing: false,
      });
      this.isFirstLoad = false;
    }
  }

  /**
   * Loads products with selected filters.
   * @param {number} page - Number of pages.
   */
  handleLoad = (page = 1) => {
    const { products, productsActions, companyId } = this.props;
    const { filters } = this.state;

    return productsActions.fetchByCategory(
      this.activeCategoryId,
      page,
      companyId,
      {
        ...products.sortParams,
        features_hash: filters,
      },
    );
  };

  /**
   * Returns all products with the selected category id.
   *
   * @param {object[]} items - All product information.
   */
  findCategoryById(items) {
    const { categoryId } = this.props;
    const flatten = [];
    const makeFlat = (list) => {
      list.forEach((i) => {
        flatten.push(i);
        if ('subcategories' in i) {
          makeFlat(i.subcategories);
        }
      });
    };
    makeFlat(items);
    return flatten.find((i) => i.category_id == categoryId) || null;
  }

  /**
   * Auto-pagination.
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

  /**
   * Refresh products data.
   */
  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      this.handleLoad,
    );
  }

  /**
   * Renders a sorted section.
   *
   * @return {JSX.Element}
   */
  renderSorting() {
    const { productsActions, products } = this.props;

    return (
      <SortProducts
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
  }

  /**
   * Renders header.
   *
   * @return {JSX.Element}
   */
  renderHeader() {
    const { companyId, vendors } = this.props;

    let vendorHeader = null;
    if (companyId && vendors.items[companyId] && !vendors.fetching) {
      const vendor = vendors.items[companyId];
      vendorHeader = (
        <VendorInfo
          onViewDetailPress={() => {
            nav.showModalVendorDetail({ vendorId: companyId });
          }}
          logoUrl={vendor.logo_url}
          productsCount={vendor.products_count}
        />
      );
    }

    return (
      <View>
        {vendorHeader}
        <CategoryBlock
          items={this.state.subCategories}
          onPress={(category) => {
            nav.pushCategory(this.props.componentId, { category, companyId });
          }}
        />
        {this.renderSorting()}
      </View>
    );
  }

  /**
   * Renders spinner.
   *
   * @return {JSX.Element}
   */
  renderSpinner = () => <Spinner visible />;

  /**
   * Renders if there are no products in this section.
   */
  renderEmptyList = () => (
    <Text style={styles.emptyList}>
      {i18n.t('There are no products in this section')}
    </Text>
  );

  /**
   * Renders footer.
   *
   * @return {JSX.Element}
   */
  renderFooter() {
    const { products } = this.props;

    if (products.fetching && products.hasMore) {
      return <ActivityIndicator size="large" animating />;
    }

    return null;
  }

  /**
   * Renders products.
   *
   * @return {JSX.Element}
   */
  renderList() {
    const { products, refreshing } = this.state;
    return (
      <FlatList
        data={products}
        keyExtractor={(item) => +item.product_id}
        ListHeaderComponent={() => this.renderHeader()}
        ListFooterComponent={() => this.renderFooter()}
        numColumns={PRODUCT_NUM_COLUMNS}
        renderItem={(item) => (
          <ProductListView
            product={item}
            onPress={(product) =>
              nav.pushProductDetail(this.props.componentId, {
                pid: product.product_id,
              })
            }
          />
        )}
        onRefresh={() => this.handleRefresh()}
        refreshing={refreshing}
        onEndReachedThreshold={1}
        onEndReached={() => this.handleLoadMore()}
        ListEmptyComponent={() => this.renderEmptyList()}
      />
    );
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { products } = this.props;
    return (
      <View style={styles.container}>
        {products.fetching && this.isFirstLoad
          ? this.renderSpinner()
          : this.renderList()}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products,
    layouts: state.layouts,
    vendors: state.vendors,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(Categories);
