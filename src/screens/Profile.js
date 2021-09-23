import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import i18n from '../utils/i18n';
import theme from '../config/theme';
import config from '../config';
import * as nav from '../services/navigation';
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import Icon from '../components/Icon';
import { USER_TYPE_VENDOR } from '../constants/index';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
// Actions
import * as pagesActions from '../actions/pagesActions';
import * as authActions from '../actions/authActions';
import * as settingsActions from '../actions/settingsActions';
import * as walletActions from '../actions/walletActions';

import setStartSettings from '../actions/appActions';
import FastImage from 'react-native-fast-image';
import { id } from 'date-fns/locale';

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
    fontSize: '1.2rem',
    color: '#7c2981',
  },
  hintText: {
    fontSize: '0.8rem',
    color: '#a26ea6',
  },
  walletMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    marginVertical: 20,
  },
  priceText: {
    color: '#a0a0a0',
    fontSize: 20,
    fontWeight: '600',
  },
  priceNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  walletItemWrapper: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  detailMain: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  detailText: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
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
    walletActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),

    wallet: PropTypes.shape({}),
  };

  /**
   * Gets data for Pages block.
   */
  componentDidMount() {
    const { pagesActions, settings, radioChecked } = this.props;

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
          <View style={{ ...styles.IconNameWrapper }}>
            <Icon name="archive" style={styles.menuItemIcon} />
          </View>
          <Text style={{ ...styles.signInBtnText }}>
            {i18n.t('Vendor Orders')}
          </Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>

        <Pressable
          onPress={() => nav.pushVendorManageProducts(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="pages" style={styles.menuItemIcon} />
          </View>
          <Text style={styles.signInBtnText}>{i18n.t('Vendor products')}</Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>

        <Pressable
          onPress={() => nav.showVendorManageCategoriesPicker({ parent: 0 })}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="add-circle" style={styles.menuItemIcon} />
          </View>
          <Text style={styles.signInBtnText}>{i18n.t('Add product')}</Text>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </Pressable>
      </>
    );
  }

  /**
   * Renders wallet block.
   *
   * @return {JSX.Element}
   */
  renderWallet(wallet, profile, walletActions) {
    return (
      <>
        <View style={{ ...styles.signInSectionContainer }}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Wallet').toUpperCase()}
          </Text>
          <TouchableOpacity
            activeOpacity={2}
            style={{ paddingTop: 5, paddingHorizontal: 10, paddingBottom: 0 }}
            onPress={() => walletActions.fetch(profile.user_id)}>
            <Icon name="refresh" style={styles.rightArrowIcon} />
          </TouchableOpacity>
        </View>

        {!wallet.fetching ? (
          <>
            <View style={styles.walletMain}>
              <View style={styles.walletItemWrapper}>
                <Text style={styles.priceText}>Cash</Text>
                <Text style={styles.priceNumberText}>
                  {wallet.data.cash ? wallet.data.cash : 0}
                </Text>
              </View>
              <View
                style={{
                  height: '60%',
                  borderLeftWidth: 1,
                  borderColor: '#e3d1e4',
                }}
              />
              <View style={styles.walletItemWrapper}>
                <Text style={styles.priceText}>Credit</Text>
                <Text style={styles.priceNumberText}>
                  {wallet.data.total_credit ? wallet.data.total_credit : 0}
                </Text>
              </View>
              <View
                style={{
                  height: '60%',
                  borderLeftWidth: 1,
                  borderColor: '#e3d1e4',
                }}
              />
              <View style={styles.walletItemWrapper}>
                <Text style={styles.priceText}>Debit</Text>
                <Text style={styles.priceNumberText}>
                  {wallet.data.total_debit ? wallet.data.total_debit : 0}
                </Text>
              </View>
            </View>
            {wallet.data.wallet ? (
              wallet.data.wallet[0].length > 0 ? (
                <Pressable
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#e3d1e4',
                  }}
                  onPress={() => nav.showDataTable()}>
                  <View style={styles.detailMain}>
                    <Text style={styles.detailText}>More Details</Text>
                  </View>
                </Pressable>
              ) : null
            ) : null}
          </>
        ) : (
          <ActivityIndicator
            // size="large"
            size={30}
            style={{ marginVertical: 20 }}
            color="#7c2981"
          />
        )}
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
        <Pressable
          style={styles.signInBtnContainer}
          onPress={() => nav.showSaldiriContactUs()}>
          <Text style={styles.signInBtnText}>Contact Us</Text>
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
  renderUserInformation = (cart, profile) => {
    // if (
    //   cart.user_data.b_firstname ||
    //   cart.user_data.b_lastname ||
    //   cart.user_data.email
    // ) {
    if (profile.firstname) {
      return (
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              backgroundColor: '#e3d1e4',
              marginBottom: 3,
              textTransform: 'capitalize',
            }}>
            {profile.firstname + ' ' + profile.lastname}
          </Text>
          <Text style={{ textAlign: 'center', backgroundColor: '#e3d1e4' }}>
            {profile.email}
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
    } else return;
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
  renderSignedIn = (auth, cart, profile) => {
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
            <FastImage
              source={require('../assets/siraan_logo.png')}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          {/* <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',backgroundColor:'#e3d1e4',}}>
                   Michelangelo Flores
              </Text>
          <Text  style={{textAlign:'center',backgroundColor:'#e3d1e4'}}>
                   michelangeloflores@gmail.com
              </Text> */}

          {!auth.logged ? (
            <View style={{ ...styles.signInButtons, flexDirection: 'row' }}>
              <Pressable
                onPress={() => nav.showLogin({ radioChecked: 'login' })}
                style={{
                  ...styles.btn,
                  backgroundColor: '#6d3075',
                  marginHorizontal: 5,
                }}>
                <Text style={{ ...styles.btnText, color: '#fff' }}>
                  {i18n.t('Sign in')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => nav.showLogin({ radioChecked: 'signup' })}
                style={{
                  ...styles.btn,
                  backgroundColor: '#6d3075',
                  marginHorizontal: 5,
                }}>
                <Text style={{ ...styles.btnText, color: '#fff' }}>
                  {i18n.t('Sign up')}
                </Text>
              </Pressable>
              {/* <Pressable
              onPress={() => nav.showRegistration()}
              style={styles.btn}>
              <Text style={styles.btnText}>{i18n.t('Registration')}</Text>
            </Pressable> */}
            </View>
          ) : (
            this.renderUserInformation(cart, profile)
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
    const {
      profile,
      pages,
      auth,
      cart,
      authActions,
      settings,
      wallet,
      walletActions,
    } = this.props;
    return (
      <>
        <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {this.renderSignedIn(auth, cart, profile)}

            {auth.logged && this.renderWallet(wallet, profile, walletActions)}
            {settings.languageCurrencyFeatureFlag &&
              this.renderSettings(settings)}

            {auth.logged && this.renderSignedInMenu(authActions)}

            {profile.user_type === USER_TYPE_VENDOR &&
              this.renderVendorFields()}

            {this.renderPages(pages)}
          </ScrollView>
        </SafeAreaView>
      </>
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
    wallet: state.wallet,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch),
  }),
)(ProfileEdit);
