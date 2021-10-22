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
import SaldiriTextInput from '../../components/SaldiriComponents/SaldiriTextInput';
import EmptyList from '../../components/EmptyList';
// actions
import { fetchAllBrands, fetchFeatures } from '../../actions/featuresAction';

const ColorsActionSheetBody = (props) => {
  const { fetchFeatures, features, onSelect, selected, featureID } = props;
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const sorted = (e) => {
    return e.sort((a, b) => (a.variant > b.variant ? 1 : -1));
  };

  useEffect(() => {
    setData([]);
    if (featureID === 548) {
      if (features.sizes.length < 1) {
        fetchFeatures(548);
      } else {
        setRawData(sorted(features.sizes));
      }
    }
    if (featureID === 549) {
      if (features.colors.length < 1) {
        fetchFeatures(549);
      } else {
        setRawData(sorted(features.colors));
      }
    }
  }, []);
  // initial values without filtration
  const initialValues = () => {
    if (featureID === 548) {
      if (!features.fetchingSizes && features.sizes.length > 0) {
        setData(sorted(features.sizes));
        setRawData(sorted(features.sizes));
      }
    }
    if (featureID === 549) {
      if (!features.fetchingColors && features.colors.length > 0) {
        setData(sorted(features.colors));
        setRawData(sorted(features.colors));
      }
    }
  };
  //
  useEffect(() => {
    initialValues();
  }, [features]);
  //
  useEffect(() => {
    if (filterText) {
      const filtered = rawData.filter((element) => {
        let elementVariant = element.variant.toLowerCase();
        let string = filterText.toLowerCase();
        return elementVariant.includes(string);
      });
      setData(filtered);
    } else {
      initialValues();
    }
  }, [filterText]);

  if (featureID === 548 && features.fetchingSizes) {
    return <ActivityIndicator size={30} color="#16191a" />;
  }
  if (featureID === 549 && features.fetchingColors) {
    return <ActivityIndicator size={30} color="#16191a" />;
  }
  return (
    <>
      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <SaldiriTextInput
          optional
          type="text"
          label={featureID === 548 ? 'size' : 'color'}
          // keyboardType="email-address"
          onChangeText={(e) => setFilterText(e)}
          value={filterText}
          placeholder="Find"
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
                      {item.variant}
                    </Text>
                    {selected.variant_id == item.variant_id ? (
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#00db00"
                      />
                    ) : null}
                  </View>
                  {i == data.length - 1 ? null : (
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
    fetchAllBrands: bindActionCreators(fetchAllBrands, dispatch),
    fetchFeatures: bindActionCreators(fetchFeatures, dispatch),
  }),
)(ColorsActionSheetBody);
