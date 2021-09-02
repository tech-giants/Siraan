import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  InteractionManager,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';

// Import actions.
import * as ordersActions from '../actions/ordersActions';

// Components
import Spinner from '../components/Spinner';
import EmptyList from '../components/EmptyList';
import OrderListItem from '../components/OrderListItem';
import * as nav from '../services/navigation';
import Icon from '../components/Icon';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rightArrowIcon: {
    fontSize: '1.2rem',
    color: '#7c2981',
  },
});

/**
 * Renders screen with orders list.
 *
 * @reactProps {object} ordersActions - Orders functions.
 * @reactProps {object} orders - Orders information.
 */
export class Orders extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    ordersActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    orders: PropTypes.shape({
      fetching: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
  }

  /**
   * Gets orders.
   */
  componentDidMount() {
    const { ordersActions } = this.props;
    InteractionManager.runAfterInteractions(() => {
      ordersActions.fetch();
    });
  }

  /**
   * Renders orders list.
   *
   * @return {JSX.Element}
   */
  renderList = () => {
    const { orders, ordersActions } = this.props;
    let ordersObj = orders.items;
    delete ordersObj.product_id;

    if (orders.fetching) {
      return null;
    }
    return (
      <>
        {Object.keys(ordersObj).length > 0 ? (
          Object.values(ordersObj).map((item) => {
            return (
              <OrderListItem
                key={uniqueId('oreder-i')}
                item={item}
                onPress={() => {
                  nav.pushOrderDetail(this.props.componentId, {
                    orderId: item.order_id,
                  });
                }}
              />
            );
          })
        ) : (
          <EmptyList />
        )}
        {/* <FlatList
          keyExtractor={(item, index) => `order_${index}`}
          data={[]}
          ListEmptyComponent={<EmptyList />}
          renderItem={({ item }) => (
            <OrderListItem
              key={uniqueId('oreder-i')}
              item={item}
              onPress={() => {
                nav.pushOrderDetail(this.props.componentId, {
                  orderId: item.order_id,
                });
              }}
            />
          )}
        /> */}
      </>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { orders } = this.props;
    if (orders.fetching) {
      return <Spinner visible />;
    }

    return (
      <>
        <SaldiriHeader
          midHeaderTitle="Orders"
          endComponent={
            <TouchableOpacity
              activeOpacity={2}
              style={{ paddingTop: 5, paddingHorizontal: 10, paddingBottom: 0 }}
              onPress={() => this.props.ordersActions.fetch()}>
              <Icon name="refresh" style={styles.rightArrowIcon} />
            </TouchableOpacity>
          }
        />
        <View style={styles.container}>{this.renderList()}</View>
      </>
    );
  }
}

export default connect(
  (state) => ({
    orders: state.orders,
  }),
  (dispatch) => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
  }),
)(Orders);
