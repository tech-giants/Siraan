import React from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

function AddVariants({ allProducts, title, componentId, images }) {
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [showAddDetail, setshowAddDetail] = React.useState(false);
  const [showAddStock, setshowAddStock] = React.useState(false);
  const [contactUs, setcontactUs] = React.useState(false);

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
              color: '#7c2981',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle="Add Variants"
        endComponent={
          <TouchableOpacity
            activeOpacity={2}
            style={{
              paddingTop: 5,
              paddingHorizontal: 10,
              paddingBottom: 0,
              color: '#7c2981',
            }}
            onPress={() => this.props.ordersActions.fetch()}>
            {/* <MaterialIcons name="home" size={30} color="#7c2981" /> */}
          </TouchableOpacity>
        }
      />
      <Text style={{ fontSize: 18, padding: 15 }}>Add Option</Text>
      <View style={styles.inputPlus}>
        <TextInput
          style={{ width: 250, fontSize: 18, borderColor: '#7c2981' }}
          placeholder="Option Name"
        />
        <AntDesign
          style={{
            padding: 13,
          }}
          name="plus"
          size={25}
          color="#16191a"
        />
      </View>
      <View style={styles.Divider} />

      <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold' }}>
        Suggested Options
      </Text>
      <Pressable onPress={() => nav.SizeVariants(componentId)}>
        <Text style={styles.textButtons}>Size</Text>
      </Pressable>
      <Pressable onPress={() => nav.ColorVariants(componentId)}>
        <Text style={styles.textButtons}>Color</Text>
      </Pressable>
      <Pressable onPress={() => nav.StyleVariants(componentId)}>
        <Text style={styles.textButtons}>Style</Text>
      </Pressable>
      <Pressable onPress={() => nav.MaterialVariants(componentId)}>
        <Text style={styles.textButtons}>Material</Text>
      </Pressable>
    </>
  );
}

export default AddVariants;

const styles = StyleSheet.create({
  inputPlus: {
    marginHorizontal: 15,
    // marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7c2981',
    width: '88%',
    height: 50,
    borderRadius: 5,
    borderBottomColor: '#7c2981',
  },
  Divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#7c2981',
    marginVertical: 20,
  },
  textButtons: {
    padding: 15,
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#7c2981',
  },
});
