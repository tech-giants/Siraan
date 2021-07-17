import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import i18n from '../utils/i18n';
import theme from '../config/theme';
import config from '../config';
import * as nav from '../services/navigation';
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import Icon from '../components/Icon';
import { USER_TYPE_VENDOR } from '../constants/index';

// Actions
import * as pagesActions from '../actions/pagesActions';
import * as authActions from '../actions/authActions';
import * as settingsActions from '../actions/settingsActions';
import setStartSettings from '../actions/appActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: 130,
  },
  signInSectionContainer: {
    backgroundColor: '$grayColor',
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signInSectionText: {
    color: '#9c9c9c',
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  signInBtnContainer: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '$menuItemsBorderColor',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signInButtons: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  signInBtnText: {
    color: '$menuTextColor',
  },
  btn: {
    borderRadius: '$borderRadius',
    height: 38,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '$menuTextColor',
    fontSize: '1rem',
  },
  signInInfo: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 30,
  },
  signOut: {
    paddingBottom: 30,
  },
  userNameText: {
    color: '$menuTextColor',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  userMailText: {
    color: '$menuTextColor',
    fontSize: '1rem',
  },
  IconNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: '1.2rem',
    color: '$menuIconsColor',
    marginRight: 5,
  },
  rightArrowIcon: {
    fontSize: '1rem',
    color: '$menuIconsColor',
  },
  hintText: {
    fontSize: '0.8rem',
    color: '$menuIconsColor',
  },
});

/**
 * Renders profile screen.
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
   * Gets data for Pages block.
   */
  componentDidMount() {
    const { pagesActions, settings } = this.props;
    pagesActions.fetch(config.layoutId);
    if (!settings.languageCurrencyFeatureFlag) {
      setStartSettings(settings.selectedLanguage, settings.selectedCurrency);
    }
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Profile').toUpperCase(),
        },
      },
    });
  }

  /**
   * Renders Seller block if the user is vendor.
   *
   * @return {JSX.Element}
   */
  renderVendorFields() {
    return (
      <>
        <View style={styles.signInSectionContainer}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Seller').toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => nav.pushVendorManageOrders(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="archive" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Vendor Orders')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.pushVendorManageProducts(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="pages" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>
              {i18n.t('Vendor products')}
            </Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.showVendorManageCategoriesPicker({ parent: 0 })}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="add-circle" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Add product')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>
      </>
    );
  }

  /**
   * Renders Settings block.
   *
   * @return {JSX.Element}
   */
  renderSettings(settings) {
    return (
      <>
        <View style={styles.signInSectionContainer}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Settings').toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => nav.pushLanguageSelection(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>{i18n.t('Language')}</Text>
          <View style={styles.IconNameWrapper}>
            <Text style={styles.hintText}>
              {settings.selectedLanguage.langCode.toUpperCase()}
            </Text>
            <Icon name="chevron-right" style={styles.rightArrowIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.pushCurrencySelection(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>{i18n.t('Currency')}</Text>
          <View style={styles.IconNameWrapper}>
            <Text style={styles.hintText}>
              {settings.selectedCurrency.symbol.toUpperCase()}
            </Text>
            <Icon name="chevron-right" style={styles.rightArrowIcon} />
          </View>
        </TouchableOpacity>
      </>
    );
  }

  /**
   * Renders pages.
   *
   * @param {object} pages - Pages information.
   *
   * @return {JSX.Element}
   */
  renderPages = (pages) => {
    return (
      <View>
        <View style={styles.signInSectionContainer}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Pages').toUpperCase()}
          </Text>
        </View>
        {pages.items.map((page, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.signInBtnContainer}
              onPress={() =>
                registerDrawerDeepLinks(
                  {
                    link: `dispatch=pages.view&page_id=${page.page_id}`,
                    payload: {
                      title: page.page,
                    },
                  },
                  this.props.componentId,
                )
              }>
              <Text style={styles.signInBtnText}>{page.page}</Text>
              <Icon name="chevron-right" style={styles.rightArrowIcon} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  /**
   * Renders user infotmation.
   *
   * @param {object} cart - Cart data.
   *
   * @return {JSX.Element}
   */
  renderUserInformation = (cart) => {
    if (
      cart.user_data.b_firstname ||
      cart.user_data.b_lastname ||
      cart.user_data.email
    ) {
      return (
        <>
          {(cart.user_data.b_firstname ||
            cart.user_data.b_lastname ||
            cart.user_data.email) && (
            <View style={styles.signInInfo}>
              <Text style={styles.userNameText} numberOfLines={2}>
                {cart.user_data.b_firstname} {cart.user_data.b_lastname}
              </Text>
              <Text style={styles.userMailText}>{cart.user_data.email}</Text>
            </View>
          )}
        </>
      );
    }
    return null;
  };

  /**
   * Renders login form if the user didn`t login.
   *
   * @param {object} auth - Auth information.
   * @param {object} cart - Cart information.
   *
   * @return {JSX.Element}
   */
  renderSignedIn = (auth, cart) => {
    return (
      <>
        <View>
          {theme.$logoUrl !== '' && (
            <Image source={{ uri: theme.$logoUrl }} style={styles.logo} />
          )}
        </View>
        {!auth.logged ? (
          <View style={styles.signInButtons}>
            <TouchableOpacity
              onPress={() => nav.showLogin()}
              style={{ ...styles.btn, backgroundColor: '#6d3075' }}>
              <Text style={{ ...styles.btnText, color: '#fff' }}>
                {i18n.t('Sign in')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => nav.showRegistration()}
              style={styles.btn}>
              <Text style={styles.btnText}>{i18n.t('Registration')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          this.renderUserInformation(cart)
        )}
      </>
    );
  };

  /**
   * Renders profile if the user logged in.
   *
   * @param {object} authActions - Auth actions.
   *
   * @return {JSX.Element}
   */
  renderSignedInMenu = (authActions) => {
    return (
      <>
        <View style={styles.signInSectionContainer}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Buyer').toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => nav.pushProfileEdit(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="person" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Profile')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.pushOrders(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="receipt" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Orders')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => authActions.logout()}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="exit-to-app" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Logout')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>
      </>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { profile, pages, auth, cart, authActions, settings } = this.props;

    return (
      <ScrollView style={styles.container}>
        {this.renderSignedIn(auth, cart)}

        {settings.languageCurrencyFeatureFlag && this.renderSettings(settings)}

        {auth.logged && this.renderSignedInMenu(authActions)}

        {profile.user_type === USER_TYPE_VENDOR && this.renderVendorFields()}

        {this.renderPages(pages)}
      </ScrollView>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    pages: state.pages,
    cart: state.cart,
    profile: state.profile,
    settings: state.settings,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
  }),
)(ProfileEdit);
