import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import get from 'lodash/get';

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

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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

    const items = toArray(block.content.items);
    switch (block.type) {
      case BLOCK_BANNERS:
        return (
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
        );

      case BLOCK_PRODUCTS:
        return (
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
        );

      case BLOCK_CATEGORIES:
        return (
          <CategoryBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(category) => {
              nav.pushCategory(this.props.componentId, { category });
            }}
            key={index}
          />
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
  render() {
    const { layouts } = this.props;
    const blocksList = layouts.blocks.map((block, index) =>
      this.renderBlock(block, index),
    );

    if (layouts.fetching) {
      return <Spinner visible />;
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }>
        {blocksList}
      </ScrollView>
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
