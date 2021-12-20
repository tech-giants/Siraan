import React, { useState } from 'react';
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

function FilterOrder({ allProducts, title, componentId }) {
  const [checked, setChecked] = React.useState('first');

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);

  const [value, setValue] = useState(null);
  const data = [
    { label: 'Daily', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Monthly', value: '3' },
    { label: 'Custom', value: '4' },
    { label: 'All', value: '5' },
  ];

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
              color: '#16191a',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle="Sort Order"
        endComponent={
          <TouchableOpacity
            activeOpacity={2}
            style={{
              paddingTop: 5,
              paddingHorizontal: 10,
              paddingBottom: 0,
              color: '#16191a',
            }}
            onPress={() => this.props.ordersActions.fetch()}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#7c2981' }}>
              Reset
            </Text>
            {/* <Icon color="#7c2981" name="cancel" style={styles.rightArrowIcon} /> */}
          </TouchableOpacity>
        }
      />

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
          Order Status
        </Text>
      </View>
      <View
        style={{
          padding: 13,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            marginTop: -8,
            padding: 13,
            fontSize: 17,
            fontWeight: '600',
            marginLeft: 3,
          }}>
          New Order
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
          Accepted
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
          Deliver
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
          Completed
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
          Canceled
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
          Rejected
        </Text>
        <Checkbox
          color={'#7c2981'}
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>

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

      <Pressable>
        <Button style={styles.proceedButton}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Apply
          </Text>
        </Button>
      </Pressable>
    </>
  );
}

export default FilterOrder;
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
    padding:5,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    margin: 20,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#ccc',
  },
  icon: {
    marginRight: 5,
  },
});
