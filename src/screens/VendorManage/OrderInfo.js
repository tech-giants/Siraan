import React, { useMemo, useState, useEffect, Fragment } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import Spinner from '../../components/Spinner';
import i18n from '../../utils/i18n';
import { formatPrice, getImagePath } from '../../utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ordersActions from '../../actions/vendorManage/ordersActions';
import { format } from 'date-fns';
import EStyleSheet from 'react-native-extended-stylesheet';

function OrderInfo(props) {
  const {
    order,
    fetching,
    orderId,
    settings,
    ordersActions,
    allProducts,
    title,
    componentId,
  } = props;
  console.log('orderrrr===>>>', order);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderDetailTotal, setOrderDetailTotal] = useState({
    qty: 0,
    price: 0,
  });
  const getdata = async () => {
    const data = await ordersActions.fetchOrder(orderId);
    let productsArr = order.products;
    let obj = { qty: 0, price: 0 };
    console.log('use effect productArr', productsArr[0].price);

    if (!data) {
      setTimeout(() => {
        Navigation.pop(componentId);
      });
    }
    return;
  };
  useEffect(() => {
    getdata();
    return () => null;
  }, []);
  const date = new Date(order.timestamp * 1000);
  if (fetching) {
    return (
      <View style={styles.container}>
        <Spinner visible />
      </View>
    );
  }
  return (
    <Fragment>
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
        midHeaderTitle="Order Info"
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
        //     <Icon name="refresh" style={styles.rightArrowIcon} />
        //   </TouchableOpacity>
        // }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15, flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Customer Details
          </Text>
          {/* <MaterialIcons name="create" size={25} color="#7c2981" /> */}
          {/* <MaterialIcons
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'green',
            marginLeft: 20,
            width: '12%',
            height: 40,
            marginTop: -5,
          }}
          name="local-phone"
          size={30}
          color="#7c2981"
        />
        <Ionicons
        style={{
          padding: 5,
          borderWidth: 1,
            borderRadius: 5,
            borderColor: 'green',
            marginLeft: 10,
            height: 40,
            marginTop: -5,
            width: '12%',
          }}
          name="logo-whatsapp"
          size={30}
          color="#7c2981"
          />
        <FontAwesome5
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'green',
            marginLeft: 10,
            height: 40,
            marginTop: -5,
            width: '12%',
          }}
          name="sms"
          size={30}
          color="#7c2981"
        /> */}
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <MaterialIcons name="person-outline" size={30} color="#7c2981" />
          <Text style={{ fontSize: 17, padding: 7 }}>
            {order.s_firstname && order.s_lastname
              ? `${order.s_firstname} ${order.s_lastname}`
              : `${order.b_firstname} ${order.b_lastname}`}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Ionicons name="logo-whatsapp" size={30} color="#7c2981" />
          <Text style={{ fontSize: 17, padding: 7 }}>{order.phone}</Text>
        </View>

        <View
          style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <Ionicons name="location-outline" size={30} color="#7c2981" />
            <Text
              style={{
                fontSize: 17,
                padding: 7,
                color: 'green',
                width: '90%',
              }}>
              {order.s_address || order.b_address}
            </Text>
          </View>
          {/* <Ionicons name="share-social" size={25} color="#7c2981" /> */}
        </View>

        {/* <View style={{ flexDirection: 'row', marginLeft: 10 }}>
        <Feather name="codesandbox" size={30} color="#7c2981" />
        <Text style={{ fontSize: 17, padding: 7 }}>
          Delivery By Store Itself
          </Text>
        </View> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold' }}>
            Order Status
          </Text>
          <Pressable
          // onPress={() => nav.OrderStatus(componentId)}
          >
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#7c2981',
                width: 140,
                height: 30,
                borderRadius: 7,
                marginRight: 10,
                marginTop: 5,
              }}>
              <Text
                style={{
                  padding: 3,
                  fontSize: 15,
                  color: '#7c2981',
                }}>
                {order.status_data.description}
              </Text>
              {/* <AntDesign
              style={{
                padding: 5,
              }}
              name="caretdown"
              size={15}
              color="#7c2981"
            /> */}
            </View>
          </Pressable>
        </View>

        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7c2981' }}>
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              fontWeight: 'bold',
              borderBottomWidth: 0.5,
              borderBottomColor: '#7c2981',
            }}>
            Order Detail
          </Text>

          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                {/* <View style={{ backgroundColor: 'red' }}>
                <Text
                  style={{
                    // fontSize: 15,
                    color: '#000',
                    marginBottom: 5,
                    fontWeight: 'bold',
                  }}>
                  Order ID : {order.order_id}
                </Text>
                <Text style={{ fontSize: 14, color: '#000', marginBottom: 5 }}>
                  {i18n.t('Placed on')} {format(date, settings.dateFormat)}{' '}
                </Text>
              </View> */}
                <Text style={styles.productItemTableHeader}>Product</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.productItemTableHeader}>Qty</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.productItemTableHeader}>Amount</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.productItemTableHeader}>Total</Text>
              </DataTable.Cell>
            </DataTable.Row>

            {order.products.map((item, index) => {
              // setOrderDetailTotal({
              //   qty: item.amount,
              //   price: item.price,
              // });
              return (
                <DataTable.Row>
                  <DataTable.Cell>
                    {/* {item.product} */}
                    {renderProduct(item, index)}
                    {/* <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{
                          resizeMode: 'contain',
                          height: 40,
                          width: 40,
                          // borderRadius: 10,
                          // borderWidth: 1,
                          borderColor: '#ccc',
                        }}
                        source={require('../../assets/pakistan.png')}
                      />
                      <View>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            marginLeft: 5,
                          }}>
                          Nature
                        </Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 15,
                            marginLeft: 5,
                          }}>
                          1
                        </Text>
                      </View>
                    </View> */}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {formatPrice(item.price_formatted.price)}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    Rs. {item.amount * item.price}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Row>
              <DataTable.Cell>Total</DataTable.Cell>
              <DataTable.Cell numeric></DataTable.Cell>
              <DataTable.Cell numeric></DataTable.Cell>
              <DataTable.Cell numeric>Rs. {order.subtotal}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold' }}>
            Net Amount
          </Text>
          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold' }}>
            {formatPrice(order.total_formatted.price)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold' }}>
            Payment Method
          </Text>
          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold' }}>
            {order.payment_method.payment}
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: '#7c2981',
            borderBottomWidth: 1,
            width: '100%',
          }}>
          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold' }}>
            Source
          </Text>
          <Text
            style={{
              padding: 10,
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            Organic
          </Text>
        </View> */}
      </ScrollView>
    </Fragment>
  );
}

export default connect(
  (state) => ({
    order: state.vendorManageOrders.current,
    fetching: state.vendorManageOrders.loadingCurrent,
    settings: state.settings,
  }),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(OrderInfo);
//  render product cell in detail tabel
const renderProduct = (item, index) => {
  let productImage = null;
  const imageUri = getImagePath(item);

  if (imageUri) {
    productImage = (
      <Image source={{ uri: imageUri }} style={styles.productItemImage} />
    );
  }

  return (
    <Text style={styles.productItemName} numberOfLines={1}>
      {/* {productImage} */}
      {item.product}
    </Text>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  productItemTableHeader: {
    fontWeight: 'bold',
  },
  productItemImage: {
    width: 40,
    height: 40,
  },
  productItemName: {
    // fontSize: '0.9rem',
    color: 'black',
    // marginBottom: 5,
    // fontWeight: 'bold',
    textAlign: 'left',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
    textAlign: 'left',
  },
});
