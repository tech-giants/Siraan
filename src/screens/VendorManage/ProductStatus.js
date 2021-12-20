import React from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button, DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
function ProductStatus({ allProducts, title, componentId }) {
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
            <MaterialIcons name="arrow-back" size={25} color="#16191a" />
          </Pressable>
        }
        midHeaderTitle="Product Status"
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
            <Icon name="refresh" style={styles.rightArrowIcon} />
          </TouchableOpacity>
        }
      />

      <View style={styles.mainView}>
        <View>
          <Text style={{ padding: 5, fontSize: 18, fontWeight: 'bold' }}>
            Product Status
          </Text>
        </View>

        <Text style={{ padding: 5, fontSize: 18, fontWeight: '600' }}>
          New Product
        </Text>
        <Text style={{ padding: 5, fontSize: 18, fontWeight: '600' }}>
          Accepted
        </Text>
        <Text style={{ padding: 5, fontSize: 18, fontWeight: '600' }}>
          Deliver
        </Text>
        <Text style={{ padding: 5, fontSize: 18, fontWeight: '600' }}>
          Completed
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ padding: 5, fontSize: 18, fontWeight: '600' }}>
            Canceled
          </Text>
          <AntDesign
            style={{
              padding: 3,
            }}
            name="check"
            size={18}
            color="#7c2981"
          />
        </View>

        <Text style={{ padding: 5, fontSize: 18, fontWeight: '600' }}>
          Rejected
        </Text>
      </View>

      
      <Pressable>
        <Button style={styles.proceedButton}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Proceed
          </Text>
        </Button>
      </Pressable>
    </>
  );
}

export default ProductStatus;
const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
    marginLeft: 18,
    padding: 10,
    width: '90%',
    height: 260,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
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
});
