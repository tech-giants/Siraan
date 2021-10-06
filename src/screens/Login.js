import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Pressable,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// import * as t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import actions.
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
import * as authActions from '../actions/authActions';

// Components
import Spinner from '../components/Spinner';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import config from '../config';
import * as nav from '../services/navigation';
import { Navigation } from 'react-native-navigation';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import SaldiriFromBlock from '../components/SaldiriComponents/SaldiriFormBlock';
import SaldiriTextInput from '../components/SaldiriComponents/SaldiriTextInput';
import { RadioButton } from 'react-native-paper';
import {
  AlertBox,
  AndroidToast,
  OverLayModal,
} from '../components/SaldiriComponents/SaldiriMessagesComponents';
import Signup from './Signup';
import { BackgroundAuthImage } from '../components/SaldiriComponents/BackgroundContainers';
import OTPTextInput from 'react-native-otp-textinput';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Api from '../services/api';
import LineButton from '../components/SaldiriComponents/LineButton';
/**
 * Renders login screen.
 *
 * @reactProps {object} authActions - Auth functions.
 * @reactProps {object} auth - Auth setup.
 */
export class Login extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
      registration: PropTypes.func,
      login_hybrid: PropTypes.func,
      login_apple: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,

      error: PropTypes.string,
      fetching: PropTypes.bool,
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
    this.state = {
      radioChecked: 'login',
      loginEmail: '',
      loginPassword: '',
      otpCode: null,
      signupFormData: {},
      showOtpModal: false,
      ceratingAccount: false,
      modalMessage: {},
      show_spinner_signup: false,
      show_spinner_verify: false,
      validateEmailInput: {},
      validatePasswordInput: {},
      loginPressMsg: '',
    };
  }

  /**
   * Sets title and header icons.
   */
  componentDidMount() {
    const { radioChecked } = this.props;
    this.setState({ radioChecked: radioChecked ? radioChecked : 'login' });
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly',], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '108425776825-h391j7jrj8352vhulidl0f2mdh31jdbk.apps.googleusercontent.com',
      androidClientId:
        '108425776825-pq0dku42p0fakbus1ctu88ugr14j21ru.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: 'www.siraan.com', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //  scopes: ['profile', 'email','https://www.googleapis.com/auth/user.gender.read','https://www.googleapis.com/auth/user.birthday.read','https://www.googleapis.com/auth/user.phonenumbers.read','openid','https://www.googleapis.com/auth/user.addresses.read'],
      scopes: ['profile', 'email'],
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  componentWillMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: false,
        title: {
          text: i18n.t('Login').toUpperCase(),
        },
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });
  }

  /**
   * Closes login screen if user logged in.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.logged) {
      setTimeout(() => Navigation.dismissModal(this.props.componentId), 1500);
    }
  }

  /**
   * Closes login screen if user pressed close button.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  /**
   * emptyFieldsHandler.
   */
  emptyFieldsHandler() {
    this.setState({
      loginPressMsg:
        'Email or password might be missing.\nFill all required fields, and login again!',
    });
    setTimeout(() => {
      this.setState({
        loginPressMsg: '',
      });
    }, 2500);
  }
  /**
   * Activates login function.
   */
  handleLogin(value) {
    const { authActions } = this.props;
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // if (reg.test(this.state.loginEmail) === false) {
    //   // return false;
    // } else {
    // }

    // const value = this.refs.form.getValue();
    if (value) {
      // console.log('value', value);
      authActions.login(value);
      this.setState({
        loginPressMsg: '',
      });
    }
  }
  _signIn = async () => {
    const { authActions } = this.props;
    await GoogleSignin.hasPlayServices();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user ingo ', userInfo);
      // if (userInfo) {
      var data = {
        email: userInfo.user['email'],
        firstName: userInfo.user['givenName'],
        lastName: userInfo.user['familyName'],
        phone: '',
        address: '',
        country: '',
        region: '',
        city: '',
        zip: '',
        identifier: userInfo.user['id'],
        verifiedEmail: '',
        provider_id: '2',
      };
      authActions.login_hybrid(data);
      // const {accessToken} = await GoogleSignin.getTokens();
      // console.log(accessToken)
      // console.log("https://people.googleapis.com/v1/people/"+userInfo.user.id+"?personFields=genders,birthdays");
      // axios.get("https://people.googleapis.com/v1/people/"+userInfo.user.id+"?personFields=genders,birthdays",{
      // Authorization: "Bearer "+ accessToken,
      // })
      // .then(function(response) {
      // // handle success
      // console.log("REsponse========================>>>>> ",response);
      // // console.log(response.data.birthdays[0].date);
      // //console.log(response.data.genders[0].formattedValue);
      // })
      // .catch(function(error) {
      // // handle error
      // console.log("Erorrrrrrrrrrrrrr===>>> ",error);
      // });
      // }

      // this.setState({ userInfo });
    } catch (error) {
      // console.log('erorrr on 148 ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  onAppleButtonPress = async () => {
    const { authActions } = this.props;
    // console.log("apple login===============================================>");
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // console.log("credddddd ",appleAuthRequestResponse)
      //
      const response = appleAuthRequestResponse;

      email = '';
      fname = '';
      lname = '';
      if (response) {
        if (response.email) {
          email = response.email;
        }
        fname = response.fullName.givenName;
        lname = response.fullName.familyName;
        var data = {
          email: email,
          firstName: fname,
          lastName: lname,
          phone: '',
          address: '',
          country: '',
          region: '',
          city: '',
          zip: '',
          identifier: response.identityToken,
          verifiedEmail: '',
          provider_id: '3',
        };
        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ",data);
        authActions.login_apple(data);
      }
    } catch (error) {
      console.log('Error');
    }
    // this.setState({loginEmail:JSON.stringify(appleAuthRequestResponse)})
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.

    // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    // console.log("cred state 235=====================> ",credentialState)
    // use credentialState response to ensure the user is authenticated
    // const response = appleAuthRequestResponse;
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   // user is authenticated
    //   console.log("stateeee success ========================> ",credentialState)
    // }
  };
  handleVerifyOtp = (data) => {
    console.log(
      'handle verify otp funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
    );
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic c2lyYWFubWFydEBnbWFpbC5jb206cjFpM2tIdWU3ODM5NjdvUWZwUWRDNDlJNEQ5cllvNnE=',
    };
    Api.get(`verify?phone=${data.phone}&mode=${data.mode}&code=${data.code}`, {
      headers,
    })
      .then((response) => {
        if (response.data.verified) {
          // console.log(
          //   'response on verify ====================> ',
          //   response.data,
          // );
          if (response.data.verified === 'true') {
            // console.log(
            //   'true funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
            // );
            this.setState({
              showOtpModal: false,
              show_spinner_signup: true,
              show_spinner_verify: false,
            });
            this.handleRegister(this.state.signupFormData);
          } else if (response.data.verified === 'false') {
            // console.log(
            //   'false funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
            // );
            this.setState({
              show_spinner_verify: false,
              modalMessage: { message: 'Worng OTP', type: 'error' },
            });
          }
          // console.log(
          //   'return funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
          // );
          else return;
        } else {
          this.setState({ showOtpModal: true, show_spinner_signup: false });
        }
      })
      .catch((error) => console.log('verify otp then error', error));
  };
  handleRegister = async (data) => {
    const { authActions } = this.props;
    console.log(
      'handle register funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
    );
    // console.log(
    //   'authAction createProfile data ==>>',
    //   data,
    //   ' and componentId ==>>',
    //   componentId,
    // );

    const a = await authActions.createProfile(data, 'Component9');
    this.setState({ show_spinner_signup: false });
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { auth } = this.props;
    // const values = {};
    // const t = require('tcomb-form-native');

    // if (!t.form) {
    //   return null;
    // }

    // const Form = t.form.Form;
    // const FormFields = t.struct({
    //   email: t.String,
    //   password: t.String,
    // });

    if (config.demo) {
      values.email = config.demoUsername;
      values.password = config.demoPassword;
    }
    // console.log('login sign up form data 162', this.state.signupFormData.phone)

    // const options = {
    //   disableOrder: true,
    //   fields: {
    //     email: {
    //       label: i18n.t('Email'),
    //       keyboardType: 'email-address',
    //       clearButtonMode: 'while-editing',
    //     },
    //     password: {
    //       label: i18n.t('Password'),
    //       secureTextEntry: true,
    //       clearButtonMode: 'while-editing',
    //     },
    //   },
    // };

    // console.log(
    //   'saldiri text input change text 163',
    //   this.state.loginEmail,
    //   this.state.loginPassword,
    // );
    // const   handleEmailInputChange1 =(e)=>{
    //   // setCustomState({ loginEmail: e })
    //   }
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
          }}>
          <SaldiriHeader
            startComponent={
              <Pressable
                onPress={() => Navigation.dismissModal(this.props.componentId)}
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons name="arrow-back" size={20} color="#16191a" />
              </Pressable>
            }
            midLogo={true}
            // midComponent={
            //   <Image
            //     style={styles.headerLogo}
            //     source={{ uri: 'https://siraan.com/moblogo/moblogo.png' }}
            //   />
            // }
          />
          <BackgroundAuthImage />
          <View style={{ width: '100%', alignItems:'flex-end', justifyContent:'center', paddingHorizontal:10}}>

          <LineButton
            text="Become a seller"
            onPress={() => nav.pushBecomeSeller(this.props.componentId)}
          />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              ...styles.LoginContainer,
            }}>
            <Text style={styles.LoginTitle}>Welcome</Text>
            <SaldiriFromBlock>
              <Pressable
                onPress={() => this.setState({ radioChecked: 'login' })}
                style={{
                  ...styles.loginViewBtnCont,
                  ...styles.authBtnsCont,
                  backgroundColor:
                    this.state.radioChecked === 'signup'
                      ? '#e3d1e4'
                      : 'transparent',
                }}>
                <RadioButton
                  onPress={() => this.setState({ radioChecked: 'login' })}
                  color="#7c2981"
                  value="signup"
                  status={
                    this.state.radioChecked === 'login'
                      ? 'checked'
                      : 'unchecked'
                  }
                />
                <Text
                  style={{
                    width: '100%',
                    flex: 1,
                    fontSize: 18,
                    fontWeight:
                      this.state.radioChecked === 'login' ? 'bold' : '400',
                  }}>
                  Sign-In.
                  <Text numberOfLines={2} style={styles.authActionTitle}>
                    {' '}
                    Already have an account
                  </Text>
                </Text>
              </Pressable>
              <View
                style={{
                  padding: 10,
                  display:
                    this.state.radioChecked === 'login' ? 'flex' : 'none',
                }}>
                <SaldiriTextInput
                  validateMessage={this.state.validateEmailInput}
                  type="email"
                  label="email"
                  keyboardType="email-address"
                  onChangeText={(e) =>
                    this.setState({ loginEmail: e.toLowerCase() })
                  }
                  show_error={true}
                  value={this.state.loginEmail}
                  setValue={(e) =>
                    this.setState({ loginEmail: e.toLowerCase() })
                  }
                  placeholder="Enter your email"
                />
                <SaldiriTextInput
                  validateMessage={this.state.validatePasswordInput}
                  label="password"
                  type="password"
                  onChangeText={(e) => this.setState({ loginPassword: e })}
                  value={this.state.loginPassword}
                  show_error={true}
                  placeholder="Enter your password"
                />
                {/* <Form
                ref="form"
                type={FormFields}
                options={options}
                value={values}
              /> */}
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    marginBottom: 10,
                    marginTop: -10,
                  }}>
                  <Pressable onPress={() => nav.showResetPassword()}>
                    <Text style={styles.forgotPasswordText}>
                      {i18n.t('Forgot your password?')}
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  style={styles.btn}
                  onPress={() => {
                    this.state.loginEmail && this.state.loginPassword
                      ? this.handleLogin({
                          email: this.state.loginEmail,
                          password: this.state.loginPassword,
                        })
                      : this.emptyFieldsHandler();
                  }}
                  disabled={auth.fetching}>
                  <Text style={styles.btnText}>{i18n.t('Login')}</Text>
                </Pressable>
                {/* login btn press validation message */}
                {this.state.loginPressMsg === '' ? null : (
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
                      {this.state.loginPressMsg}
                    </Text>
                  </View>
                )}
                {/* divider */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{ backgroundColor: '#bbbbbb', height: 1, width: 85 }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#535353',
                      textTransform: 'uppercase',
                      marginHorizontal: 5,
                    }}>
                    or
                  </Text>
                  <View
                    style={{ backgroundColor: '#bbbbbb', height: 1, width: 85 }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    // flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // flex:1,
                    marginVertical: 10,
                  }}>
                  {/* <AppleButton
                    cornerRadius={4}
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                      width: '70%', // You must specify a width
                      height: 50, // You must specify a height
                    }}
                    onPress={() => this.onAppleButtonPress()}
                  /> */}
                </View>
                <View
                  style={{
                    width: '100%',
                    // flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // flex:1
                    // marginVertical: 10,
                  }}>
                  <Pressable
                    onPress={this._signIn}
                    style={{
                      flexDirection: 'row',
                      width: '70%',
                      height: 50,
                      backgroundColor: '#4285F4',
                      alignItems: 'center',
                      borderRadius: 3,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        height: '94%',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: 50,
                        justifyContent: 'center',
                        margin: 2,
                        borderRadius: 2,
                      }}>
                      <FastImage
                        style={{ width: 20, height: 20 }}
                        source={require('../assets/google_logo.png')}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      Login with Google
                    </Text>
                  </Pressable>

                  {/* <GoogleSigninButton
                  style={{ width: '70%', height: 55 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}
                /> */}
                </View>
                {/* <Pressable
                  style={styles.btnRegistration}
                  onPress={() => nav.pushRegistration(this.props.componentId)}>
                  <Text style={styles.btnRegistrationText}>
                    {i18n.t('Registration')}
                  </Text>
                </Pressable> */}
              </View>

              {/* sign up cont 👇 */}
              <Pressable
                onPress={() => this.setState({ radioChecked: 'signup' })}
                style={{
                  ...styles.signupViewBtnCont,
                  ...styles.authBtnsCont,
                  zIndex: 100,
                  elevation: 100,
                  backgroundColor:
                    this.state.radioChecked === 'login'
                      ? '#e3d1e4'
                      : 'transparent',
                }}>
                <RadioButton
                  onPress={() => this.setState({ radioChecked: 'signup' })}
                  color="#7c2981"
                  value="signup"
                  status={
                    this.state.radioChecked === 'signup'
                      ? 'checked'
                      : 'unchecked'
                  }
                />
                <Text
                  style={{
                    fontSize: 18,
                    width: '100%',
                    flex: 1,
                    fontWeight:
                      this.state.radioChecked === 'signup' ? 'bold' : '400',
                  }}>
                  Sign Up.
                  <Text numberOfLines={2} style={styles.authActionTitle}>
                    {' '}
                    Don't have an account
                  </Text>
                </Text>
              </Pressable>
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  display:
                    this.state.radioChecked === 'signup' ? 'flex' : 'none',
                }}>
                <Signup
                  spinnerCondition={this.state.show_spinner_signup}
                  signUpFunction={(e) => {
                    this.setState({ show_spinner_signup: true });
                    this.handleRegister(e);

                    // this.handleVerifyOtp({
                    //   phone: e.phone,
                    //   mode: 'send',
                    // });
                    // this.setState({ signupFormData: e });
                  }}
                />
              </View>
              {/* <View
              style={{
                padding: 10,
                display: this.state.radioChecked === 'signup' ? 'flex' : 'none',
              }}>
              <SaldiriTextInput
                label="email"
                onChangeText={(e) => this.setState({ loginEmail: e })}
                value={this.state.loginEmail}
                placeholder="Enter your email"
              />
              <SaldiriTextInput
                label="password"
                onChangeText={(e) => this.setState({ loginPassword: e })}
                value={this.state.loginPassword}
                secureTextEntry={true}
                placeholder="Enter your password"
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  marginBottom: 10,
                  marginTop: -10,
                }}>
                <Pressable onPress={() => nav.showResetPassword()}>
                  <Text style={styles.forgotPasswordText}>
                    {i18n.t('Forgot your password?')}
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.btn}
                onPress={() => {
                  this.state.loginEmail && this.state.loginPassword
                    ? this.handleLogin({
                        email: this.state.loginEmail,
                        password: this.state.loginPassword,
                      })
                    : AndroidToast(
                        (message = 'Please Fill All Required Fields'),
                      );
                }}
                disabled={auth.fetching}>
                <Text style={styles.btnText}>{i18n.t('Login')}</Text>
              </Pressable>
              <Pressable
                style={styles.btnRegistration}
                onPress={() => nav.pushRegistration(this.props.componentId)}>
                <Text style={styles.btnRegistrationText}>
                  {i18n.t('Registration')}
                </Text>
              </Pressable>

              <Spinner visible={auth.fetching} mode="modal" />
            </View> */}
            </SaldiriFromBlock>
          </ScrollView>
          {/* this.state.signupFormData.phone ? */}
          {this.state.showOtpModal ? (
            <>
              <OverLayModal>
                {this.state.ceratingAccount ? (
                  <ActivityIndicator size="large" color="#7c2981" />
                ) : (
                  <>
                    <View style={styles.displayRow}>
                      <Text
                        style={{
                          ...styles.modalTextFontSize,
                        }}>
                        Code sent to{' '}
                      </Text>
                      <Text
                        style={{
                          ...styles.modalTextFontSize,
                        }}>
                        {this.state.signupFormData.phone}
                        {/* 923047955183 */}
                      </Text>
                    </View>
                    <OTPTextInput
                      containerStyle={styles.OTPTextInputCont}
                      textInputStyle={styles.modalTextFontSize}
                      tintColor="#7c2981"
                      inputCount={4}
                      handleTextChange={(e) => this.setState({ otpCode: e })}
                    />
                    {this.state.modalMessage.message ? (
                      <Text
                        style={{
                          // paddingHorizontal: 40 ,
                          fontSize: 10,
                          width: '100%',
                          textAlign: 'center',
                          color:
                            this.state.modalMessage.type === 'error'
                              ? 'red'
                              : 'green',
                        }}>
                        {this.state.modalMessage.message}
                      </Text>
                    ) : null}
                    {this.state.show_spinner_verify ? (
                      <View
                        style={{
                          ...styles.btn,
                          paddingHorizontal: 30,
                          marginVertical: 10,
                        }}>
                        <ActivityIndicator size={20} color="#fff" />
                      </View>
                    ) : (
                      <Pressable
                        style={{
                          ...styles.btn,
                          paddingHorizontal: 30,
                          marginVertical: 10,
                        }}
                        onPress={() => {
                          this.state.otpCode
                            ? (this.setState({ show_spinner_verify: true }),
                              this.handleVerifyOtp({
                                phone: this.state.signupFormData.phone,
                                mode: 'verify',
                                code: this.state.otpCode,
                              }))
                            : AndroidToast((message = 'Enter OTP '));

                          // console.log('verify and creat account', this.state.otpCode)
                        }}>
                        <Text style={styles.btnText}>
                          verify and create account
                        </Text>
                      </Pressable>
                    )}
                    {/*  */}
                    <View style={styles.displayRow}>
                      <Text
                        style={{
                          ...styles.modalTextFontSize,
                        }}>
                        Didn't receive code?
                      </Text>
                      <Pressable
                        onPress={() => {
                          this.handleVerifyOtp({
                            phone: e.phone,
                            mode: 'send',
                          });
                        }}>
                        <Text
                          style={{
                            ...styles.modalTextFontSize,
                            fontWeight: 'bold',
                            //  textDecorationLine: 'underline'
                          }}>
                          Request Again
                        </Text>
                      </Pressable>
                    </View>
                  </>
                )}
              </OverLayModal>
            </>
          ) : null}
          <Spinner
            visible={auth.fetching || this.state.show_spinner_signup}
            mode="modal"
          />
        </SafeAreaView>
      </>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(Login);

const styles = EStyleSheet.create({
  authActionTitle: {
    fontSize: 14,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  LoginContainer: {
    // flex: 1,
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  LoginTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: '95%',
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: '#7c2981',
    padding: 12,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  btnRegistration: {
    marginTop: 20,
  },
  btnRegistrationText: {
    color: 'black',
    fontSize: '1rem',
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: '#7c2981',
    textAlign: 'center',
    marginTop: 18,
  },
  // headerLogo: {
  //   width: 150,
  //   height: 30,
  //   resizeMode: 'cover',
  //   marginVertical: 8,
  // },
  authBtnsCont: {
    // backgroundColor: 'red',
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  loginViewBtnCont: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
    width: '100%',
    // backgroundColor: 'red',
  },
  signupViewBtnCont: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  modalTextFontSize: {
    fontSize: 16,
  },
  OTPTextInputCont: {
    // marginHorizontal: 10,
    // width: '80%'
    // marginTop: 10,
    marginBottom: 20,
  },

  // BackgroundAuthImage: {
  //   width: '100%',
  //   height: 400,
  //   resizeMode: 'cover',
  //   zIndex: -10,
  //   elevation: -10,
  //   position: 'absolute',
  //   // top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: -80,
  //   // justifyContent: 'flex-end',
  // },
});
