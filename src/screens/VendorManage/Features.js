import React, { createRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import ActionSheet from '../../components/SaldiriComponents/ActionSheet';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// actions
import { fetchAllBrands } from '../../actions/featuresAction';
import BrandsShowcase from '../BrandsShowcase';

// action sheet ref
const brandsActionSheetRef = createRef();
const colorActionSheetRef = createRef();
const sizeActionSheetRef = createRef();
//
const deviceHeight = Dimensions.get('window').height;

/*
  default export function VendorManageFeatures
*/
const VendorManageFeatures = (props) => {
  // destracturing props
  const { componentId, product, features, fetchAllBrands } = props;
  // use states
  const [featuresData, setFeaturesData] = useState({
    brand: {},
    color: '',
    size: '',
  });

  useEffect(() => {
    console.log('featuresDatafeaturesData', featuresData);
  }, [featuresData]);
  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="arrow-back" size={20} color="#16191a" />
          </Pressable>
        }
        midHeaderTitle="Features"
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formWrapper}>
          {/* brands action sheet */}
          <ActionSheet
            loading={features.fetching}
            rightIcon
            optional
            value={
              featuresData.brand.variant
                ? featuresData.brand.variant
                : 'Select Brands'
            }
            label="brands"
            actionSheetRef={brandsActionSheetRef}
            body={
              <View style={{ minHeight: 500, maxHeight: deviceHeight - 150 }}>
                <BrandsShowcase
                  selectedBrand={featuresData.brand}
                  onSelect={(e) => {
                    setFeaturesData({ ...featuresData, brand: e });
                    brandsActionSheetRef.current?.setModalVisible(false);
                  }}
                  hideHeader={true}
                />
              </View>
            }
          />

          {/* color action sheet */}
          <ActionSheet
            optional
            rightIcon
            value="Select color"
            label="Color"
            actionSheetRef={colorActionSheetRef}
            body={<Text>colors body</Text>}
          />

          {/* size action sheet */}
          <ActionSheet
            optional
            rightIcon
            value="Select size"
            label="Size"
            actionSheetRef={sizeActionSheetRef}
            body={<Text>size body</Text>}
          />
          {/* save button */}
        </ScrollView>
      </View>
      <DignalButton
        onPress={() => console.log('features save button pressed!')}
        title="Save"
      />
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
    // productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(VendorManageFeatures);

const styles = EStyleSheet.create({
  formWrapper: {
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
