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
      console.log('value', value);
      authActions.login(value);
    }
  }
  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { auth } = this.props;
    const values = {};
    const t = require('tcomb-form-native');

    if (!t.form) {
      return null;
    }

    const Form = t.form.Form;
    const FormFields = t.struct({
      email: t.String,
      password: t.String,
    });

    if (config.demo) {
      values.email = config.demoUsername;
      values.password = config.demoPassword;
    }

    const options = {
      disableOrder: true,
      fields: {
        email: {
          label: i18n.t('Email'),
          keyboardType: 'email-address',
          clearButtonMode: 'while-editing',
        },
        password: {
          label: i18n.t('Password'),
          secureTextEntry: true,
          clearButtonMode: 'while-editing',
        },
      },
    };

    console.log(
      'saldiri text input change text 163',
      this.state.loginEmail,
      this.state.loginPassword,
    );  
// const   handleEmailInputChange1 =(e)=>{
//   // setCustomState({ loginEmail: e })
//   }

    return (
      <>
        <SaldiriHeader
          midComponent={
            <Image
              style={styles.headerLogo}
              source={{ uri: 'https://siraan.com/moblogo/moblogo.png' }}
            />
          }
        />
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
                color="#7c2981"
                value="signup"
                status={
                  this.state.radioChecked === 'login' ? 'checked' : 'unchecked'
                }
              />
              <Text>Sign In - Already have an account</Text>
            </Pressable>
            <View
              style={{
                padding: 10,
                display: this.state.radioChecked === 'login' ? 'flex' : 'none',
              }}>
              <SaldiriTextInput
                label="email"
                onChangeText={(e) => this.setState({ loginEmail: e })}
                value={this.state.loginEmail}
                placeholder='Enter your email'
              />
              <SaldiriTextInput
                label="password"

                onChangeText={(e) => this.setState({ loginPassword: e })}
                value={this.state.loginPassword}
                secureTextEntry={true}
                placeholder='Enter your password'
              />
              {/* <Form
                ref="form"
                type={FormFields}
                options={options}
                value={values}
              /> */}
              <Pressable
                style={styles.btn}
                onPress={() =>{ this.state.loginEmail && this.state.loginPassword ? this.handleLogin({email: this.state.loginEmail, password: this.state.loginPassword}) : console.log('please enter all required fields') }}
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
              <Pressable onPress={() => nav.showResetPassword()}>
                <Text style={styles.forgotPasswordText}>
                  {i18n.t('Forgot your password?')}
                </Text>
              </Pressable>
              <Spinner visible={auth.fetching} mode="modal" />
            </View>

            {/* sign up cont 👇 */}
            <Pressable
              onPress={() => this.setState({ radioChecked: 'signup' })}
              style={{
                ...styles.signupViewBtnCont,
                ...styles.authBtnsCont,
                backgroundColor:
                  this.state.radioChecked === 'login'
                    ? '#e3d1e4'
                    : 'transparent',
              }}>
              <RadioButton
                color="#7c2981"
                value="signup"
                status={
                  this.state.radioChecked === 'signup' ? 'checked' : 'unchecked'
                }
              />
              <Text>Sign Up - Don't have an account</Text>
            </Pressable>
            <View></View>
          </SaldiriFromBlock>
        </ScrollView>
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
  },
  LoginTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: '95%',
  },
  btn: {
    backgroundColor: '#6d3075',
    padding: 12,
    borderRadius: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
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
    color: '#0000FF',
    textAlign: 'center',
    marginTop: 18,
  },
  headerLogo: {
    width: 150,
    height: 30,
    resizeMode: 'cover',
    marginVertical: 8,
  },
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
});
