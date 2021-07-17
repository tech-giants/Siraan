import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Platform,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';

// Import actions.
import * as productsActions from '../actions/productsActions';
import i18n from '../utils/i18n';

// Components
import ProductListView from '../components/ProductListView';
import Spinner from '../components/Spinner';
import * as nav from '../services/navigation';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
  },
  topSearch: {
    backgroundColor: '#FAFAFA',
    height: Platform.OS === 'ios' ? 80 : 60,
    padding: 14,
    paddingTop: Platform.OS === 'ios' ? 30 : 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    flex: 2,
    fontSize: '0.9rem',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  inputAndroid: {
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 2,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    marginTop: 80,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#989898',
  },
});

/**
 * Renders search.
 *
 * @reactProps {object} productsActions - Products actions.
 * @reactProps {object} search - Search information.
 */
export class Search extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    productsActions: PropTypes.shape({
      search: PropTypes.func,
    }),
    search: PropTypes.shape({}),
  };

  /**
   * @ignore
   */
  static options = {
    topBar: {
      visible: false,
    },
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      q: '',
    };
  }

  /**
   * Gets more results of search and sets them in the store.
   */
  handleLoadMore = () => {
    const { productsActions, search } = this.props;
    const { q } = this.state;

    if (search.fetching || !search.hasMore) {
      return;
    }

    productsActions.search({
      q,
      page: search.params.page + 1,
    });
  };

  /**
   * Monitors input changes, makes requests.
   *
   * @param {number} q - Request length.
   */
  handleInputChange(q) {
    const { productsActions } = this.props;

    if (q.length < 2) {
      return;
    }

    this.setState(
      {
        q,
      },
      () => {
        productsActions.search({
          q,
        });
      },
    );
  }

  /**
   * Renders if no matches.
   *
   * @return {JSX.Element}
   */
  renderEmptyList = () => {
    const { search } = this.props;

    if (search.fetching) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{i18n.t('List is empty')}</Text>
      </View>
    );
  };

  /**
   * Renders spinner.
   *
   * @return {JSX.Element}
   */
  renderSpinner = () => <Spinner visible />;

  /**
   * Renders footer if fetching.
   *
   * @return {JSX.Element}
   */
  renderFooter() {
    const { search } = this.props;

    if (search.fetching && search.hasMore) {
      return <ActivityIndicator size="large" animating />;
    }

    return null;
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { search } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topSearch}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={debounce((t) => this.handleInputChange(t), 600)}
            style={Platform.os === 'ios' ? styles.input : styles.inputAndroid}
            clearButtonMode="while-editing"
            placeholder={i18n.t('Search')}
          />
        </View>
        <View style={styles.content}>
          <FlatList
            data={search.items}
            keyExtractor={(item) => uniqueId(+item.product_id)}
            numColumns={3}
            ListEmptyComponent={() => this.renderEmptyList()}
            ListFooterComponent={() => this.renderFooter()}
            onEndReached={this.handleLoadMore}
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
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    search: state.search,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(Search);
