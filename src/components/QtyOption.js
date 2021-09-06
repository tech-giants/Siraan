import React from 'react';
import { View, Text, Pressable, StatusBar } from 'react-native';
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
    backgroundColor: '#7C2981',
    borderRadius: 20,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '1.4rem',
    marginTop: -4,
    marginRight: -1,
  },
  valueText: {
    color: '#000',
    fontSize: '1.2rem',
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
        <Pressable style={styles.btn} onPress={dicrement}>
          <Text style={styles.btnText}>-</Text>
        </Pressable>
        <Text style={styles.valueText}>{initialValue}</Text>
        <Pressable style={styles.btn} onPress={increment}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};
