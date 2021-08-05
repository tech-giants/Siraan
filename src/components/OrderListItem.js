import React from 'react';
import { View, Text, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import { formatPrice } from '../utils';

const styles = EStyleSheet.create({
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 0.5,
    borderColor:'#7c2981',
    // backgroundColor:'red',
    borderRadius:1,
    padding: 20,
    shadowColor: '#7c2981',
    shadowOffset:{
    width: 0,
    height: 0.2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  orderItemEmail: {
    fontSize: '0.8rem',
    color: '#696868',
    fontWeight:'bold'
  },
  orderItemCustomer: {
    marginRight: 20,
  },
  orderItemCustomerText: {
    fontWeight: 'bold',
    color:'#7C2981',  
    fontSize:20,
  },
  orderItemStatusText: {
    
    padding:10,
    borderRadius:5,
    textAlign: 'center',
    color:'#fff',
    fontWeight:'bold',

    
  },
  orderItemTotal: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    textAlign: 'right',
    color:'#7c2981'
  },
  mainContainer:{
    // backgroundColor:'red',
    marginVertical:'10%',
    marginHorizontal:15,
    borderRadius:10,
    // backgroundColor:'red',
    // shadowColor: "#000",
    // shadowOffset:{
    // width: 0,
    // height: 0.2,
    // },
    // shadowOpacity: 0.11,
    // shadowRadius: 0.2,
    // elevation: 1,

  },
  orderNoText:{
  color:'#696868'
  },
  nameText:{
 fontSize:23,
 fontWeight:'bold',
  },
});

/**
 * Renders an order.
 *
 * @param {function} onPress - Opens an order.
 * @param {object} item - Order information.
 *
 * @return {JSX.Element}
 */
const OrderListItem = (props) => {
  const { onPress, item } = props;

  return (
    <Pressable  style={styles.mainContainer}onPress={onPress}>
      <View style={styles.orderItem}>
        <View style={styles.orderItemCustomer}>
          {/* ORDER NO */}
          <Text style={styles.orderItemCustomerText}>
               <Text>Order No:</Text>

            <Text style={styles.orderNoText}>
                #{item.order_id}
            </Text>
            
          </Text>
          {/* NAME */}
          <Text  style={styles.nameText}>
          {item.firstname} {item.lastname}
          </Text>
          {/* EMAIL */}
          <Text style={styles.orderItemEmail}>{item.email}</Text>
        </View>

        <View style={styles.orderItemStatus}>
          
          {/* TOTAL */}
          <Text style={styles.orderItemTotal}>
            {item.total_formatted
              ? formatPrice(item.total_formatted.price)
              : item.total}
          </Text>
        {/* BTN */}
        <Text
            style={[
              styles.orderItemStatusText,
              { backgroundColor: item.status_data.color },
            ]}>
            {item.status_data.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

/**
 * @ignore
 */
OrderListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.shape({
    order_id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    total_formatted: PropTypes.string,
  }),
};

export default OrderListItem;
