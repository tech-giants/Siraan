import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import * as nav from '../services/navigation';

// Import actions.
import * as authActions from '../actions/authActions';

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '$mediumGrayColor',
    borderRadius: '$borderRadius',
    width: '100%',
    height: 40,
    fontSize: '1rem',
  },
  button: {
    marginTop: 20,
    borderRadius: '$borderRadius',
    width: 150,
    paddingVertical: 7,
    backgroundColor: '#6d3075',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '1rem',
  },
  email: {
    fontWeight: 'bold',
  },
  helpText: {
    marginTop: 10,
    color: '#0000FF',
  },
  tryAgainWrapper: {
    width: '100%',
  },
  hint: {
    textAlign: 'left',
    marginBottom: 10,
  },
  validateWarning: {
    borderColor: '$dangerColor',
  },
});

const ResetPassword = ({ componentId, authActions }) => {
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: i18n.t('Reset password'),
        },
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });

    const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        if (buttonId === 'close') {
          Navigation.dismissModal(componentId);
        }
      },
    );

    return () => {
      navigationButtonEventListener.remove();
    };
  }, [componentId]);

  const [email, setEmail] = useState('');
  const [oneTimePassword, setOneTimePassword] = useState('');
  const [screen, setScreen] = useState('reset');
  const [codeDidntCome, setCodeDidntCome] = useState(false);
  const [isValidate, setIsValidate] = useState(true);

  const resetPasswordHandler = async () => {
    const regex = /\S+@\S+\.\S+/i;

    if (!email.match(regex)) {
      setIsValidate(false);
      return;
    }

    const status = await authActions.resetPassword({ email: email.trim() });
    if (status) {
      setScreen('login');
    }
  };

  const loginWithOneTimePasswordHandler = async () => {
    if (!oneTimePassword.length) {
      setIsValidate(false);
      return;
    }

    const isLogin = await authActions.loginWithOneTimePassword({
      email,
      oneTimePassword,
    });

    if (isLogin) {
      Navigation.dismissModal(componentId);
    }
  };

  const codeDidntComeHandler = () => {
    setScreen('reset');
    setCodeDidntCome(true);
  };

  return (
    <View style={styles.container}>
      {screen === 'reset' ? (
        <>
          {codeDidntCome ? (
            <View style={styles.tryAgainWrapper}>
              <Text style={styles.hint}>{i18n.t('Try again:')}</Text>
            </View>
          ) : (
            <View style={styles.tryAgainWrapper}>
              <Text style={styles.hint}>
                {i18n.t(
                  'Enter your e-mail, we will send you a code to log into your account.',
                )}
              </Text>
            </View>
          )}
          <TextInput
            value={email}
            placeholder={'Email'}
            style={[styles.input, !isValidate && styles.validateWarning]}
            onChangeText={(value) => {
              setEmail(value);
              setIsValidate(true);
            }}
          />
          <TouchableOpacity
            onPress={resetPasswordHandler}
            style={styles.button}>
            <Text style={styles.buttonText}>{i18n.t('Get the code')}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            value={oneTimePassword}
            placeholder={'Code'}
            style={[styles.input, !isValidate && styles.validateWarning]}
            onChangeText={(value) => {
              setOneTimePassword(value);
              setIsValidate(true);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={loginWithOneTimePasswordHandler}>
            <Text style={styles.buttonText}>{i18n.t('Sign in')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={codeDidntComeHandler}>
            <Text style={styles.helpText}>
              {i18n.t(`Didn't receive the code?`)}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(ResetPassword);
