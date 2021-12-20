import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from '../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Import actions.
import * as notificationsActions from '../../actions/notificationsActions';
import * as productsActions from '../../actions/vendorManage/productsActions';
// import * as productsActions from '../../actions/productsActions';
import * as vendorActions from '../../actions/vendorActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import Spinner from '../../components/Spinner';
import EmptyList from '../../components/EmptyList';
import { getImagePath, getProductStatus } from '../../utils';
import i18n from '../../utils/i18n';
import { iconsMap } from '../../utils/navIcons';
//
import VendorSortProducts from '../../components/VendorSortProducts';
import { set } from 'lodash';
//
function ViewProduct(props) {
  const {
    productsActions,
    allProducts,
    title,
    componentId,
    loading,
    companyId,
    vendorActions,
    hasMore,
    products,
    totalProducts,
    page,
  } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState('');
  const [renderProducts, setRenderProducts] = useState([]);
  const [isLoadMoreRequest, setIsLoadMoreRequest] = useState(false);
  // sorting state
  const [sortBy, setsortBy] = useState({
    name: 'sort_amount',
    label: 'min first',
    value: 'asce',
    id: 'sort_time_asce',
  });
  // filter states
  const [productStatus, setProductStatus] = useState([
    { title: 'Active', value: true, status: 'A' },
    { title: 'Hidden', value: true, status: 'H' },
    { title: 'Disabled', value: true, status: 'D' },
    { title: 'Not Approved', value: true, status: 'R' },
  ]);
  const [filteredObj, setFilteredObj] = useState({
    A: [],
    H: [],
    D: [],
    R: [],
  });

  const [searchInputText, setSearchInputText] = useState('');
  // const [filtered, setFiltered] = useState(false);

  const onInputChangeHandler = async (inputName) => {
    const rawarr = products;
    let name = inputName.toLowerCase();
    setSearchInputText(inputName);
    if (inputName) {
      let newarr = await rawarr.filter((element) => {
        let productName = element.product.toLowerCase();
        return productName.includes(name);
      });
      // setFiltered(true);
      setRenderProducts(newarr);
    } else {
      setRenderProducts(rawarr);
    }
  };

  // sorting products function
  const sortProductHandler = () => {
    let sortedArr = [];
    if (sortBy.name) {
      let sortByName = sortBy.name;
      let sortValue = sortBy.value;
      let sortKey = '';
      if (sortByName === 'sort_amount') {
        sortKey = 'amount';
      }
      if (sortByName === 'sort_price') {
        sortKey = 'price';
      }
      if (sortByName === 'sort_name') {
        sortKey = 'product';
      }
      sortedArr = renderProducts.sort(function (first, second) {
        let x = first[sortKey];
        let y = second[sortKey];
        // console.log('x===>', x, 'y===>', y);
        return sortValue === 'asce' ? x - y : y - x;
      });
      // console.log('showresult sorted arr', sortedArr);
    }
    setRenderProducts(sortedArr);
    // setOrdersItem(sortedArr);
    // setsortBy_(sortBy);
    // Navigation.dismissModal(componentId);
  };
  // filter products function
  const statusFilter = (obj = {}) => {
    //   let { status, value } = obj;
    //   if (value) {
    //     let newArr = products.filter((element) => element.status === status);
    //     console.log('statusFilter newArr', { [status]: newArr });
    //     setFilteredObj({ ...filteredObj, [status]: newArr });
    //   } else {
    //     setFilteredObj({ ...filteredObj, [status]: [] });
    //   }
  };
  const statusFilterHandler = () => {
    let filteredobj = {};
    productStatus.map((item, index) => {
      console.log('productStatus.map item', item);
      let { status, value } = item;
      if (value) {
        let newArr = products.filter((element) => element.status === status);
        // console.log('statusFilter handler newArr', { [status]: newArr });
        filteredobj = { ...filteredobj, [status]: newArr };
        // setFilteredObj({ ...filteredObj, [status]: newArr });
      } else {
        // console.log('statusFilter handler else', { [status]: [] });
        filteredobj = { ...filteredobj, [status]: [] };
        // setFilteredObj({ ...filteredObj, [status]: [] });
      }
    });
    console.log('statusFilter handler filteredobj', filteredobj);
    setFilteredObj(filteredobj);
  };
  //
  useEffect(() => {
    sortProductHandler();
  }, [sortBy, products]);
  useEffect(() => {
    statusFilterHandler();
  }, [productStatus, products]);
  useMemo(() => {
    let filteredData = [];
    Object.values(filteredObj).map((item) => {
      return (filteredData = filteredData.concat(item));
    });
    setRenderProducts(filteredData);
    return;
  }, [filteredObj]);
  // const companyId = 16;
  // const handleLoadMore = () => {
  //   if (!hasMore) {
  //     return;
  //   }

  //   productsActions.fetchProducts(page);
  // };
  // const handleRefresh = () => {
  //   // this.setState({
  //   //   refreshing: true,
  //   // });

  //   handleLoad(0);
  // };
  // const handleStatusActionSheet = (index) => {
  //   const statuses = ['A', 'H', 'D'];
  //   const activeStatus = statuses[index];
  //   productsActions.updateProduct( product_id, {
  //     status: activeStatus,
  //   });
  // // };
  // const handleLoad = (page = 1) => {
  //   console.log(
  //     'viewproduct handleload running products.sortParams',
  //     products.sortParams,
  //   );

  //   return vendorActions.products(companyId, page, {
  //     ...products.sortParams,
  //     features_hash: filters,
  //   });
  // };
  // const handleLoadMore = () => {
  //   if (products.hasMore && !isLoadMoreRequest) {
  //     setIsLoadMoreRequest(true);
  //     handleLoad(products.params.page + 1).then(() => {
  //       setIsLoadMoreRequest(false);
  //     });
  //   }
  // };
  // useEffect(() => {
  //   if (products.items[companyId]) {
  //     let arr =
  //       products.items[companyId].length > 0 ? products.items[companyId] : [];
  //     setRenderProducts(arr);
  //   }
  //   return;
  // }, [products]);

  // if (products.viewProductLoad) {
  //   return <Spinner visible />;
  // }

  /**
   * Loads more products.
   */
  const handleLoadMore = () => {
    if (hasMore) {
      setIsLoadMoreRequest(true);
      productsActions.fetchProducts(page).then((_) => {
        setIsLoadMoreRequest(false);
      });
      return;
    }
    return;
  };

  /**
   * Refreshes screen.
   */
  const handleRefresh = () => {
    setRefreshing(true);
    // clearFilters();
    productsActions.fetchProducts(0).then(() => {
      setRefreshing(false);
    });
  };

  // console.log('products.items[companyId]', companyId);
  useEffect(() => {
    if (products.length < 1) {
      handleLoadMore();
    }
  }, []);
  // console.log('statusFilter filteredObjfilteredObj', filteredObj);
  // console.log('statusFilter productStatusproductStatus', productStatus);
  const clearFilters = () => {
    let defaultFilteredObj = {
      A: [],
      H: [],
      D: [],
      R: [],
    };
    let defaultProductStatus = [
      { title: 'Active', value: false, status: 'A' },
      { title: 'Hidden', value: false, status: 'H' },
      { title: 'Disabled', value: false, status: 'D' },
      { title: 'Not Approved', value: false, status: 'R' },
    ];
    setRenderProducts(products);
    setProductStatus(defaultProductStatus);
    setFilteredObj(defaultFilteredObj);
  };
  if (loading && renderProducts.length < 1) {
    return <Spinner visible />;
  }
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#7c2981',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle="View Products"
      />

      <View style={styles.topRow}>
        <View style={{ ...styles.topRowCol, borderRightWidth: 1 }}>
          <Text style={{ color: '#7c2981', fontWeight: 'bold' }}>
            Total Products
          </Text>
          {/* <Text style={styles.topRowColText2}>{totalProducts}</Text> */}
          <Text style={styles.topRowColText2}>{products.length}</Text>
        </View>
        {/* <View style={{ ...styles.topRowCol }}>
          <Text style={{ color: '#7c2981', fontWeight: 'bold' }}>
            Sold Products
          </Text>
          <Text style={styles.topRowColText2}>6</Text>
        </View> */}
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 320,
          alignSelf: 'center',
          // marginVertical: 10,
        }}>
        <View style={styles.textInput}>
          <MaterialIcons
            style={{ marginHorizontal: 5 }}
            name="search"
            size={25}
            color="#7c2981"
          />
          <TextInput
            style={{ width: 240, fontSize: 14 }}
            placeholder="Name or Mobile No. or Address"
          />
        </View>

        <Pressable onPress={() => nav.SortOrders(componentId)}>
          <MaterialIcons
            style={{ marginLeft: 5 }}
            name="sort"
            size={25}
            color="#7c2981"
          />
        </Pressable>

        <Pressable onPress={() => nav.FilterOrders(componentId)}>
          <MaterialIcons
            style={{ marginLeft: 5 }}
            name="settings-input-composite"
            size={20}
            color="#7c2981"
          />
        </Pressable>
      </View> */}
      {/* <View style={{ width: '90%', alignSelf: 'center' }}>
        <VendorSortProducts
          sortParams={products.sortParams}
          filters={products.filters}
          onChange={async (sort) => {
            await productsActions.changeSort(sort);
            handleLoad();
          }}
          onChangeFilter={(filters) => {
            console.log('VendorSortProducts onChangeFilter', filters);

            setFilters(filters);
            handleLoad();
          }}
        />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
        }}>
        <View style={styles.textInput}>
          {/* <Text
            style={{
              color: '#7c2981',
              fontWeight: 'bold',
              textAlign: 'right',
              fontSize: 17,
              // width: '10%',
              marginLeft: 5,
            }}>
            ID:
          </Text> */}
          <TextInput
            style={{ flex: 1, fontSize: 14 }}
            placeholder="Search by product name"
            // keyboardType="numeric"
            onChangeText={(e) => onInputChangeHandler(e)}
            value={searchInputText}
          />
          <Pressable
            onPress={() => (searchInputText ? onInputChangeHandler('') : {})}>
            <MaterialIcons
              style={{ marginHorizontal: 5 }}
              name={searchInputText ? 'close' : 'search'}
              size={25}
              color="#7c2981"
            />
          </Pressable>
        </View>

        <Pressable
          style={{ padding: 5 }}
          onPress={() =>
            nav.SortProducts(componentId, {
              sortBy_: sortBy,
              setsortBy_: setsortBy,
            })
          }>
          <MaterialCommunityIcons
            // style={{ marginLeft: 5 }}
            name="sort-variant"
            size={25}
            color="#7c2981"
          />
        </Pressable>

        <Pressable
          style={{ padding: 5 }}
          onPress={() =>
            nav.FilterProducts(componentId, {
              rawArr: products,
              productStatus_: productStatus,
              setProductStatus_: setProductStatus,
              statusFilter,
              filteredObj,
              setFilteredObj,
              clearFilters,
            })
          }>
          <MaterialCommunityIcons
            // style={{ marginLeft: 5 }}
            name="filter-outline"
            size={20}
            color="#7c2981"
          />
        </Pressable>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {renderProducts.length} Product
        </Text>
        {/* <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Rs 800
        </Text> */}
      </View>
      <FlatList
        contentContainerStyle={{ justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `order_${index}`}
        // data={products}
        data={renderProducts}
        ListEmptyComponent={<EmptyList message="No Products review." />}
        ListFooterComponent={
          hasMore && isLoadMoreRequest ? (
            <ActivityIndicator
              style={{
                display: 'flex',
              }}
              size={30}
              color="#7c2981"
            />
          ) : !hasMore ? (
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'capitalize',
                marginVertical: 10,
              }}>
              no more products to show.
            </Text>
          ) : null
        }
        renderItem={({ item }) => {
          let status = getProductStatus(item.status);
          let imageUri = getImagePath(item);
          return (
            <Pressable
              key={item.product_id}
              style={styles.mainCard}
              // onPress={() => {
              //   nav.pushVendorManageEditProduct(componentId, {
              //     productID: item.product_id,
              //     title: i18n.t(item.product || '').toUpperCase(),
              //     showBack: true,
              //   });
              // }}
              onPress={() =>
                nav.ProductInfo(componentId, {
                  productID: item.product_id,
                })
              }>
              <View style={styles.rowWrapper}>
                <View style={styles.listItemImage}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: imageUri || 'https://siraan.com/moblogo/moblogo.png',
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    // flexDirection: 'row',
                    width: '75%',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: '#000',
                      width: '75%',
                      // marginHorizontal:20,
                    }}>
                    {item.product}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      // justifyContent: 'flex-end',
                    }}>
                    {`${item.price_formatted.price}    `}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        // justifyContent: 'flex-end',
                      }}>
                      Amount:
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        // ...status.style,
                        color: '#7c2981',
                        marginHorizontal: 5,
                      }}>
                      {item.amount}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        // justifyContent: 'flex-end',
                      }}>
                      Status:
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        ...status.style,
                        marginHorizontal: 5,
                      }}>
                      {status.text}
                    </Text>
                  </View>
                </View>
              </View>
              {/* 
                <View>
                  <View style={styles.insideCard}>
                    <Text
                      style={{
                        fontSize: 17,
                        // color: '#7c2981',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        ...status.style,
                      }}>
                      {status.text}
                    </Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={30}
                      color="#7c2981"
                    />
                  </View>
                </View> */}
            </Pressable>
          );
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
}

export default connect(
  (state) => ({
    // products: state.products,
    vendors: state.vendors,
    products: state.vendorManageProducts.items,
    hasMore: state.vendorManageProducts.hasMore,
    loading: state.vendorManageProducts.loading,
    page: state.vendorManageProducts.page,
    companyId: state.profile.company_id,
    totalProducts: state.products.totalItems,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
    vendorActions: bindActionCreators(vendorActions, dispatch),
  }),
)(ViewProduct);

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7c2981',
    alignSelf: 'center',
    borderRadius: 5,
  },
  topRowCol: {
    padding: 10,
    flex: 1,
    borderColor: '#7c2981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRowColText2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  listItemImage: {
    width: '25%',
  },

  rowWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 20,
    fontSize: 13,
    height: 45,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.5,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#7c2981',
  },
  productImage: {
    // backgroundColor: 'red',
    width: '100%',
    height: 85,
    // resizeMode: 'contain',
  },
  mainCard: {
    // marginHorizontal: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: '#7c2981',
    borderRadius: 5,
    shadowColor: '#7c2981',
  },
  // insideCard: {
  //   padding: 5,
  //   height: 45,
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  //   marginTop: 12,
  //   // width: 270,
  //   borderColor: '#7c2981',
  //   borderWidth: 1,
  //   borderRadius: 8,
  //  },
});
