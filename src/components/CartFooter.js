import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from './Button';
import i18n from '../utils/i18n';
import { formatPrice } from '../utils';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: 14,
    width: '100%',
  },
  cartInfoTitle: {
    color: '#979797',
    fontSize: 18,
  },
  cartInfoTotal: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'red',
  },
  placeOrderBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalPriceWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
  },
  btn: {
    backgroundColor: '#7c2981',
    padding: 5,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    width: '100%',
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
  },
});

/**
 * Cart footer.
 *
 * @reactProps {string} totalPrice - The total amount of the order.
 * @reactProps {string} btnText - Text on the footer button.
 * @reactProps {function} onBtnPress - Push function.
 * @reactProps {boolean} isBtnDisabled - Button activity flag.
 */
export default class extends PureComponent {
  /**
   * @ignore
   */
  static propTypes = {
    totalPrice: PropTypes.string,
    btnText: PropTypes.string,
    onBtnPress: PropTypes.func,
    isBtnDisabled: PropTypes.bool,
  };

  /**
   * Renders component.
   *
   * @returns {JSX.Element}
   */
  render() {
    const { onBtnPress, totalPrice, isBtnDisabled, btnText } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.totalPriceWrapper}>
          <Text style={styles.cartInfoTitle}>
            {i18n.t('Total').toUpperCase()}
          </Text>
          <Text style={styles.cartInfoTotal}>{formatPrice(totalPrice)}</Text>
        </View>
        <Pressable onPress={() => onBtnPress()} style={styles.btn}>
          <Text style={styles.btnText}>Check Out</Text>
        </Pressable>
      </View>
    );
  }
}
