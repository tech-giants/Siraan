import React, { useState, useMemo, Fragment, useEffect } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import { Button, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ordersActions from '../../actions/vendorManage/ordersActions';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import orders from '../../reducers/orders';
function FilterProducts(props) {
  const {
    filteredarray,setFilteredarray,
    rawArr,
    componentId,
    filteredDataCallBack,
    setOrderStatus_,
    orderStatus_,
    setFilteredObj,
    filteredObj,
    setFiltered,
    orderPrice_,
    setOrderPrice_,
    statusFilter,
    clearFilters,
    defaultOrderStatus,
    setOrderPriceRange_,
    orderPriceRange_,
  } = props;
  const [orderStatus, setOrderStatus] = useState(orderStatus_);
  const [orderPriceRange, setOrderPriceRange] = useState(orderPriceRange_);
  const [showAllOrderStatus, setShowAllOrderStatus] = useState(false);
  const [priceRangeCond, setPriceRangeCond] = useState(true);
  const setProductStatusHanlder = (obj, index) => {
    let newArr = [...orderStatus];
    newArr[index] = obj;
    setOrderStatus(newArr);
    // setOrderStatus_(newArr);
  };
  //
  
  // set results
  const showResultHandler = () => {
    let orderPriceRangeObj = {
      min: orderPriceRange.min ? +orderPriceRange.min : 0,
      max: orderPriceRange.max? +orderPriceRange.max
      : Number.POSITIVE_INFINITY,
    };
    setOrderStatus_(orderStatus);
    setOrderPriceRange_(orderPriceRangeObj);
    Navigation.dismissModal(componentId);
  };
  const showAllOrderStatusHandler = () => {
    showAllOrderStatus
      ? (setOrderStatus([
          { title: 'processed', value: false, status: 'P' },
          { title: 'complete', value: false, status: 'C' },
          { title: 'open', value: false, status: 'O' },
          { title: 'failed', value: false, status: 'F' },
          { title: 'declined', value: false, status: 'D' },
          { title: 'backordered', value: false, status: 'B' },
          { title: 'cancelled', value: false, status: 'I' },
          { title: 'awaiting_call', value: false, status: 'Y' },
        ]),
        setOrderStatus_([
          { title: 'processed', value: false, status: 'P' },
          { title: 'complete', value: false, status: 'C' },
          { title: 'open', value: false, status: 'O' },
          { title: 'failed', value: false, status: 'F' },
          { title: 'declined', value: false, status: 'D' },
          { title: 'backordered', value: false, status: 'B' },
          { title: 'cancelled', value: false, status: 'I' },
          { title: 'awaiting_call', value: false, status: 'Y' },
        ]))
      : (setOrderStatus(defaultOrderStatus),
        setOrderStatus_(defaultOrderStatus));
  };
  useMemo(() => {
    let showall = orderStatus.every((element) => element.value === true);
    setShowAllOrderStatus(showall);
    return;
  }, [orderStatus]);
  useMemo(() => {
    +orderPriceRange.max < +orderPriceRange.min &&
    orderPriceRange.max.toString() !== 'Infinity'
      ? setPriceRangeCond(false)
      : setPriceRangeCond(true);
  }, [orderPriceRange]);
  console.log('vieworderschecking show all orderStatus', priceRangeCond);

  return (
    <Fragment>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.dismissModal(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#16191a',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle="Filter Orders"
      />
      <ScrollView>
        <View style={styles.rowCont}>
          <Text style={styles.headingTitle}>Orders Status</Text>
          <Pressable onPress={() => showAllOrderStatusHandler()}>
            <Checkbox
              color={'#7c2981'}
              status={showAllOrderStatus ? 'checked' : 'unchecked'}
              onPress={() => showAllOrderStatusHandler()}
            />
          </Pressable>
        </View>
        {orderStatus.map((item, index) => {
          const { title, value } = item;
          return (
            <Pressable
              key={index}
              onPress={() => {
                let obj = { ...item, value: !value };
                setProductStatusHanlder(obj, index);
                statusFilter(obj);
              }}
              style={{
                paddingHorizontal: 10,
                // paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  padding: 13,
                  fontSize: 17,
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                {title.split('_').join(' ')}
              </Text>
              <Checkbox
                color={'#7c2981'}
                status={value ? 'checked' : 'unchecked'}
                onPress={() => {
                  let obj = { ...item, value: !value };
                  setProductStatusHanlder(obj, index);
                  statusFilter(obj);
                }}
              />
            </Pressable>
          );
        })}
        <View style={styles.rowCont}>
          <Text style={styles.headingTitle}>Orders Price</Text>
          <Pressable
            onPress={() => {
              let defaultObj = {
                min: 0,
                max: Number.POSITIVE_INFINITY,
              };
              setOrderPriceRange(defaultObj);
              setOrderPriceRange_(defaultObj);
            }}>
            <Text
              style={{
                // width: '100%',
                // textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15,
                textTransform: 'capitalize',
                paddingVertical: 10,
                marginHorizontal: 10,
                color: '#7c2981',
              }}>
              Clear
            </Text>
          </Pressable>
        </View>
        {/* min price */}
        <View style={styles.rowCont}>
          <Text style={styles.inputLabel}>minimum Price:</Text>
          <TextInput
            style={{ fontSize: 17, flex: 1 }}
            placeholder="Enter minimum price"
            keyboardType="numeric"
            value={orderPriceRange.min.toString()}
            onChangeText={(e) =>
              setOrderPriceRange({ ...orderPriceRange, min: e })
            }
            onBlur={() =>
              setOrderPriceRange({
                ...orderPriceRange,
                min: orderPriceRange.min ? +orderPriceRange.min : 0,
              })
            }
          />
        </View>
        {/* max price */}
        <View style={{ ...styles.rowCont, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.inputLabel}>Maximum Price:</Text>
            <TextInput
              style={{ fontSize: 17, flex: 1 }}
              placeholder="Enter maximum price"
              keyboardType="numeric"
              value={
                orderPriceRange.max.toString() === 'Infinity'
                  ? ''
                  : orderPriceRange.max.toString()
              }
              onChangeText={(e) =>
                setOrderPriceRange({
                  ...orderPriceRange,
                  max: e,
                })
              }
              onBlur={() =>
                setOrderPriceRange({
                  ...orderPriceRange,
                  max: orderPriceRange.max
                    ? +orderPriceRange.max
                    : Number.POSITIVE_INFINITY,
                })
              }
            />
          </View>
          {!priceRangeCond ? (
            <Text
              style={{
                color: 'red',
                // textTransform: 'capitalize',
                fontWeight: 'bold',
              }}>
              Max price must be greater then min price.
            </Text>
          ) : null}
        </View>
      </ScrollView>
      <Pressable
        // disabled={priceRangeCond}
        style={{
          ...styles.proceedButton,
          backgroundColor: priceRangeCond ? '#7c2981' : '#ccc',
        }}
        onPress={priceRangeCond ? showResultHandler : null}>
        <Text
          style={{
            color: priceRangeCond ? '#fff' : '#7c2981',
            fontSize: 18,
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center',
          }}>
          Show Results
        </Text>
      </Pressable>
    </Fragment>
  );
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(FilterProducts);

const styles = StyleSheet.create({
  proceedButton: {
    marginVertical: 15,
    // marginLeft: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c2981',
    width: '95%',
    height: 50,
    // borderColor: '#ccc',
    borderRadius: 5,
    // borderWidth: 1,
  },
  rowCont: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 10,
    flex: 1,
    textTransform: 'capitalize',
  },
  inputLabel: {
    fontSize: 17,
    padding: 10,
    textTransform: 'capitalize',
  },
});
