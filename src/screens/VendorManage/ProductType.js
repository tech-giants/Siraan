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
function ProductType({ allProducts, title, componentId }) {
  const [checked, setChecked] = React.useState('first');
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(this.props.componentId)}
            style={{
              padding: 7,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#16191a',
            }}>
            <MaterialIcons name="arrow-back" size={30} color="#7c2981" />
          </Pressable>
        }
        // midHeaderTitle="Search Product Type"
        endComponent={
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <TextInput
              style={{ width: 220, fontSize: 17 }}
              placeholder="Search Product Type"
            />
            <MaterialIcons
              style={{ padding: 8, marginLeft: 30 }}
              name="search"
              size={30}
              color="#7c2981"
            />
          </View>
        }
      />

      <View
        style={{
          borderColor: '#7c2981',
          borderBottomEndRadius: 1,
          borderWidth: 1,
        }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 12 }}>
          Frequently Used
        </Text>
        <Text
          style={{
            fontSize: 14,
            padding: 12,
            fontWeight: '600',
            marginTop: -10,
          }}>
          Outdoor Recreation
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 12 }}>
          Accessories
        </Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Automotive</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>
          Automotive & Motorbike
        </Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Baby & Toddler toys</Text>
      </View>
    </>
  );
}

export default ProductType;
const styles = StyleSheet.create({});
