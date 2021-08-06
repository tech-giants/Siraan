import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import omit from 'lodash/omit';
import { isDate } from 'date-fns';
import { format } from 'date-fns';

// Import actions.
import * as authActions from '../actions/authActions';

// Components
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
      <View style={styles.container}>
        <ProfileForm
          fields={omit(forms, 'B')}
          isEdit
          onSubmit={(values) => this.handleSave(values)}
          dateFormat={settings.dateFormat}
        />
      </View>
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
