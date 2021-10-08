import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, SafeAreaView, StatusBar, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import omit from 'lodash/omit';
import { isDate } from 'date-fns';
import { format } from 'date-fns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';
// Import actions.
import * as authActions from '../actions/authActions';

// Components
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import Spinner from '../components/Spinner';
import ProfileForm from '../components/ProfileForm';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

/**
 * Renders profile edit screen.
 *
 * @reactProps {object} authActions - Auth actions.
 */
export class ProfileEdit extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    authActions: PropTypes.shape({
      registration: PropTypes.func,
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      profile: {},
      forms: [],
    };
  }

  /**
   * Gets user profile, sets it to state.
   */
  componentDidMount() {
    const { authActions } = this.props;

    authActions.fetchProfile().then((profile) => {
      this.setState({
        profile,
        fetching: false,
        forms: profile.fields,
      });
    });
  }

  /**
   * Saves update user profile data.
   *
   * @param {object} values - Updated user profile data.
   */
  handleSave = (values) => {
    const { profile } = this.state;
    const { authActions, componentId, settings } = this.props;
    if (values) {
      const data = { ...values };
      Object.keys(data).forEach((key) => {
        if (isDate(data[key])) {
          data[key] = format(data[key], settings.dateFormat);
        }
      });

      data.b_address = data.s_address;
      data.b_address_2 = data.s_address_2;
      data.b_city = data.s_city;
      data.b_country = data.s_country;
      data.b_firstname = data.s_firstname;
      data.b_lastname = data.s_lastname;
      data.b_phone = data.s_phone;
      data.b_state = data.s_state;
      data.b_zipcode = data.s_zipcode;

      authActions.updateProfile(profile.user_id, data, componentId);
    }
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { fetching, forms } = this.state;
    const { settings } = this.props;

    if (fetching) {
      return (
        <View style={styles.container}>
          <Spinner visible />
        </View>
      );
    }

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
                onPress={() => Navigation.pop(this.props.componentId)}
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons name="arrow-back" size={20} color="#16191a" />
              </Pressable>
            }
            midHeaderTitle="Edit Profile"
          />
          <View style={styles.container}>
            <ProfileForm
              fields={omit(forms, 'B')}
              isEdit
              onSubmit={(values) => this.handleSave(values)}
              dateFormat={settings.dateFormat}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    settings: state.settings,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(ProfileEdit);
