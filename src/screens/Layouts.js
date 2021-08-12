import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import get from 'lodash/get';
import { MenuProvider } from 'react-native-popup-menu';
import FastImage from 'react-native-fast-image'

// Constants
import {
  BLOCK_BANNERS,
  BLOCK_CATEGORIES,
  BLOCK_PRODUCTS,
  BLOCK_PAGES,
  BLOCK_VENDORS,
} from '../constants';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';
import * as layoutsActions from '../actions/layoutsActions';

// Components
import Spinner from '../components/Spinner';
import BannerBlock from '../components/BannerBlock';
import VendorBlock from '../components/VendorBlock';
import PageBlock from '../components/PageBlock';
import ProductBlock from '../components/ProductBlock';
import CategoryBlock from '../components/CategoryBlock';
import PushNotificaitons from '../components/PushNotifications';
import { toArray } from '../utils';
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import config from '../config';
import * as nav from '../services/navigation';
// saldiri components
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
// menu import
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import TopCircles from '../components/SaldiriComponents/TopCircles';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  HeaderSearchCont: {
    backgroundColor: '#fff',
    flex: 1,
    // marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    width: '95%',
    // height: 50,
  },
  headerLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
    borderColor: '#7c2981',
    borderWidth: 0.7,
  },
  topCirclesWrapper: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#7c2981',
    borderWidth: 1,
    width: 60,
    height: 60,
    marginTop: 10,
  },
  topCirclesPressable: {
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 6,
    justifyContent: 'center'
  },
});

/**
 * Renders main screen.
 *
 * @reactProps {object} layoutsActions - Layouts actions.
 * @reactProps {object} notifications - Notifications information.
 * @reactProps {object} notificationsActions - Notifications actions.
 * @reactProps {object} navigator - Navigator.
 * @reactProps {object} layouts - Information about blocks for rendering.
 */
export class Layouts extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    layoutsActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
    notifications: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    notificationsActions: PropTypes.shape({
      hide: PropTypes.func,
    }),
    layouts: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.isFetchBlocksSend = false;
    this.pushNotificationListener = null;
    this.pushNotificationOpenListener = null;
    this.backToHomeScreenHandler = null;

    this.state = {
      refreshing: false,
      change_props: true,
    };
  }

  /**
   * Sets titles. Gets layouts. Registers 2 event listeners for notifications.
   * 1. Shows notifications if they came.
   * 2. Listens to click on notification.
   */
  componentDidMount() {
    const { layoutsActions, componentId } = this.props;
    // Listener for home button. Returns to home screen.
    this.backToHomeScreenHandler = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex === 0 && unselectedTabIndex === 0) {
          Navigation.popToRoot(componentId);
        }
      },
    );
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: false,
        title: {
          text: config.shopName.toUpperCase(),
        },
      },
    });

    layoutsActions.fetch();

    if (config.pushNotifications) {
      PushNotificaitons.Init();
      this.pushNotificationListener = PushNotificaitons.RegisterPushListener(
        componentId,
      );
    }
  }

  /**
   * Shows and hides notifications.
   */
  componentWillReceiveProps(nextProps) {
    const { notificationsActions } = this.props;

    if (nextProps.notifications.items.length) {
      const notify =
        nextProps.notifications.items[nextProps.notifications.items.length - 1];
      Navigation.showOverlay({
        component: {
          name: 'Notification',
          passProps: {
            title: notify.title,
            type: notify.type,
            text: notify.text,
          },
          options: {
            layout: {
              componentBackgroundColor: 'transparent',
            },
            overlay: {
              interceptTouchOutside: false,
            },
          },
        },
      });
      notificationsActions.hide(notify.id);
    }
  }

  /**
   * Removes event listeners for notifications.
   */
  componentWillUnmount() {
    if (config.pushNotifications) {
      this.pushNotificationListener();
    }
    this.backToHomeScreenHandler.remove();
  }

  /**
   * Renders layout.
   *
   * @param {object} block - Layout information.
   * @param {number} index - Layout index.
   *
   * @return {JSX.Element}
   */
  renderBlock = (block, index) => {
    if (!get(block, 'content.items')) {
      return null;
    }

    // const items =
    //   block.name == 'Featured Products' ||
    //   block.name == 'Main banners' ||
    //   block.name == 'Categories'
    //     ? toArray(block.content.items)
    //     : [];
    const items = toArray(block.content.items);
    // console.log('layout item array ===>>>', items)
    switch (block.type) {
      case BLOCK_CATEGORIES:
        // console.log('wrapper cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc', block.wrapper)
        // console.log('items cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc', items)
        // console.log(
        //   'subcategories cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        //   items[0].subcategories[0].subcategories,
        // );
        return (
          <CategoryBlock
            listStyleType="designed"
            location="Layouts"
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(category) => {
              nav.pushCategory(this.props.componentId, { category });
            }}
            key={index}
          />
        );
      case BLOCK_PRODUCTS:
        return (
          <>
            {/* {console.log(
              'product dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              items[0],
            )} */}
            <ProductBlock
              name={block.name}
              wrapper={block.wrapper}
              items={items}
              onPress={(product) => {
                nav.pushProductDetail(this.props.componentId, {
                  pid: product.product_id,
                });
              }}
              key={index}
            />
          </>
        );
      case BLOCK_BANNERS:
        return (
          <>
            <BannerBlock
              name={block.name}
              wrapper={block.wrapper}
              items={items}
              onPress={(banner) => {
                registerDrawerDeepLinks(
                  {
                    link: banner.url,
                    payload: {
                      ...banner,
                      title: banner.banner,
                    },
                  },
                  this.props.componentId,
                );
              }}
              key={index}
            />
          </>
        );

      case BLOCK_PAGES:
        return (
          <PageBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(page) => {
              nav.showPage(this.props.componentId, {
                uri: `${config.siteUrl}index.php?dispatch=pages.view&page_id=${page.page_id}`,
                title: page.page,
              });
            }}
            key={index}
          />
        );

      case BLOCK_VENDORS:
        return (
          <VendorBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(vendor) => {
              nav.showModalVendor({
                companyId: vendor.company_id,
                company: vendor.company,
              });
            }}
            key={index}
          />
        );

      default:
        return null;
    }
  };

  onRefresh() {
    const { layoutsActions } = this.props;
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      layoutsActions.fetch(undefined, true);
    }, 1000);
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  SaldiriMenu() {
    return (
      <Menu>
        <MenuTrigger>
          <Entypo
            style={{ margin: 5 }}
            name="dots-three-vertical"
            size={20}
            color="#fff"
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => nav.selectTab('home')} text="Home" />
          <MenuOption
            onSelect={() => nav.selectTab('search')}
            text="Categories"
          />
          <MenuOption onSelect={() => nav.selectTab('cart')} text="Cart" />
          <MenuOption
            onSelect={() => nav.selectTab('favorite')}
            text="Wish List"
          />
          <MenuOption
            onSelect={() => nav.selectTab('profile')}
            text="My Account"
          />
        </MenuOptions>
      </Menu>
    );
  }

  render() {
    const { layouts } = this.props;
    // console.log(
    //   'layout page 304 =======____________________________________________________________________________>>',
    //   layouts.blocks[0],
    // );
    const blocksList = layouts.blocks.map((block, index) => {
      // if( block.name == 'Featured Products' ||
      // block.name == 'Main banners' ||
      // block.name == 'Categories'){
      if (block.name == 'Categories' && this.state.change_props) {
        // if (this.state.change_props) {
        // console.log("I am inside ifffffffffffffffffffff ");
        Navigation.updateProps('SEARCH_SCREEN', {
          data: block.content.items,
        });
        this.setState({ change_props: false });
        // }
      }
      return this.renderBlock(block, index);
      // }
    });
    // console.log('blocklist  +++++++++++++++++++++++++++ ', blocksList);

    // if (layouts.fetching) {
    //   return <Spinner visible />;
    // }

    // const topCirclesArr = [
    //   {
    //     title: 'Discounts',
    //     image: require('../assets/topCircle1.jpg'),
    //     onpress: () => {
    //       nav.pushCirclesLayouts('HOME_SCREEN', {
    //         // allProducts: items,
    //         // title: name,
    //       });
    //       // console.log('item==>>>', items[0])
    //     },
    //   },
    //   {
    //     title: 'Newest',
    //     image: require('../assets/topCircle2.jpg'),
    //     onpress: () => {},
    //   },
    //   {
    //     title: 'Populer',
    //     image: require('../assets/topCircle3.jpg'),
    //     onpress: () => {},
    //   },
    //   {
    //     title: 'Top Rated',
    //     image: require('../assets/bag.jpeg'),
    //     onpress: () => {},
    //   },
    //   {
    //     title: 'Featured',
    //     image: require('../assets/topCircle4.jpg'),
    //     onpress: () => {},
    //   },
    //   {
    //     title: 'Others',
    //     image: require('../assets/topCircle5.png'),
    //     onpress: () => {},
    //   },
    // ];

    return (
      <>
        <MenuProvider>
          <StatusBar backgroundColor="#7c2981" barStyle="dark-light" />
          <View style={styles.container}>
            <SaldiriHeader
              startComponent={
                <Pressable
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  onPress={() => nav.showQrScanner()}>
                  <FastImage
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    source={require('../assets/ic_qrcode.png')}
                  />
                  {/* {/ <MaterialIcons name="qr-code" size={30} color="#a26ea6" /> /} */}
                </Pressable>
              }
              colored={true}
              midComponent={
                <Pressable
                  onPress={() => nav.showSearch()}
                  style={styles.HeaderSearchCont}>
                  <Text
                    style={{ fontSize: 15, color: '#a26ea6', marginLeft: 10 }}>
                    Search in Siraan
                  </Text>
                  <MaterialIcons name="search" size={30} color="#a26ea6" />
                </Pressable>
              }
              endComponent={this.SaldiriMenu()}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }>
              <View
                style={{
                  padding: 20,
                  backgroundColor: '#E3D1E4',
                  width: '100%',
                }}></View>
              <View
                style={{
                  // paddingVertical: 0.5,
                  // shadowColor: '#707070',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 1,
                  // },
                  // shadowOpacity: 0.22,
                  // shadowRadius: 2.22,
                  // elevation: 3,
                  width: '100%',
                  borderColor: '#707070',
                  borderBottomWidth: 0.5,
                  height: 0.5,
                  marginTop: 10,
                }}
              />
              <TopCircles />
              {/* <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {topCirclesArr.map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      style={styles.topCirclesPressable}
                      onPress={item.onpress()}>
                      <View style={styles.topCirclesWrapper}>
                        <Image style={styles.headerLogo} source={item.image} />
                      </View>
                      <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                        {item.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView> */}
              <View
                style={{
                  paddingVertical: 0.1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  width: '100%',
                  borderColor: '#ccc',
                  borderBottomWidth: 1,
                  height: 0.1,
                  marginTop: 10,
                }}
              />
              {layouts.fetching ? <Spinner visible /> : blocksList}
            </ScrollView>
          </View>
        </MenuProvider>
      </>
    );
  }
}

export default connect(
  (state) => ({
    notifications: state.notifications,
    layouts: state.layouts,
  }),
  (dispatch) => ({
    layoutsActions: bindActionCreators(layoutsActions, dispatch),
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
  }),
)(Layouts);
