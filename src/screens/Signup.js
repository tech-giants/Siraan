import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import SaldiriTextInput from '../components/SaldiriComponents/SaldiriTextInput';
import {
  AlertBox,
  AndroidToast,
} from '../components/SaldiriComponents/SaldiriMessagesComponents';
import SaldiriPhoneInput from '../components/SaldiriComponents/SaldiriPhoneInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

const Signup = (props) => {
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [email, setemail] = useState(null);
  const [password1, setpassword1] = useState(null);
  const [password2, setpassword2] = useState(null);
  const [phone, setphone] = useState({});

  const handleRegisterBtnPress = async () => {
    const { authActions, signUpFunction } = props;
    let data = {
      email,
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      password1,
      password2,
      phone: phone.mobileNumber,
    };
    console.lo('dsfj')
    signUpFunction(data);
  };
  return (
    <>
      <View style={{ backgroundColor: '#fff' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#fff',
            // padding:10,
          }}>
          <SaldiriTextInput
            label="first name"
            onChangeText={(e) => setfirstname(e)}
            value={firstname}
            placeholder="First Name"
            w50={true}
          />
          <SaldiriTextInput
            label="last name"
            onChangeText={(e) => setlastname(e)}
            value={lastname}
            placeholder="Last Name"
            w50={true}
          />
        </View>
        <SaldiriTextInput
          label="email"
          onChangeText={(e) => setemail(e.toLowerCase())}
          value={email}
          placeholder="Enter your email address"
        />
        <SaldiriTextInput
          label="password"
          onChangeText={(e) => setpassword1(e)}
          value={password1}
          secureTextEntry={true}
          placeholder="Enter your password "
        />
        <SaldiriTextInput
          label="confirm password"
          onChangeText={(e) => setpassword2(e)}
          value={password2}
          secureTextEntry={true}
          placeholder="Confirm your password "
        />
        <SaldiriPhoneInput label="contact number" callBack={setphone} />

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
              : AndroidToast((message = 'Please Fill All Required Fields'));
          }}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        {/* <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ ...styles.lightColor, ...styles.conditionText }}>
          I agree to the
          <Pressable>
            <Text style={{ ...styles.darkColor, ...styles.conditionText }}>
              Term & Condition
            </Text>
          </Pressable>
        </Text>
        <Text style={{ ...styles.lightColor, ...styles.conditionText }}>
          and
          <Pressable>
            <Text style={{ ...styles.darkColor, ...styles.conditionText }}>
              Privacy Policy
            </Text>
          </Pressable>
        </Text>
      </View> */}
      </View>
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
  }),
)(Signup);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#7c2981',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  lightColor: {
    color: '#a26ea6',
  },
  darkColor: {
    color: '#7c2981',
  },
  conditionText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
});
