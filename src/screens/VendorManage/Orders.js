import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Swipeout from 'react-native-swipeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';

// Styles
import theme from '../../config/theme';

// Import actions.
import * as notificationsActions from '../../actions/notificationsActions';
import * as ordersActions from '../../actions/vendorManage/ordersActions';

// Components
import Spinner from '../../components/Spinner';
import EmptyList from '../../components/EmptyList';
import OrderListItem from '../../components/OrderListItem';

import i18n from '../../utils/i18n';
import * as nav from '../../services/navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

/**
 * Renders orders screen.
 *
 * @reactProps {object} ordersActions - Orders actions.
 * @reactProps {object} notifications - Notifications information.
 * @reactProps {object} notificationsActions - Notifications actions.
 * @reactProps {boolean} hasMore - Are there any more orders.
 * @reactProps {number} page - Page number.
 * @reactProps {object} orders - Orders information.
 */
export class Orders extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    ordersActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
    notifications: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    notificationsActions: PropTypes.shape({
      hide: PropTypes.func,
    }),
    hasMore: PropTypes.bool,
    page: PropTypes.number,
    orders: PropTypes.shape({
      loading: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    this.orderID = 0;
  }

  /**
   * Gets orders. Sets top bar options.
   */
  componentDidMount() {
    const {
      ordersActions,
      orders: { page },
    } = this.props;
    ordersActions.fetch(page);
    ordersActions.getOrderStatuses();
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Vendor Orders').toUpperCase(),
        },
      },
    });
  }

  /**
   * Stops refreshing.
   */
  componentWillReceiveProps() {
    this.setState({
      refreshing: false,
    });
  }

  /**
   * Opens action sheet element if click 'status' after swipeout.
   *
   * @param {number} id - Order id.
   */
  showActionSheet = (id) => {
    this.orderID = id;
    this.ActionSheet.show();
  };

  /**
   * Refreshes screen.
   */
  handleRefresh = () => {
    const { ordersActions } = this.props;
    this.setState({
      refreshing: true,
    });

    ordersActions.fetch(0);
  };

  /**
   * Loads more orders.
   */
  handleLoadMore = () => {
    const {
      ordersActions,
      orders: { hasMore, page },
    } = this.props;

    if (!hasMore) {
      return;
    }

    ordersActions.fetch(page);
  };

  /**
   * Updates status of order.
   *
   * @param {number} index - Order index.
   */
  handleChangeStatus = (index) => {
    const { ordersActions, orders } = this.props;

    if (orders.orderStatuses[index]) {
      ordersActions.updateVendorOrderStatus(
        this.orderID,
        orders.orderStatuses[index].status,
      );
    }
  };

  /**
   * Renders item.
   * @param {object} item - Order information.
   *
   * @return {JSX.Element}
   */
  renderItem = ({ item }) => {
    const swipeoutBtns = [
      {
        text: i18n.t('Status'),
        type: 'status',
        backgroundColor: '#ff6002',
        onPress: () => this.showActionSheet(item.order_id),
      },
    ];

    return (
      <Swipeout
        autoClose
        right={swipeoutBtns}
        backgroundColor={theme.$navBarBackgroundColor}>
        <OrderListItem
          key={String(item.order_id)}
          item={item}
          onPress={() => {
            nav.pushVendorManageOrderDetail(this.props.componentId, {
              orderId: item.order_id,
            });
          }}
        />
      </Swipeout>
    );
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { orders } = this.props;
    const { refreshing } = this.state;

    if (orders.loading || !orders.orderStatuses) {
      return <Spinner visible />;
    }

    const orderStatusesList = [
      ...orders.orderStatuses.map((item) => item.description),
      i18n.t('Cancel'),
    ];

    const ORDER_STATUSES_CANCEL_INDEX = orderStatusesList.length - 1;

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `order_${index}`}
          data={orders.items}
          ListEmptyComponent={<EmptyList />}
          renderItem={this.renderItem}
          onEndReached={this.handleLoadMore}
          refreshing={refreshing}
          onRefresh={() => this.handleRefresh()}
        />
        <ActionSheet
          ref={(ref) => {
            this.ActionSheet = ref;
          }}
          options={orderStatusesList}
          cancelButtonIndex={ORDER_STATUSES_CANCEL_INDEX}
          onPress={this.handleChangeStatus}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    orders: state.vendorManageOrders,
    notifications: state.notifications,
  }),
  (dispatch) => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(Orders);
