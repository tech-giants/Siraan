import React, { useState, useMemo, Fragment, useEffect } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button, Checkbox } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { stat } from 'react-native-fs';
import { conformsTo } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ordersActions from '../../actions/vendorManage/ordersActions';
function ProductOrder(props) {
  const {
    rawArr,
    componentId,
    filteredDataCallBack,
    setProductStatus_,
    productStatus_,
    setFilteredObj_,
    filteredObj_,
    setFiltered,
    orderPrice_,
    setOrderPrice_,
  } = props;
  const [checked, setChecked] = useState('first');
  const [filteredArr, setFilteredArr] = useState([]);
  const [filteredObj, setFilteredObj] = useState(filteredObj_);

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const data = [
  //   { label: 'Daily', value: '1' },
  //   { label: 'Weekly', value: '2' },
  //   { label: 'Monthly', value: '3' },
  //   { label: 'Custom', value: '4' },
  //   { label: 'All', value: '5' },
  // ];
  const [productStatus, setProductStatus] = useState(
    // [
    // { title: 'processed', value: false, status: 'P' },
    // { title: 'complete', value: false, status: 'C' },
    // { title: 'open', value: false, status: 'O' },
    // { title: 'failed', value: false, status: 'F' },
    // { title: 'declined', value: false, status: 'D' },
    // { title: 'backordered', value: false, status: 'B' },
    // { title: 'cancelled', value: false, status: 'I' },
    // { title: 'awaiting_call', value: false, status: 'Y' },
    // ]
    productStatus_,
  );
  const [orderPrice, setOrderPrice] = useState(orderPrice_);
  const statusFilter = (obj = {}) => {
    let { status, value } = obj;
    let { min, max } = orderPrice;
    if (value) {
      let newArr = rawArr.filter(
        (element) => element.status === status,
        // &&
        // element.total >= min &&
        // element.total <= max,
      );
      console.log('statusFilter newArr', newArr);
      setFilteredObj({ ...filteredObj, [status]: newArr });
    } else {
      setFilteredObj({ ...filteredObj, [status]: [] });
    }
  };
  // const priceFilter = (min = 0, max = Number.POSITIVE_INFINITY) => {
  //   setMinPrice(min);
  //   setmaxPrice(max);
  //   // let newArr =
  // };
  const setProductStatusHanlder = (obj, index) => {
    let newArr = [...productStatus];
    newArr[index] = obj;
    setProductStatus(newArr);
  };
  // const statusFilter = async () => {
  //   var temp_arr = [];

  //   productStatus.map(async (item) => {
  //     const { status, value } = item;

  //     console.log('status ', status, ' value ', value);
  //     if (value) {
  //       console.log('inside if ', rawArr);

  //       let newArr = await rawArr.filter(
  //         (element) => element.status === status,
  //       );
  //       temp_arr = [...temp_arr, ...newArr];
  //     }
  //   });
  //   console.log('temp_arr ', temp_arr);
  //   // setFilteredArr(temp_arr);
  //   // if (flag == false) {
  //   //   setFilteredArr([]);
  //   // }
  // };
  // useMemo(() => {
  //   statusFilter();
  // }, [productStatus]);
  // filter array by min and max price
  const priceFilter = () => {
    let { min, max } = orderPrice;
    // let arr = filteredArr.length > 0 ? filteredArr : rawArr;
    let arr = filteredArr;
    let newArr = arr.filter(
      (element) => element.total >= min && element.total <= max,
    );
    setFilteredArr(newArr);
    return newArr;
  };
  // set results
  const showResultHandler = () => {
    // let filteredData = [];
    // Object.values(filteredObj).map((item) => {
    //   return (filteredData = filteredData.concat(item));
    // });
    // console.log('filteredData', filteredData);
    let arr = priceFilter();
    filteredDataCallBack(arr);
    setProductStatus_(productStatus);
    setFilteredObj_(filteredObj);
    setOrderPrice_(orderPrice);
    setFiltered(arr.length > 0);
    Navigation.dismissModal(componentId);
  };
  const clearFilters = () => {
    let clearProductStatus = [
      { title: 'processed', value: false, status: 'P' },
      { title: 'complete', value: false, status: 'C' },
      { title: 'open', value: false, status: 'O' },
      { title: 'failed', value: false, status: 'F' },
      { title: 'declined', value: false, status: 'D' },
      { title: 'backordered', value: false, status: 'B' },
      { title: 'cancelled', value: false, status: 'I' },
      { title: 'awaiting_call', value: false, status: 'Y' },
    ];
    let clearFilteredObj = {
      P: [],
      C: [],
      O: [],
      F: [],
      D: [],
      B: [],
      I: [],
      Y: [],
    };
    filteredDataCallBack([]);
    setFilteredObj(clearFilteredObj);
    setProductStatus(clearProductStatus);
    setProductStatus_(clearProductStatus);
    setFilteredObj_(clearFilteredObj);
    setOrderPrice({
      min: 0,
      max: Number.POSITIVE_INFINITY,
    });
    setOrderPrice_({
      min: 0,
      max: Number.POSITIVE_INFINITY,
    });
    setFiltered(false);
  };
  useMemo(() => {
    let filteredData = [];
    Object.values(filteredObj).map((item) => {
      return (filteredData = filteredData.concat(item));
    });
    setFilteredArr(filteredData);
    return;
  }, [filteredObj]);
  useEffect(() => {
    let bool = false;
    for (i = 0; i < productStatus.length; i++) {
      let obj = productStatus[i];
      if (obj.value) {
        bool = true;
        break;
      }
      bool = false;
    }
    setFiltered(bool);
  }, [productStatus]);

  return (
    <Fragment>
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
        // endComponent={
        //   <TouchableOpacity
        //     activeOpacity={2}
        //     style={{
        //       paddingTop: 5,
        //       paddingHorizontal: 10,
        //       paddingBottom: 0,
        //       color: '#16191a',
        //     }}
        //     onPress={() => this.props.ordersActions.fetch()}>
        //     <Text style={{ fontSize: 18, fontWeight: '700', color: '#7c2981' }}>
        //       Reset
        //     </Text>
        //     {/* <Icon color="#7c2981" name="cancel" style={styles.rightArrowIcon} /> */}
        //   </TouchableOpacity>
        // }
      />
      <ScrollView>
        {/* <Dropdown
          style={styles.dropdown}
          data={data}
          search
          labelField="label"
          valueField="value"
          placeholder="Duration"
          searchPlaceholder="Search..."
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        /> */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              padding: 10,
              marginLeft: 17,
            }}>
            Orders Status
          </Text>
          <Pressable onPress={() => clearFilters()}>
            <Text
              style={{
                // width: '100%',
                // textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 17,
                textTransform: 'capitalize',
                paddingVertical: 10,
                marginHorizontal: 10,
                color: '#7c2981',
              }}>
              clear
            </Text>
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

        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              padding: 10,
              // marginLeft: 17,
              width: '95%',
              alignSelf: 'center',
            }}>
            Order Price
          </Text>
        </View>
        {/* min price */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 17,
              fontWeight: '600',
            }}>
            Minimum Price:
          </Text>
          <TextInput
            style={{ fontSize: 17, flex: 1 }}
            placeholder="Enter minimum price"
            keyboardType="numeric"
            value={orderPrice.min.toString()}
            onChangeText={(e) => setOrderPrice({ ...orderPrice, min: e })}
            onBlur={() =>
              setOrderPrice({
                ...orderPrice,
                min: orderPrice.min ? orderPrice.min : 0,
              })
            }
          />
        </View>
        {/* max price */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 17,
              fontWeight: '600',
            }}>
            Maximum Price:
          </Text>
          <TextInput
            style={{ fontSize: 17, flex: 1 }}
            placeholder="Enter maximum price"
            keyboardType="numeric"
            value={
              orderPrice.max.toString() === 'Infinity'
                ? ''
                : orderPrice.max.toString()
            }
            onChangeText={(e) =>
              setOrderPrice({
                ...orderPrice,
                max: e ? e : Number.POSITIVE_INFINITY,
              })
            }
            onBlur={() =>
              setOrderPrice({
                ...orderPrice,
                max: orderPrice.max ? orderPrice.max : 0,
              })
            }
          />
        </View>

        {/* <View
          style={{
            marginTop: -20,
            padding: 13,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: -10,
              padding: 13,
              fontSize: 17,
              fontWeight: '600',
              marginLeft: 3,
            }}>
            COD
          </Text>
          <Checkbox
            color={'#7c2981'}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View> */}

        {/* <View
          style={{
            marginTop: -20,
            padding: 13,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: -10,
              padding: 13,
              fontSize: 17,
              fontWeight: '600',
              marginLeft: 3,
            }}>
            Unpaid
          </Text>
          <Checkbox
            color={'#7c2981'}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View> */}
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
)(ProductOrder);

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
