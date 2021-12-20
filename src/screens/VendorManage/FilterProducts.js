import React, { useState, useMemo, Fragment, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import { Button, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ordersActions from '../../actions/vendorManage/ordersActions';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
function FilterProducts(props) {
  const {
    rawArr,
    componentId,
    filteredDataCallBack,
    setProductStatus_,
    productStatus_,
    setFilteredObj,
    filteredObj,
    setFiltered,
    orderPrice_,
    setOrderPrice_,
    statusFilter,
    clearFilters,
  } = props;
  const [showAll, setShowAll] = useState(false);
  const [filteredArr, setFilteredArr] = useState([]);
  const [productStatus, setProductStatus] = useState(productStatus_);
  const [orderPrice, setOrderPrice] = useState(orderPrice_);
  const setProductStatusHanlder = (obj, index) => {
    let newArr = [...productStatus];
    newArr[index] = obj;
    setProductStatus(newArr);
    setProductStatus_(newArr);
  };

  // set results
  const showResultHandler = () => {
    setProductStatus_(productStatus);
    Navigation.dismissModal(componentId);
  };
  useMemo(() => {
    let showall = productStatus.every((element) => element.value === true);
    setShowAll(showall);
    return;
  }, [productStatus]);
  const showAllProductStatusHandler = () => {
    showAll
      ? (setProductStatus([
          { title: 'Active', value: false, status: 'A' },
          { title: 'Hidden', value: false, status: 'H' },
          { title: 'Disabled', value: false, status: 'D' },
          { title: 'Not Approved', value: false, status: 'R' },
        ]),
        setProductStatus_([
          { title: 'Active', value: false, status: 'A' },
          { title: 'Hidden', value: false, status: 'H' },
          { title: 'Disabled', value: false, status: 'D' },
          { title: 'Not Approved', value: false, status: 'R' },
        ]))
      : (setProductStatus([
          { title: 'Active', value: true, status: 'A' },
          { title: 'Hidden', value: true, status: 'H' },
          { title: 'Disabled', value: true, status: 'D' },
          { title: 'Not Approved', value: true, status: 'R' },
        ]),
        setProductStatus_([
          { title: 'Active', value: true, status: 'A' },
          { title: 'Hidden', value: true, status: 'H' },
          { title: 'Disabled', value: true, status: 'D' },
          { title: 'Not Approved', value: true, status: 'R' },
        ]));
  };
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
        midHeaderTitle="Filter Products"
      />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              padding: 10,
              // marginLeft: 17,
            }}>
            Product Status
          </Text>
          <Pressable
            onPress={() => {
              // clearFilters();
              // setProductStatus([
              //   { title: 'Active', value: false, status: 'A' },
              //   { title: 'Hidden', value: false, status: 'H' },
              //   { title: 'Disabled', value: false, status: 'D' },
              //   { title: 'Not Approved', value: false, status: 'R' },
              // ]);
              showAllProductStatusHandler();
            }}>
            <Checkbox
              color={'#7c2981'}
              status={showAll ? 'checked' : 'unchecked'}
              onPress={() => {
                // clearFilters();
                // setProductStatus([
                //   { title: 'Active', value: false, status: 'A' },
                //   { title: 'Hidden', value: false, status: 'H' },
                //   { title: 'Disabled', value: false, status: 'D' },
                //   { title: 'Not Approved', value: false, status: 'R' },
                // ]);
                showAllProductStatusHandler();
              }}
            />
            {/* <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                textTransform: 'capitalize',
                paddingVertical: 10,
                marginHorizontal: 10,
                color: '#7c2981',
              }}>
              clear
            </Text> */}
          </Pressable>
        </View>
        {productStatus.map((item, index) => {
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
      </ScrollView>
      <Pressable style={styles.proceedButton} onPress={showResultHandler}>
        <Text
          style={{
            color: '#fff',
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
  dropdown: {
    padding: 5,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    marginRight: 5,
  },
});
