import React, { createRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
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
import * as productsActions from '../../actions/vendorManage/productsActions';
import Spinner from '../../components/Spinner';

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
    productsActions,
    isUpdating,
    featuresDataCallBack,
    selectedData,
  } = props;
  // use states
  const [featuresData, setFeaturesData] = useState({
    brand: {},
    color: {},
    size: {},
  });
  useEffect(() => {
    if (selectedData) {
      setFeaturesData(selectedData);
    }
  }, []);
  useEffect(() => {
    if (!featuresDataCallBack) {
      product.product_features.map((item) => {
        console.log('item.feature_id', item.feature_id == 18);
        if (item.feature_id == 18) {
          console.log('inside brand');
          featuresData['brand'] = item;
          var a = JSON.parse(JSON.stringify(featuresData));
          // console.log('settings this ', { ...featuresData, brand: a });
          setFeaturesData(a);
        } else if (item.feature_id == 548) {
          featuresData['size'] = item;
          var b = JSON.parse(JSON.stringify(featuresData));
          setFeaturesData(b);
        } else if (item.feature_id == 549) {
          // var c = JSON.parse(JSON.stringify(item));
          featuresData['color'] = item;
          var c = JSON.parse(JSON.stringify(featuresData));
          setFeaturesData(c);
          // setFeaturesData({ ...featuresData, color: c });
        }
      });
    }
    return;
  }, []);
  // useEffect(() => {
  //   product.product_features.map((item) => {
  //     console.log('item.feature_id', item.feature_id);
  //     if (item.feature_id === 18) {
  //       return setFeaturesData({ ...featuresData, brand: item });
  //     }
  //     if (item.feature_id === 548) {
  //       return setFeaturesData({ ...featuresData, size: item });
  //     }
  //     if (item.feature_id === 549) {
  //       return setFeaturesData({ ...featuresData, color: item });
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   console.log('featuresDatafeaturesData', featuresData);
  //   console.log(
  //     'featuresDatafeaturesData featuresDataCallBack',
  //     featuresDataCallBack,
  //   );
  // }, [featuresData]);

  const handleSave = () => {
    // const arrData=[]
    const newFeatures = [
      {
        feature_id: '18',
        variant_id: featuresData.brand.variant_id
          ? featuresData.brand.variant_id
          : '',
      },
      {
        feature_id: '548',
        variant_id: featuresData.size.variant_id
          ? featuresData.size.variant_id
          : '',
      },
      {
        feature_id: '549',
        variant_id: featuresData.color.variant_id
          ? featuresData.color.variant_id
          : '',
      },
    ];
    // if (featuresData.brand.variant) {
    // arrData.push({
    //   feature_id: '18',
    //   variant_id: featuresData.brand.variant_id,
    //  });
    // }
    // if (featuresData.size.variant) {
    //   arrData.push({
    //     feature_id: '548',
    //     variant_id: featuresData.size.variant_id,
    //    });
    // }
    // if (featuresData.color.variant) {
    //   arrData.push({
    //     feature_id: '549',
    //     variant_id: featuresData.color.variant_id,
    //     });
    // }
    const data = {
      // product_features: arrData,
      product_features: newFeatures,
      product_id: product.product_id,
    };
    if (featuresDataCallBack) {
      featuresDataCallBack(featuresData);
      Navigation.pop(componentId);
    } else {
      productsActions.updateFeatures(data);
    }
    console.log('dataToSenddataToSend', data);
  };

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
            onCrossPress={
              featuresData.brand.variant
                ? () => setFeaturesData({ ...featuresData, brand: {} })
                : false
            }
            loading={features.fetching}
            rightIcon
            hideHeader
            optional
            value={
              featuresData.brand.variant
                ? featuresData.brand.variant
                : 'Select Brands'
            }
            label="brands"
            actionSheetRef={brandsActionSheetRef}
            body={
              <BrandsShowcase
                selectedBrand={featuresData.brand}
                onSelect={(e) => {
                  e.variant_id == featuresData.brand.variant_id
                    ? setFeaturesData({ ...featuresData, brand: {} })
                    : (setFeaturesData({ ...featuresData, brand: e }),
                      brandsActionSheetRef.current?.setModalVisible(false));
                }}
                hideHeader={true}
              />
            }
          />

          {/* color action sheet */}
          <ActionSheet
            onCrossPress={
              featuresData.color.variant
                ? () => setFeaturesData({ ...featuresData, color: {} })
                : false
            }
            loading={features.fetchingColors}
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
              <FeaturesActionSheetBody
                featureID={549}
                selected={featuresData.color}
                onSelect={(e) => {
                  e.variant_id == featuresData.color.variant_id
                    ? setFeaturesData({ ...featuresData, color: {} })
                    : (setFeaturesData({ ...featuresData, color: e }),
                      colorActionSheetRef.current?.setModalVisible(false));
                }}
              />
            }
          />

          {/* size action sheet */}
          <ActionSheet
            onCrossPress={
              featuresData.size.variant
                ? () => setFeaturesData({ ...featuresData, size: {} })
                : false
            }
            optional
            loading={features.fetchingSizes}
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
              <FeaturesActionSheetBody
                featureID={548}
                selected={featuresData.size}
                onSelect={(e) => {
                  e.variant_id == featuresData.size.variant_id
                    ? setFeaturesData({ ...featuresData, size: {} })
                    : (setFeaturesData({ ...featuresData, size: e }),
                      sizeActionSheetRef.current?.setModalVisible(false));
                }}
              />
            }
          />
          {/* save button */}
        </ScrollView>
      </View>
      {/* <DignalButton onPress={() => fetchFeatures(548)} title="check api 549" /> */}
      <DignalButton onPress={handleSave} title="Save" />
      {isUpdating && <Spinner visible mode="modal" />}
    </>
  );
};
export default connect(
  (state) => ({
    product: state.vendorManageProducts.current,
    isUpdating: state.vendorManageProducts.updating,
    features: state.features,
  }),
  (dispatch) => ({
    fetchAllBrands: bindActionCreators(fetchAllBrands, dispatch),
    fetchFeatures: bindActionCreators(fetchFeatures, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(VendorManageFeatures);

const styles = EStyleSheet.create({
  formWrapper: {
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
