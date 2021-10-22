import React, { createRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// components
import SaldiriTextInput from './SaldiriComponents/SaldiriTextInput';
import EmptyList from './EmptyList';
//
import countries from '../constants/Countries';

const CountriesActionSheetBody = (props) => {
  const { onSelect, selected, featureID } = props;
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const sorted = (e) => {
    return e.sort((a, b) => (a.name > b.name ? 1 : -1));
  };
  useEffect(() => {
    if (data.length < 1) {
      setData(countries);
    }
  }, []);
  useEffect(() => {
    if (filterText) {
      const filtered = countries.filter((element) => {
        let elementVariant = element.name.toLowerCase();
        let string = filterText.toLowerCase();
        return elementVariant.includes(string);
      });
      setData(sorted(filtered));
    } else {
      setData(countries);
    }
  }, [filterText]);

  return (
    <>
      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <SaldiriTextInput
          optional
          type="text"
          label={'countries'}
          // keyboardType="email-address"
          onChangeText={(e) => setFilterText(e)}
          value={filterText}
          placeholder="Find by name"
        />
      </View>
      {data.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data.map((item, i) => {
            return (
              <>
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.4}
                  style={{ padding: 5, width: '90%' }}
                  onPress={() => onSelect(item)}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, flex: 1 }} key={i}>
                      {item.name}
                    </Text>
                    {selected && selected.name === item.name ? (
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#00db00"
                      />
                    ) : null}
                  </View>
                  {i === data.length - 1 ? null : (
                    <View
                      style={{
                        width: '100%',
                        borderBottomWidth: 1,
                        borderColor: '#7c2981',
                        marginVertical: 2,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView>
          <EmptyList />
        </ScrollView>
      )}
    </>
  );
};
export default connect(
  (state) => ({
    product: state.vendorManageProducts.current,
    features: state.features,
  }),
  (dispatch) => ({
    // fetchAllBrands: bindActionCreators(fetchAllBrands, dispatch),
    // fetchFeatures: bindActionCreators(fetchFeatures, dispatch),
  }),
)(CountriesActionSheetBody);
