import React, { createRef } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
// Components
import MyStatusBar from '../../components/SaldiriComponents/SaldiriStatusBar';
import ActionSheet from '../../components/SaldiriComponents/ActionSheet';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DignalButton } from '../../components/SaldiriComponents/DignalButton';

const brandsActionSheetRef = createRef();
const colorActionSheetRef = createRef();
const sizeActionSheetRef = createRef();
const VendorManageFeatures = (props) => {
  const { componentId, product } = props;
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
            rightIcon
            optional
            value="Select Brands"
            label="brands"
            actionSheetRef={brandsActionSheetRef}
            body={<Text>brands body</Text>}
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
  }),
  (dispatch) => ({
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
