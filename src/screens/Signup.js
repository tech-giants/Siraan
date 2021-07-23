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

const Signup = () => {
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [email, setemail] = useState(null);
  const [password1, setpassword1] = useState(null);
  const [password2, setpassword2] = useState(null);
  const [phone, setphone] = useState(null);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <SaldiriTextInput
          label="first name"
          onChangeText={(e) => setfirstname(e)}
          value={firstname}
          placeholder="Enter your first name"
          w50={true}
        />
        <SaldiriTextInput
          label="last name"
          onChangeText={(e) => setlastname(e)}
          value={lastname}
          placeholder="Enter your last name"
          w50={true}
        />
      </View>
      <SaldiriTextInput
        label="email"
        onChangeText={(e) => setemail(e)}
        value={email}
        placeholder="Enter your email address"
      />
      <SaldiriTextInput
        label="password"
        onChangeText={(e) => setpassword1(e)}
        value={password1}
        placeholder="Enter your password "
      />
      <SaldiriTextInput
        label="confirm password"
        onChangeText={(e) => setpassword2(e)}
        value={password2}
        placeholder="Confirm your password "
      />
      <SaldiriPhoneInput label="contact number" callBack={setphone} />

      <Pressable
        style={styles.btn}
        onPress={() => nav.pushRegistration(this.props.componentId)}>
        <Text style={styles.btnText}>Sign Up</Text>
      </Pressable>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ ...styles.lightColor, ...styles.conditionText }}>
          I agree to the{' '}
          <Pressable>
            <Text style={{ ...styles.darkColor, ...styles.conditionText }}>
              Term & Condition
            </Text>
          </Pressable>
        </Text>
        <Text style={{ ...styles.lightColor, ...styles.conditionText }}>
          and{' '}
          <Pressable>
            <Text style={{ ...styles.darkColor, ...styles.conditionText }}>
              Privacy Policy
            </Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

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
