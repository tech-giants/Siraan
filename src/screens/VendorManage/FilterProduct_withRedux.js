import React, { useState, useMemo } from 'react';
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
  const { componentId, filterStatus, ordersActions } = props;
  const setProductStatusHanlder = (obj, index) => {
    ordersActions.setFilterOrderStatus({ obj, index });
  };
  const [value, setValue] = useState(null);
  const data = [
    { label: 'Daily', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Monthly', value: '3' },
    { label: 'Custom', value: '4' },
    { label: 'All', value: '5' },
  ];
  const [checked, setChecked] = useState('first');
  const showResultHandler = () => {
    Navigation.dismissModal(componentId);
  };
  console.log('ordersReducer filterStatus ', filterStatus);
  return (
    <>
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
        midHeaderTitle="Filter Product"
        endComponent={
          <TouchableOpacity
            activeOpacity={2}
            style={{
              paddingTop: 5,
              paddingHorizontal: 10,
              paddingBottom: 0,
              color: '#16191a',
            }}
            // onPress={() => this.props.ordersActions.fetch()}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#7c2981' }}>
              Reset
            </Text>
            {/* <Icon color="#7c2981" name="cancel" style={styles.rightArrowIcon} /> */}
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <Dropdown
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
        />

        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              padding: 10,
              marginLeft: 17,
            }}>
            Product Status
          </Text>
        </View>
        {filterStatus.map((item, index) => {
          const { title, value } = item;
          
          return (
            <Pressable
              key={index}
              onPress={() =>
                setProductStatusHanlder({ ...item, value: !value }, index)
              }
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
              marginLeft: 17,
            }}>
            Payment Status
          </Text>
        </View>

        <View
          style={{
            marginTop: -20,
            padding: 13,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: -5,
              padding: 13,
              fontSize: 17,
              fontWeight: '600',
              marginLeft: 3,
            }}>
            Paid
          </Text>
          <Checkbox
            color={'#7c2981'}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>

        <View
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
        </View>

        <View
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
        </View>
      </ScrollView>
      <Pressable onPress={showResultHandler}>
        <Button style={styles.proceedButton}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Show Results
          </Text>
        </Button>
      </Pressable>
    </>
  );
}

export default connect(
  (state) => ({
    filterStatus: state.vendorManageOrders.filterStatus,
  }),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(ProductOrder);
const styles = StyleSheet.create({
  proceedButton: {
    marginTop: 20,
    marginLeft: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c2981',
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
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
