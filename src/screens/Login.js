import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
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
});

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
  }

  /**
   * Sets title and header icons.
   */
  componentWillMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
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
  handleLogin() {
    const { authActions } = this.props;
    const value = this.refs.form.getValue();
    if (value) {
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

    return (
      <View style={styles.container}>
        <Form ref="form" type={FormFields} options={options} value={values} />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.handleLogin()}
          disabled={auth.fetching}>
          <Text style={styles.btnText}>{i18n.t('Login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnRegistration}
          onPress={() => nav.pushRegistration(this.props.componentId)}>
          <Text style={styles.btnRegistrationText}>
            {i18n.t('Registration')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.showResetPassword()}>
          <Text style={styles.forgotPasswordText}>
            {i18n.t('Forgot your password?')}
          </Text>
        </TouchableOpacity>
        <Spinner visible={auth.fetching} mode="modal" />
      </View>
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
