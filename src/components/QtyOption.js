import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  btnGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  btn: {
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    backgroundColor: 'transparent',
    color: '#989898',
    fontSize: '1.4rem',
    marginTop: -4,
    marginRight: -1,
  },
  valueText: {
    color: '#989898',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: 36,
    textAlign: 'center',
  },
});

/**
 * Renders the option to select the quantity of products.
 *
 * @reactProps {number} step - Quantity change step.
 * @reactProps {number} min - Minimum order quantity.
 * @reactProps {number} initialValue - The initial quantity of items in the cart.
 * @reactProps {number} max - Maximum order quantity.
 * @reactProps {function} onChange - Changes the quantity of products.
 */
export const QtyOption = ({ initialValue, step, onChange, max, min }) => {
  /**
   * Reduces the quantity of products.
   */
  const dicrement = () => {
    const newProductsAmount = initialValue - step;

    if (min !== 0 && newProductsAmount < min) {
      return;
    }

    onChange(newProductsAmount);
  };

  /**
   * Increases the quantity of products.
   */
  const increment = () => {
    const newProductsAmount = initialValue + step;

    if (newProductsAmount > max) {
      return;
    }

    onChange(newProductsAmount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btn} onPress={dicrement}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.valueText}>{initialValue}</Text>
        <TouchableOpacity style={styles.btn} onPress={increment}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
