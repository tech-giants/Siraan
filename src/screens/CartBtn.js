import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, I18nManager, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '../components/Icon';
import theme from '../config/theme';

const styles = EStyleSheet.create({
  container: {
    minWidth: 40,
    marginRight: -2,
  },
  containerAndroid: {
    minWidth: 40,
    minHeight: '100%',
    marginTop: 10,
    position: 'relative',
    paddingLeft: 4,
    paddingRight: 4,
  },
  btn: {
    fontSize: 28,
    position: 'relative',
    color: theme.$navBarButtonColor,
  },
  badge: {
    position: 'absolute',
    top: 0,
    [I18nManager.isRTL ? 'left' : 'right']: 3,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.$primaryColor,
  },
  badgeAndroid: {
    position: 'absolute',
    top: 0,
    [I18nManager.isRTL ? 'left' : 'right']: 3,
    minWidth: 18,
    height: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD542A',
  },
  badgeTextStyle: {
    color: '#fff',
  },
});

/**
 * Renders cart icon.
 *
 * @reactProps {object} cart - Cart information.
 */
export class CartBtn extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    cart: PropTypes.shape({
      amount: PropTypes.number,
    }),
  };

  /**
   * Renders a badge with the number of products under cart icon.
   *
   * @return {JSX.Element}
   */
  renderBadge = () => {
    const { cart } = this.props;

    const amount = Object.keys(cart.carts).reduce(
      (result, el) => result + cart.carts[el].amount,
      0,
    );

    if (!amount) {
      return null;
    }

    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.badge : styles.badgeAndroid}
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}>
        <Text style={styles.badgeTextStyle}>{amount}</Text>
      </TouchableOpacity>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <TouchableOpacity
        style={
          Platform.OS === 'ios' ? styles.container : styles.containerAndroid
        }
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}>
        <Icon name="shopping-cart" style={styles.btn} />
        {this.renderBadge()}
      </TouchableOpacity>
    );
  }
}

export default connect((state) => ({
  cart: state.cart,
}))(CartBtn);
