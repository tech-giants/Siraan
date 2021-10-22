import React, { createRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import SaldiriTextInput from '../components/SaldiriComponents/SaldiriTextInput';
import SaldiriPhoneInput from '../components/SaldiriComponents/SaldiriPhoneInput';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import SaldiriDatePicker from '../components/SaldiriComponents/SaldiriDatePicker';
import { DignalButton } from '../components/SaldiriComponents/DignalButton';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import ActionSheet from '../components/SaldiriComponents/ActionSheet';
import CountriesActionSheetBody from '../components/CountriesActionSheetBody';
import HtmlEditor from '../components/SaldiriComponents/HtmlEditor/HtmlEditor';
import { createSellerProfile } from '../actions/vendorManage/becomeASeller';
//
const countriesActionSheetRef = createRef();
//

const BecomeSeller = (props) => {
  const { createSellerProfile } = props;
  const [validationMessage, setValidationMessage] = useState('');
  const [formData, setFormData] = useState({
    company: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    cnicExpiry: '',
    city: '',
    country: {},
    postal: '',
    province: '',
    cnic: '',
    phone: {},
    plan: '',
    companyDesc: '',
  });
  // destracturing form data fields from state
  const {
    company,
    firstname,
    lastname,
    email,
    address,
    cnicExpiry,
    city,
    country,
    postal,
    province,
    cnic,
    phone,
    plan,
    companyDesc,
  } = formData;
  //
  useEffect(() => {
    console.log('form data \n ===>>>>>>>>>>>>>>>', formData);
  }, [formData]);
  const handleSave = () => {
    const data = {
      company: company,
      company_description: companyDesc,
      storefront: 'https://siraan.com/',
      status: 'N',
      lang_code: 'en',
      email: email,
      phone: phone.mobileNumber,
      // url: 'http://example.com',
      // fax: '+555555555',
      address: address,
      city: city,
      state: province,
      country: country.code,
      zipcode: postal,
      pre_moderation: 'Y',
      pre_moderation_edit: 'Y',
      pre_moderation_edit_vendors: 'N',
      // categories: '253,252',
      // shippings: {
      //   1: '1',
      //   2: '3',
      // },
      // commission: '10.55',
      // commission_type: 'A',
      // terms:
      //   '<p>These are the terms and conditions you must accept before you can buy products from New Vendor.</p>',
    };

    if (
      company &&
      firstname &&
      lastname &&
      address &&
      email &&
      cnicExpiry &&
      cnic &&
      phone.number &&
      country.name &&
      province &&
      city &&
      postal
    ) {
      // console.log('form inputed data ...', data, props.componentId);
      createSellerProfile(data, props.componentId);
    } else {
      handleValidationMessage();
    }
  };
  const handleValidationMessage = () => {
    setValidationMessage('please fill all required fields.');
    setTimeout(() => {
      setValidationMessage('');
    }, 2500);
  };
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(props.componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="arrow-back" size={20} color="#16191a" />
          </Pressable>
        }
        midHeaderTitle="Become a seller"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        <SaldiriTextInput
          type="text"
          label="company"
          keyboardType="default"
          onChangeText={(e) => setFormData({ ...formData, company: e })}
          value={company}
          placeholder="Enter company name"
          //   show_error={true}
        />
        <HtmlEditor
          type="text"
          label="description"
          onChangeHtml={(e) => setFormData({ ...formData, companyDesc: e })}
          // value={description}
          value={companyDesc}
          optional={true}
          placeholder="Enter company description"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // backgroundColor: '#fff',
            // padding:10,
          }}>
          <SaldiriTextInput
            label="first name"
            onChangeText={(e) => setFormData({ ...formData, firstname: e })}
            value={firstname}
            placeholder="First Name"
            w50={true}
          />
          <SaldiriTextInput
            label="last name"
            onChangeText={(e) => setFormData({ ...formData, lastname: e })}
            value={lastname}
            placeholder="Last Name"
            w50={true}
          />
        </View>
        {/* email */}
        <SaldiriTextInput
          type="email"
          label="email"
          keyboardType="email-address"
          onChangeText={(e) => setFormData({ ...formData, email: e })}
          value={email}
          placeholder="Enter your email address"
          show_error={true}
        />
        {/* address */}
        <SaldiriTextInput
          type="text"
          label="address"
          // optional={true}
          onChangeText={(e) => setFormData({ ...formData, address: e })}
          value={address}
          placeholder="Enter address"
          //   show_error={true}
        />
        {/* cnic expiery */}
        <SaldiriDatePicker
          callBack={(e) => setFormData({ ...formData, cnicExpiry: e })}
          label="C n i c expiry"
        />
        {/* city */}
        <SaldiriTextInput
          type="text"
          label="city"
          // optional={true}
          onChangeText={(e) => setFormData({ ...formData, city: e })}
          value={city}
          placeholder="Enter city name"
          //   show_error={true}
        />
        {/* country */}
        {/* color action sheet */}
        <ActionSheet
          hideHeader
          rightIcon
          value={country.name ? country.name : 'Select Country'}
          label="Country"
          actionSheetRef={countriesActionSheetRef}
          body={
            <CountriesActionSheetBody
              selected={country}
              onSelect={(e) => {
                setFormData({ ...formData, country: e });
                countriesActionSheetRef.current?.setModalVisible(false);
              }}
            />
          }
        />
        {/* <SaldiriTextInput
          type="text"
          label="country"
          // optional={true}
          onChangeText={(e) => setFormData({ ...formData, country: e })}
          value={country}
          placeholder="Enter country name"
          //   show_error={true}
        /> */}
        {/* province */}
        <SaldiriTextInput
          type="text"
          label="State /Province"
          onChangeText={(e) => setFormData({ ...formData, province: e })}
          value={province}
          placeholder="Enter State /Province"
          //   show_error={true}
        />
        {/* postal */}
        <SaldiriTextInput
          type="text"
          label="Zip /Postal code"
          // optional={true}
          onChangeText={(e) => setFormData({ ...formData, postal: e })}
          keyboardType="number-pad"
          value={postal}
          placeholder="Enter postal name"
          //   show_error={true}
        />
        {/* cnic */}
        <SaldiriTextInput
          type="text"
          label="C N I C"
          onChangeText={(e) => setFormData({ ...formData, cnic: e })}
          keyboardType="number-pad"
          value={cnic}
          placeholder="Enter postal name"
          //   show_error={true}
        />
        {/* phone */}
        <SaldiriPhoneInput
          label="phone"
          callBack={(e) => setFormData({ ...formData, phone: e })}
        />
        {/* {props.spinnerCondition ? (
          <View style={styles.btn}>
            <ActivityIndicator size={20} color="#fff" />
          </View>
        ) : (
          <>
            <Pressable
              style={styles.btn}
              // onPress={() => nav.pushRegistration(this.props.componentId)}
              onPress={() => {
                email &&
                firstname &&
                lastname &&
                password1 &&
                password2 &&
                phone.mobileNumber
                  ? handleRegisterBtnPress()
                  : emptyFieldsHandler();
              }}>
              <Text style={styles.btnText}>Sign Up</Text>
            </Pressable>
            {signupPressMsg === '' ? null : (
              <View
                style={{
                  marginVertical: 5,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.SaldiriTextInputMessage,
                    fontStyle: 'italic',
                    // color:  'red',
                    textTransform: 'lowercase',
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  {signupPressMsg}
                </Text>
              </View>
            )}
          </>
        )} */}
      </ScrollView>
      <DignalButton
        validationMessage={validationMessage}
        onPress={handleSave}
        title="Create Account"
      />
    </>
  );
};
export default connect(
  (state) => ({
    auth: state.auth,
    settings: state.settings,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    createSellerProfile: bindActionCreators(createSellerProfile, dispatch),
  }),
)(BecomeSeller);
