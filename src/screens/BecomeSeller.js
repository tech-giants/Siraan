import React, { useState, useEffect } from 'react';
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

const BecomeSeller = (props) => {
  const [formData, setFormData] = useState({
    company: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    cnicExpiry: '',
    city: '',
    country: '',
    postal: '',
    province: '',
    cnic: '',
    phone: '',
    plan: '',
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
  } = formData;
  //
  useEffect(() => {
    console.log('form data \n ===>>>>>>>>>>>>>>>', formData);
  }, [formData]);
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
          optional={true}
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
          optional={true}
          onChangeText={(e) => setFormData({ ...formData, city: e })}
          value={city}
          placeholder="Enter city name"
          //   show_error={true}
        />
        {/* country */}
        <SaldiriTextInput
          type="text"
          label="country"
          optional={true}
          onChangeText={(e) => setFormData({ ...formData, country: e })}
          value={country}
          placeholder="Enter country name"
          //   show_error={true}
        />
        {/* province */}
        <SaldiriTextInput
          type="text"
          label="State /Province"
          optional={true}
          onChangeText={(e) => setFormData({ ...formData, country: e })}
          value={country}
          placeholder="Enter country name"
          //   show_error={true}
        />
        {/* postal */}
        <SaldiriTextInput
          type="text"
          label="Zip /Postal code"
          optional={true}
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
    </>
  );
};

export default BecomeSeller;
