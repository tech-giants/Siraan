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
  Pressable,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';

// Import actions.
import * as productsActions from '../actions/productsActions';
import i18n from '../utils/i18n';
import FastImage from 'react-native-fast-image';

// Components
import ProductListView from '../components/ProductListView';
import Spinner from '../components/Spinner';
import * as nav from '../services/navigation';
import search from '../reducers/search';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
  },
  HeaderSearchCont: {
    backgroundColor: '#fff',
    flex: 1,
    // marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    width: '95%',
    // height: 50,
  },
  headerLogo: {
    width: windowWidth,
    height: 150,
    resizeMode: 'contain',
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
    // backgroundColor:'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: '100%',
    height: windowHeight - 170,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#989898',
    marginTop: 40,
  },
  curvedbtn: {
    // flex:1,
    backgroundColor: '#7c2981',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 30,
    borderRadius: 10,
    height: 50,
    width: windowWidth - 90,
  },
  curvedbtnText: {
    color: '#fff',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: 150,
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
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
      resetSearch: PropTypes.func,
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
      // items: [],
    };
  }
  componentWillMount() {
    this.props.productsActions.resetSearch();
  }
  // componentDidMount() {
  //   if (search.isFirstLoad) {
  //     this.setState({ items: [] });
  //   }
  // }

  // componentDidUpdate() {
  //   if (this.props.search.items.length > 0) {
  //     this.setState({ items: search.items });
  //   } else {
  //     this.setState({ items: [] });
  //   }
  // }
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
        <FastImage
          style={styles.headerLogo}
          source={require('../assets/emptysearch.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.emptyText}>
          {i18n.t('Your Search List is empty !')}
        </Text>
        <Pressable
          onPress={() => Navigation.dismissModal(this.props.componentId)}
          style={styles.curvedbtn}>
          <Text style={styles.curvedbtnText}>{i18n.t('Go to Home')}</Text>
        </Pressable>
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
        <SaldiriHeader
          colored={true}
          midComponent={
            <Pressable
              // onPress={() => nav.showSearch()}
              style={styles.HeaderSearchCont}>
              <TextInput
                autoCorrect={false}
                autoFocus={true}
                autoCapitalize="none"
                onChangeText={debounce((t) => this.handleInputChange(t), 600)}
                style={
                  Platform.os === 'ios' ? styles.input : styles.inputAndroid
                }
                clearButtonMode="while-editing"
                placeholder={i18n.t('Search in Siraan')}
              />
              {/* <Text style={{ fontSize: 18, color: '#a26ea6',  }}>
                    Search in Siraan
                  </Text> */}
              <MaterialIcons name="search" size={30} color="#a26ea6" />
            </Pressable>
          }
        />
        {/* <View style={styles.topSearch}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={debounce((t) => this.handleInputChange(t), 600)}
            style={Platform.os === 'ios' ? styles.input : styles.inputAndroid}
            clearButtonMode="while-editing"
            placeholder={i18n.t('Search')}
          />
        </View> */}
        <View style={styles.content}>
          {/* <Button
            title="Press button"
            onPress={() => productsActions.resetSearch()}
          /> */}
          {!search.fetching ? (
            <FlatList
              showsVerticalScrollIndicator={false}
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
          ) : (
            <ActivityIndicator
              // size="large"
              size={30}
              color="#7c2981"
            />
          )}
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
