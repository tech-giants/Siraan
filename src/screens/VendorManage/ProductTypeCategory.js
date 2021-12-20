import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import { getCategoriesList } from '../../services/vendors';
import { ca } from 'date-fns/locale';

function ProductTypeCategory(props) {
  const { allProducts, title, componentId, setSelectd } = props;
  console.log('setSelectd', props);
  const [checked, setChecked] = useState('first');
  const [categories, setCategories] = useState({
    loading: false,
    data: [],
    hasMore: true,
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [parent_id, setParent_id] = useState(0);
  const handleLoadCategories = async (page = 1) => {
    setCategories({
      ...categories,
      loading: true,
      data: [],
    });
    try {
      const response = await getCategoriesList(parent_id, page);
      console.log('categories responses', response.data.categories);
      if (response.data.categories.length > 0) {
        setCategories({
          ...categories,
          loading: false,
          data: response.data.categories,
        });
      } else {
        setSelectd({ selectedOptions, parent_id });
        Navigation.dismissModal(componentId);
      }
    } catch (error) {
      console.log('categories catch errorerrorerror', error);
      setCategories({
        ...categories,
        loading: false,
        data: [],
      });
    }
  };
  console.log(
    'categories parent_id',
    parent_id,
    'selectedOptions==>',
    selectedOptions,
  );
  const setSelectedOptionsHandler = (e) => {
    setParent_id(e.category_id);
    setSelectedOptions([...selectedOptions, e]);
  };

  useEffect(() => {
    handleLoadCategories();
  }, []);
  // load categories on press
  useMemo(() => {
    handleLoadCategories();
  }, [parent_id]);

  if (categories.loading) {
    return <Spinner visible />;
  }

  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.dismissModal(componentId)}
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
        midHeaderTitle="Select Categories"
        endComponent={
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            {/* <TextInput
              style={{ width: '90%', fontSize: 17 }}
              placeholder="Search Category"
            />
            <MaterialIcons
              style={{ padding: 8 }}
              name="search"
              size={30}
              color="#7c2981"
            /> */}
          </View>
        }
      />
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={categories.data}
        keyExtractor={(item) => `${item.category_id}`}
        numColumns={1}
        key={1}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemWrapper}
            onPress={() => setSelectedOptionsHandler(item)}>
            <Text style={styles.itemText}>{item.category}</Text>
          </Pressable>
        )}
        // onEndReachedThreshold={1}
        // onEndReached={() => this.handleLoadMore()}
        // ListEmptyComponent={() => this.renderEmptyList()}
      />
      {/* <View>
        <Text style={{ fontSize: 15, padding: 12 }}>Choose Category</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Automotive</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Camping & Hiking</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Baby & Toddler toys</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>cycle Accessories</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Other Activities</Text>
        <Text style={{ fontSize: 15, padding: 12 }}>Other</Text>
      </View> */}
    </>
  );
}

export default ProductTypeCategory;
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$grayColor',
  },
  scrollContainer: {
    paddingBottom: 14,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#7c2981',
  },
  itemText: {
    paddingLeft: 14,
  },
});
