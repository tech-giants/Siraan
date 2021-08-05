import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
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
    width: 230,
    height: 150,
  },
  signInSectionContainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e3d1e4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginLeft:15,
  },
  signInSectionText: {
    color: '#7c2981',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    fontSize: 20,
    flex: 1,
  },
  signInBtnContainer: {
    width: '90%',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  signInButtons: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: 200,
    height: 80,
  },
  signInBtnText: {
    color: '#19161a',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    width: '100%',
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
    color: '#7c2981',
    marginRight: 5,
  },
  rightArrowIcon: {
    fontSize: '1rem',
    color: '#7c2981',
  },
  hintText: {
    fontSize: '0.8rem',
    color: '#a26ea6',
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
        visible: false,
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

        <Pressable
          onPress={() => nav.pushVendorManageOrders(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="archive" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Vendor Orders')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>

        <Pressable
          onPress={() => nav.pushVendorManageProducts(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="pages" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>
              {i18n.t('Vendor products')}
            </Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>

        <Pressable
          onPress={() => nav.showVendorManageCategoriesPicker({ parent: 0 })}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="add-circle" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Add product')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>
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

        <Pressable
          onPress={() => nav.pushLanguageSelection(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>{i18n.t('Language')}</Text>
          <View style={styles.IconNameWrapper}>
            <Text style={styles.hintText}>
              {settings.selectedLanguage.langCode.toUpperCase()}
            </Text>
            <Icon name="chevron-right" style={styles.rightArrowIcon} />
          </View>
        </Pressable>

        <Pressable
          onPress={() => nav.pushCurrencySelection(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>{i18n.t('Currency')}</Text>
          <View style={styles.IconNameWrapper}>
            <Text style={styles.hintText}>
              {settings.selectedCurrency.symbol.toUpperCase()}
            </Text>
            <Icon name="chevron-right" style={styles.rightArrowIcon} />
          </View>
        </Pressable>
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
        {/*  */}
        <Pressable style={styles.signInBtnContainer} onPress={()=> nav.showSaldiriContactUs()}>
          <Text  style={styles.signInBtnText}>
          Contact Us
          </Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>
        {/*  */}
        {pages.items.map((page, index) => {
          return (
            <Pressable
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
            </Pressable>
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
    // if (
    //   cart.user_data.b_firstname ||
    //   cart.user_data.b_lastname ||
    //   cart.user_data.email
    // ) {
      return (
        <>
           <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',backgroundColor:'#e3d1e4',marginBottom:3,}}>
                   Michelangelo Flores
              </Text>
          <Text  style={{textAlign:'center',backgroundColor:'#e3d1e4'}}>
                   michelangeloflores@gmail.com
              </Text>
          {/* {(cart.user_data.b_firstname ||
            cart.user_data.b_lastname ||
            cart.user_data.email) && (
            <View style={styles.signInInfo}>
              <Text style={styles.userNameText} numberOfLines={2}>
                {cart.user_data.b_firstname} {cart.user_data.b_lastname}
              </Text>
              <Text style={styles.userMailText}>{cart.user_data.email}</Text>
            </View>
          )} */}
        </>
      );
    // }
    // return null;
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
        <View
          style={{
            backgroundColor: '#e3d1e4',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          {theme.$logoUrl !== '' && (
            <Image
              source={require('../assets/siraan_logo.png')}
              style={styles.logo}
            />
          )}
          {/* <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',backgroundColor:'#e3d1e4',}}>
                   Michelangelo Flores
              </Text>
          <Text  style={{textAlign:'center',backgroundColor:'#e3d1e4'}}>
                   michelangeloflores@gmail.com
              </Text> */}

          {!auth.logged ? (
            <View style={styles.signInButtons}>
              <Pressable
                onPress={() => nav.showLogin()}
                style={{ ...styles.btn, backgroundColor: '#6d3075' }}>
                <Text style={{ ...styles.btnText, color: '#fff' }}>
                  {i18n.t('Sign in')}
                </Text>
              </Pressable>
              {/* <Pressable
              onPress={() => nav.showRegistration()}
              style={styles.btn}>
              <Text style={styles.btnText}>{i18n.t('Registration')}</Text>
            </Pressable> */}
            </View>
          ) : (
            this.renderUserInformation(cart)
          )}
        </View>
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

        <Pressable
          onPress={() => nav.pushProfileEdit(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="person" style={styles.menuItemIcon} />
          </View>
            <Text style={styles.signInBtnText}>{i18n.t('Profile')}</Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>

        <Pressable
          onPress={() => nav.pushOrders(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="receipt" style={styles.menuItemIcon} />
          </View>
            <Text style={styles.signInBtnText}>{i18n.t('Orders')}</Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>

        <Pressable
          onPress={() => authActions.logout()}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="exit-to-app" style={styles.menuItemIcon} />
          </View>
            <Text style={styles.signInBtnText}>{i18n.t('Logout')}</Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
