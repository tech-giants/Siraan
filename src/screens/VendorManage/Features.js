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
import FeaturesActionSheetBody from './FeaturesActionSheetBody';
import BrandsShowcase from '../BrandsShowcase';
// actions
import { fetchAllBrands, fetchFeatures } from '../../actions/featuresAction';

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
  const {
    componentId,
    product,
    features,
    fetchAllBrands,
    fetchFeatures,
  } = props;
  // use states
  const [featuresData, setFeaturesData] = useState({
    brand: {},
    color: {},
    size: {},
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
            hideHeader
            rightIcon
            value={
              featuresData.color.variant
                ? featuresData.color.variant
                : 'Select Color'
            }
            label="Color"
            actionSheetRef={colorActionSheetRef}
            body={
              <View style={{ minHeight: 500, maxHeight: deviceHeight - 200 }}>
                <FeaturesActionSheetBody
                  featureID={549}
                  selected={featuresData.color}
                  onSelect={(e) => {
                    setFeaturesData({ ...featuresData, color: e });
                    colorActionSheetRef.current?.setModalVisible(false);
                  }}
                />
              </View>
            }
          />

          {/* size action sheet */}
          <ActionSheet
            optional
            hideHeader
            rightIcon
            value={
              featuresData.size.variant
                ? featuresData.size.variant
                : 'Select Size'
            }
            label="Size"
            actionSheetRef={sizeActionSheetRef}
            body={
              <View style={{ minHeight: 500, maxHeight: deviceHeight - 200 }}>
                <FeaturesActionSheetBody
                  featureID={548}
                  selected={featuresData.size}
                  onSelect={(e) => {
                    setFeaturesData({ ...featuresData, size: e });
                    sizeActionSheetRef.current?.setModalVisible(false);
                  }}
                />
              </View>
            }
          />
          {/* save button */}
        </ScrollView>
      </View>
      {/* <DignalButton onPress={() => fetchFeatures(548)} title="check api 549" /> */}
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
    fetchFeatures: bindActionCreators(fetchFeatures, dispatch),
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
