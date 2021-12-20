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
import { Button, DataTable, RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RadioGroup from '../../components/SaldiriComponents/RadioGroup';
function OrderSortBy(props) {
  let { componentId, ordersList, setsortBy_, sortBy_, setRenderOrders } = props;
  const [sortBy, setsortBy] = useState(sortBy_);
  // sort by price buttons
  let SBPbuttons = [
    {
      name: 'sort_price',
      label: 'Max first',
      value: 'desc',
      id: 'sort_price_desc',
    },
    {
      name: 'sort_price',
      label: 'Min first',
      value: 'asce',
      id: 'sort_price_asce',
    },
  ];
  // sort by time buttons
  let SBTbuttons = [
    {
      name: 'sort_time',
      label: 'new first',
      value: 'desc',
      id: 'sort_time_desc',
    },
    {
      name: 'sort_time',
      label: 'old first',
      value: 'asce',
      id: 'sort_time_asce',
    },
  ];
  // sort by time buttons
  let SBIbuttons = [
    {
      name: 'sort_id',
      label: 'Max first',
      value: 'desc',
      id: 'sort_id_desc',
    },
    { name: 'sort_id', label: 'Min first', value: 'asce', id: 'sort_id_asce' },
  ];
  const showResultHandler = () => {
    let sortedArr = [];
    if (sortBy.name) {
      let sortByName = sortBy.name;
      let sortValue = sortBy.value;
      let sortKey = '';
      if (sortByName === 'sort_time') {
        sortKey = 'timestamp';
      }
      if (sortByName === 'sort_price') {
        sortKey = 'total';
      }
      if (sortByName === 'sort_id') {
        sortKey = 'order_id';
      }
      sortedArr = ordersList.sort(function (first, second) {
        let x = first[sortKey];
        let y = second[sortKey];
        return sortValue === 'asce' ? x - y : y - x;
      });
      console.log('showresult sorted arr', sortedArr);
    }
    setRenderOrders(sortedArr);
    setsortBy_(sortBy);
    Navigation.dismissModal(componentId);
  };
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
        midHeaderTitle="Sort Orders"
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
        //     <Icon color="#7c2981" name="cancel" style={styles.rightArrowIcon} />
        //   </TouchableOpacity>
        // }
      />
      <ScrollView>
        <View style={styles.contentWrapper}>
          {/* section 1 - sort by time */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>sort by time</Text>
            <RadioGroup
              selectedId={sortBy.id}
              onSelect={(e) => setsortBy(e)}
              list={SBTbuttons}
            />
          </View>
          {/* section 2 - sort by price */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>sort by price</Text>
            <RadioGroup
              selectedId={sortBy.id}
              onSelect={(e) => setsortBy(e)}
              list={SBPbuttons}
            />
          </View>
          {/* section 3 - sort by id */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>sort by id</Text>
            <RadioGroup
              selectedId={sortBy.id}
              onSelect={(e) => setsortBy(e)}
              list={SBIbuttons}
            />
          </View>
        </View>
      </ScrollView>

      <Pressable onPress={() => showResultHandler()}>
        <Button style={styles.proceedButton}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Show Result
          </Text>
        </Button>
      </Pressable>
    </>
  );
}

export default OrderSortBy;
const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  proceedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c2981',
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  section: {
    // backgroundColor: 'red',
    width: '100%',
    marginVertical: 5,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginVertical: 15,
  },
});
