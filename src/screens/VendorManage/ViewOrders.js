import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import actions.
import * as notificationsActions from '../../actions/notificationsActions';
import * as ordersActions from '../../actions/vendorManage/ordersActions';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import Spinner from '../../components/Spinner';
import EmptyList from '../../components/EmptyList';

// import { FloatingLabelInput } from 'react-native-floating-label-input';
function ViewOrders(props) {
  const { ordersActions, orders, allProducts, title, componentId } = props;
  const { hasMore, page } = orders;
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [renderOrders, setRenderOrders] = useState([]);
  const [orderID, setOrderID] = useState(0);
  const [orderPriceRange, setOrderPriceRange] = useState({
    min: 0,
    max: Number.POSITIVE_INFINITY,
  });
  const [ordersStatics, setOrdersStatics] = useState({
    totalOrders: 0,
    totalAmount: 0,
  });
  let defaultOrderStatus = [
    { title: 'processed', value: true, status: 'P' },
    { title: 'complete', value: true, status: 'C' },
    { title: 'open', value: true, status: 'O' },
    { title: 'failed', value: true, status: 'F' },
    { title: 'declined', value: true, status: 'D' },
    { title: 'backordered', value: true, status: 'B' },
    { title: 'cancelled', value: true, status: 'I' },
    { title: 'awaiting_call', value: true, status: 'Y' },
  ];
  let defaultFilteredObj = {
    P: [],
    C: [],
    O: [],
    F: [],
    D: [],
    B: [],
    I: [],
    Y: [],
  };
  const [orderStatus, setOrderStatus] = useState(defaultOrderStatus);
  const [filteredObj, setFilteredObj] = useState(defaultFilteredObj);
  const [searchInputText, setSearchInputText] = useState('');
  const [filtered, setFiltered] = useState(false);
  const [orderPrice, setOrderPrice] = useState({
    min: 0,
    max: Number.POSITIVE_INFINITY,
  });
  // sorting
  const [sortBy, setsortBy] = useState({
    name: 'sort_id',
    label: 'Max first',
    value: 'desc',
    id: 'sort_id_desc',
  });
  // fetching initial orders list
  useEffect(() => {
    (async () => {
      ordersActions.fetch(page);
      ordersActions.getOrderStatuses();
    })();
  }, []);

  useMemo(() => {
    if (renderOrders.length > 0 || orders.items.length > 0) {
      let o = renderOrders.length >= 1 ? renderOrders : orders.items;
      const total = o.reduce(
        (total, currentItem) => (total = total + currentItem.total),
        0,
      );

      setOrdersStatics({
        totalOrders: o.length,
        totalAmount: total,
      });
    }
    return 0;
  }, [renderOrders, orders.items]);
  /**
   * Refreshes screen.
   */
  const handleRefresh = () => {
    setRefreshing(true);
    ordersActions.fetch(0).then(() => {
      setRefreshing(false);
    });
  };
  /**
   * Loads more orders.
   */
  const handleLoadMore = () => {
    console.log(
      'view order handleloadmore',
      hasMore,
      '<<orderItem.length>>',
      renderOrders.length < 1,
    );
    if (hasMore) {
      setLoadingMore(true);
      ordersActions.fetch(page).then(() => {
        setLoadingMore(false);
      });
    }
    return;
  };
  /**
   * Updates status of order.
   *
   * @param {number} index - Order index.
   */
  const handleChangeStatus = (index) => {
    if (orders.orderStatuses[index]) {
      ordersActions.updateVendorOrderStatus(
        orderID,
        orders.orderStatuses[index].status,
      );
    }
  };
  console.log('orders.items', orders);

  const onInputChangeHandler = async (id) => {
    const rawArr = orders.items;
    let inputId = id.toString();
    setSearchInputText(inputId);
    if (id) {
      let newArr = await rawArr.filter((element) => {
        let elementId = element.order_id.toString();
        return elementId.includes(inputId);
      });
      setFiltered(true);
      setRenderOrders(newArr);
    } else {
      setRenderOrders(rawArr);
    }
  };

  // filtration functions

  const statusFilter = (obj = {}) => {
    // let { status, value } = obj;
    // let { min, max } = orderPrice;
    // if (value) {
    //   let newArr = rawArr.filter((element) => element.status === status);
    //   console.log('statusFilter newArr', newArr);
    //   setFilteredObj({ ...filteredObj, [status]: newArr });
    // } else {
    //   setFilteredObj({ ...filteredObj, [status]: [] });
    // }
  };
  const statusFilterHandler = () => {
    let filteredobj = {};
    orderStatus.map((item, index) => {
      console.log('orderStatus.map item', item);
      let { status, value } = item;
      if (value) {
        let newArr = orders.items.filter(
          (element) => element.status === status,
        );
        filteredobj = { ...filteredobj, [status]: newArr };
      } else {
        filteredobj = { ...filteredobj, [status]: [] };
      }
    });
    setFilteredObj(filteredobj);
  };
  //
  const clearFilters = () => {
    setOrderStatus(defaultOrderStatus);
    setFilteredObj(defaultFilteredObj);
    setRenderOrders([]);
    setSearchInputText('');
    setFiltered(false);
    setOrderPrice({
      min: 0,
      max: Number.POSITIVE_INFINITY,
    });
  };
  //
  const priceRangeFilter = (arr) => {
    let { min, max } = orderPriceRange;
    let newArr = arr.filter(
      (element) => element.total >= min && element.total <= max,
    );
    setRenderOrders(newArr);
    return newArr;
  };
  //

  useEffect(() => {
    statusFilterHandler();
  }, [orderStatus, orders.items]);
  //
  useMemo(() => {
    let filteredData = [];
    Object.values(filteredObj).map((item) => {
      return (filteredData = filteredData.concat(item));
    });
    // setRenderOrders(filteredData);
    priceRangeFilter(filteredData);
    return;
  }, [filteredObj]);

  // useMemo(priceRangeFilter, [orderPriceRange]);
  //
  if (orders.loading || !orders.orderStatuses) {
    return <Spinner visible />;
  }

  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
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
        midHeaderTitle="View Orders"
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
        }}>
        <View style={styles.textInput}>
          <Text
            style={{
              color: '#7c2981',
              fontWeight: 'bold',
              textAlign: 'right',
              fontSize: 17,
              marginLeft: 5,
            }}>
            ID:
          </Text>
          <TextInput
            style={{ flex: 1, fontSize: 14 }}
            placeholder="Search by order id"
            keyboardType="numeric"
            onChangeText={(id) => onInputChangeHandler(id)}
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
            nav.SortOrders(componentId, {
              setRenderOrders,
              ordersList: renderOrders,
              // renderOrders.length >= 1
              //   ? renderOrders
              //   : searchInputText
              //   ? []
              //   : orders.items,
              setsortBy_: setsortBy,
              sortBy_: sortBy,
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
            nav.FilterOrders(componentId, {
              rawArr: orders.items,
              orderStatus_: orderStatus,
              setOrderStatus_: setOrderStatus,
              statusFilter,
              filteredObj,
              defaultOrderStatus,
              setFilteredObj,
              clearFilters,
              setOrderPriceRange_: setOrderPriceRange,
              orderPriceRange_: orderPriceRange,
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
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {ordersStatics.totalOrders} Orders
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Rs {ordersStatics.totalAmount}
        </Text>
      </View>
      {/* Flatlist */}
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `order_${index}`}
        data={
          renderOrders
          // renderOrders.length > 0
          //   ? renderOrders
          //   : searchInputText
          //   ? []
          //   : orders.items
        }
        ListEmptyComponent={<EmptyList message="No Orders found." />}
        renderItem={({ item }) => {
          return (
            <Pressable
              key={item.order_id}
              onPress={() =>
                nav.OrderInfo(componentId, {
                  orderId: item.order_id,
                })
              }>
              <View style={styles.mainCard}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 5,
                  }}>
                  {/*name */}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#000',
                      width: '65%',
                    }}>
                    {item.firstname} {item.lastname}
                  </Text>
                  {/* order id */}
                  <Text
                    style={{
                      color: '#7c2981',
                      fontWeight: 'bold',
                      textAlign: 'right',
                      fontSize: 17,
                      width: '35%',
                    }}>
                    {/* {item.phone} */}ID: {item.order_id}
                  </Text>
                </View>
                {/*  */}
                <View
                  style={{
                    ...styles.insideCard,
                  }}>
                  {/* <Text
                    style={{
                      fontSize: 17,
                      color: '#7c2981',
                      fontWeight: 'bold',
                    }}>
                    Status:
                  </Text> */}
                  <Text
                    style={{
                      fontSize: 17,
                      color: item.status_data.color,
                      fontWeight: 'bold',
                    }}>
                    {item.status_data.description}
                  </Text>
                </View>
                {/*  */}
                <View
                  style={{
                    ...styles.insideCard,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#7c2981',
                      fontWeight: 'bold',
                    }}>
                    Rs: {item.total}
                  </Text>
                </View>
                {/* date */}
                <Text
                  style={{
                    fontSize: 15,
                    color: '#7c2981',
                    textAlign: 'left',
                    width: '100%',
                    marginLeft: 15,
                  }}>
                  {new Date(item.timestamp).toDateString()}
                </Text>
                {/* phone */}
                <Text
                  style={{
                    fontSize: 15,
                    color: '#7c2981',
                    textAlign: 'left',
                    width: '100%',
                    marginLeft: 15,
                  }}>
                  {item.phone}
                </Text>
                {/* email */}
                <Text
                  style={{
                    fontSize: 15,
                    color: '#7c2981',
                    textAlign: 'left',
                    width: '100%',
                    marginLeft: 15,
                  }}>
                  {item.email}
                </Text>
                {/* adress */}
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    color: '#7c2981',
                    textAlign: 'left',
                    width: '100%',
                    marginLeft: 15,
                  }}>
                  {item.s_address}
                </Text>
              </View>
            </Pressable>
          );
        }}
        onEndReached={handleLoadMore}
        refreshing={refreshing}
        onRefresh={() => handleRefresh()}
        ListFooterComponent={
          loadingMore && hasMore ? (
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
              no more orders to show.
            </Text>
          ) : null
          //
          // loadingMore && hasMore ? (
          //   <ActivityIndicator
          //     style={{
          //       display: 'flex',
          //     }}
          //     size={30}
          //     color="#7c2981"
          //   />
          // ) : !hasMore && renderOrders.length < 1 && !filtered ? (
          //   <Text
          //     style={{
          //       width: '100%',
          //       textAlign: 'center',
          //       fontWeight: 'bold',
          //       fontSize: 12,
          //       textTransform: 'capitalize',
          //       marginVertical: 10,
          //     }}>
          //     no more orders to show
          //   </Text>
          // ) : filtered ? (
          //   <Pressable onPress={() => clearFilters()}>
          //     <Text style={styles.clearFilterText}>
          //       clear filters to load more.
          //       <Text style={{ ...styles.clearFilterText, color: '#7c2981' }}>
          //         {' '}
          //         click here
          //       </Text>
          //     </Text>
          //   </Pressable>
          // ) : null
        }
      />
    </>
  );
}

export default connect(
  (state) => ({
    orders: state.vendorManageOrders,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(ViewOrders);
const styles = StyleSheet.create({
  clearFilterText: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'capitalize',
    marginVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    width: '90%',
    // marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7c2981',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  topRowCol: {
    padding: 10,
    width: '50%',
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
    width: '90%',
    height: 70,
  },
  mainCard: {
    marginHorizontal: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    // height: 160,
    borderWidth: 1,
    borderColor: '#7c2981',
    borderRadius: 5,
    shadowColor: '#7c2981',
  },
  insideCard: {
    paddingHorizontal: 5,
    // height: 45,
    alignItems: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    // marginTop: 12,
    width: '100%',
    // borderColor: '#7c2981',
    // borderWidth: 1,
    // borderRadius: 10,
  },
  priceContainer2: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row-reverse',
  },
});
