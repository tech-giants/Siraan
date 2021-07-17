import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as authActions from '../actions/authActions';
import Spinner from '../components/Spinner';
import FormBlock from '../components/FormBlock';
import Button from '../components/Button';
import StepByStepSwitcher from '../components/StepByStepSwitcher';
import i18n from '../utils/i18n';
import * as nav from '../services/navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
});

const t = require('tcomb-form-native');
const Form = t.form.Form;
const FormFields = t.struct({
  email: t.String,
  password: t.String,
});
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

export class CheckoutAuth extends Component {
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
      logout: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      error: PropTypes.string,
      fetching: PropTypes.bool,
    }),
  };

  static options = {
    topBar: {
      title: {
        text: i18n.t('Login').toUpperCase(),
      },
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.logged && !nextProps.auth.fetching) {
      setTimeout(() => {
        nav.showCheckoutProfile({});
      }, 1000);
    } else if (nextProps.auth.error && !nextProps.auth.fetching) {
      this.props.navigator.showInAppNotification({
        screen: 'Notification',
        passProps: {
          type: 'warning',
          title: i18n.t('Error'),
          text: i18n.t('Wrong password.'),
        },
      });
    }
  }

  handleLogin() {
    const { authActions } = this.props;
    const value = this.refs.form.getValue();
    if (value) {
      authActions.login(value);
    }
  }

  handleLogout() {
    this.props.authActions.logout();
  }

  renderLoginForm() {
    return (
      <FormBlock title={i18n.t('Auth')}>
        <Form ref={'form'} type={FormFields} options={options} />
        <Button type="primary" onPress={() => this.handleLogin()}>
          {i18n.t('Sign in')}
        </Button>
      </FormBlock>
    );
  }

  renderReLogin() {
    return (
      <Button type="primary" onPress={() => this.handleLogout()}>
        {i18n.t('Sign in as a different user')}
      </Button>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <StepByStepSwitcher />
          {auth.logged ? this.renderReLogin() : this.renderLoginForm()}
        </ScrollView>
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
)(CheckoutAuth);
