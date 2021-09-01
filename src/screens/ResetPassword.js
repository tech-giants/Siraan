import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import * as nav from '../services/navigation';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import SaldiriTextInput from '../components/SaldiriComponents/SaldiriTextInput';
import { BackgroundAuthImage } from '../components/SaldiriComponents/BackgroundContainers';
import FastImage from 'react-native-fast-image'

// Import actions.
import * as authActions from '../actions/authActions';

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
     zIndex: 10,
    elevation: 10,
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
    borderRadius: 10,
    width: '100%',
    paddingVertical: 7,
    backgroundColor: '#7c2981',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  email: {
    fontWeight: 'bold',
  },
  helpText: {
    marginTop: 10,
    color: '#7c2981',
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
  headerLogo: {
    width: 150,
    height: 30,
    resizeMode: 'cover',
    marginVertical: 8,
  },
  ScreenTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
});

const ResetPassword = ({ componentId, authActions }) => {
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        visible: false,
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
    <>
      <SaldiriHeader
        midComponent={
          <FastImage
            style={styles.headerLogo}
            source={{ uri: 'https://siraan.com/moblogo/moblogo.png' }}
            resizeMode={FastImage.resizeMode.cover}
          />
        }
      />
      <BackgroundAuthImage />
      <View style={styles.container}>
        {screen === 'reset' ? (
          <>
            <Text style={styles.ScreenTitle}>Reset Password</Text>
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
            <SaldiriTextInput
              // label="email"
              onChangeText={(e) => setEmail(e)}
              value={email}
              placeholder="Enter your email"
            />
            <Pressable onPress={resetPasswordHandler} style={styles.button}>
              <Text style={styles.buttonText}>{i18n.t('Get the code')}</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.ScreenTitle}>Verify your email address</Text>
            <View style={styles.tryAgainWrapper}>
              <Text style={styles.hint}>
                We have sent a verification code to your email address{' '}
                <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  {email}
                </Text>
              </Text>
            </View>
            <SaldiriTextInput
              value={oneTimePassword}
              placeholder="Enter the confirmation code"
              onChangeText={(value) => {
                setOneTimePassword(value);
                setIsValidate(true);
              }}
            />
            <Pressable
              style={styles.button}
              onPress={loginWithOneTimePasswordHandler}>
              <Text style={styles.buttonText}>{i18n.t('Login in')}</Text>
            </Pressable>
            <Pressable
              style={{ width: '100%', alignItems: 'flex-end' }}
              onPress={codeDidntComeHandler}>
              <Text style={styles.helpText}>
                {i18n.t(`Didn't receive the code?`)}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </>
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
