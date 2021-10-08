import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  InteractionManager,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SaldiriHeader from '../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';

// Import actions.
import * as ordersActions from '../actions/ordersActions';

// Components
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
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
          data={orders.items}
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
            midHeaderTitle="Orders"
            endComponent={
              <TouchableOpacity
                activeOpacity={2}
                style={{
                  paddingTop: 5,
                  paddingHorizontal: 10,
                  paddingBottom: 0,
                }}
                onPress={() => this.props.ordersActions.fetch()}>
                <Icon name="refresh" style={styles.rightArrowIcon} />
              </TouchableOpacity>
            }
          />
          <View style={styles.container}>{this.renderList()}</View>
        </SafeAreaView>
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
