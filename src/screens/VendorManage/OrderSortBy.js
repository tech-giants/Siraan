import React from 'react';
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
import { Button, DataTable, RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
function OrderSortBy({ allProducts, title, componentId }) {
  const [checked, setChecked] = React.useState('first');
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
        midHeaderTitle="Order Sort By"
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
            <Icon color="#7c2981" name="cancel" style={styles.rightArrowIcon} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View
          style={{
            padding: 13,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: -10,
              padding: 13,
              fontSize: 20,
              fontWeight: '600',
              marginLeft: 3,
            }}>
            Newest Order First
          </Text>
          <RadioButton
            color="#7c2981"
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
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
              fontSize: 21,
              fontWeight: '600',
              marginLeft: 3,
            }}>
            Largest Order First
          </Text>
          <RadioButton
            color="#7c2981"
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
        </View>
      </ScrollView>

      <Pressable>
        <Button style={styles.proceedButton}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Continue
          </Text>
        </Button>
      </Pressable>
    </>
  );
}

export default OrderSortBy;
const styles = StyleSheet.create({
  proceedButton: {
    marginBottom: 30,
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
