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
} from 'react-native';
// import * as t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
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
} from "@react-native-google-signin/google-signin";
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
    };
  }

  /**
   * Sets title and header icons.
   */
  
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
   * Activates login function.
   */
  handleLogin(value) {
    const { authActions } = this.props;
    // const value = this.refs.form.getValue();
    if (value) {
      // console.log('value', value);
      authActions.login(value);
    }
  }
  _signIn = async () => {
        GoogleSignin.configure({
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '326806121903-8trnsvrtrg49kq0rq26f6c0kcqgvvbsa.apps.googleusercontent.com', 
         "androidClientId":"326806121903-9smi4sj8g8045haetm85a77nj5m8mr5f.apps.googleusercontent.com",// client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: 'www.siraan.com', // specifies a hosted domain restriction
        // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        scopes: ["profile", "email"],
       
        // accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });
 await GoogleSignin.hasPlayServices();
       try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("user ingo ",userInfo)
        // this.setState({ userInfo });
      } catch (error) {
        console.log("erorrr on 148 ",error)
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
    }
  handleRegister = async (data) => {
    const { authActions, componentId } = this.props;

    // console.log(
    //   'authAction createProfile data ==>>',
    //   data,
    //   ' and componentId ==>>',
    //   componentId,
    // );

    // authActions.createProfile(data, componentId);
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
        
          <SaldiriHeader
          midLogo ={true}
            // midComponent={
            //   <Image
            //     style={styles.headerLogo}
            //     source={{ uri: 'https://siraan.com/moblogo/moblogo.png' }}
            //   />
            // }
          />
          <BackgroundAuthImage />
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
                    fontSize: 20,
                    fontWeight:
                      this.state.radioChecked === 'login' ? 'bold' : '400',
                  }}>
                  Sign In
                  <Text style={{ fontSize: 16 }}> Already have an account</Text>
                </Text>
              </Pressable>
              <View
                style={{
                  padding: 10,
                  display:
                    this.state.radioChecked === 'login' ? 'flex' : 'none',
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
                      : AndroidToast(
                          (message = 'Please Fill All Required Fields'),
                        );
                  }}
                  disabled={auth.fetching}>
                  <Text style={styles.btnText}>{i18n.t('Login')}</Text>
                </Pressable>
                    <GoogleSigninButton
                      style={{ width: 192, height: 48, marginLeft: 60,  }}
                      size={GoogleSigninButton.Size.Standard}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={this._signIn}
                    />
                {/* <Pressable
                  style={styles.btnRegistration}
                  onPress={() => nav.pushRegistration(this.props.componentId)}>
                  <Text style={styles.btnRegistrationText}>
                    {i18n.t('Registration')}
                  </Text>
                </Pressable> */}

                <Spinner visible={auth.fetching} mode="modal" />
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
                    fontSize: 20,
                    fontWeight:
                      this.state.radioChecked === 'signup' ? 'bold' : '400',
                  }}>
                  Sign Up
                  <Text style={{ fontSize: 16 }}> Don't have an account</Text>
                </Text>
              </Pressable>
              <View
                style={{
                  padding: 10,
                  display:
                    this.state.radioChecked === 'signup' ? 'flex' : 'none',
                }}>
                <Signup
                  signUpFunction={(e) => this.setState({ signupFormData: e })}
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
          
          {this.state.signupFormData.phone ? (
            <>
              <OverLayModal>
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
                <Pressable
                  style={{
                    ...styles.btn,
                    paddingHorizontal: 30,
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    this.setState({ signupFormData: {} });

                    // console.log('verify and creat account', this.state.otpCode)
                  }}>
                  <Text style={styles.btnText}>verify and creat account</Text>
                </Pressable>
                {/*  */}
                <View style={styles.displayRow}>
                  <Text
                    style={{
                      ...styles.modalTextFontSize,
                    }}>
                    Didn't receive code?{' '}
                  </Text>
                  <Pressable>
                    <Text
                      style={{
                        ...styles.modalTextFontSize,
                        fontWeight: 'bold',
                        //  textDecorationLine: 'underline'
                      }}>
                      Request Again{' '}
                    </Text>
                  </Pressable>
                </View>
              </OverLayModal>
            </>
          ) : null}
        
        
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
