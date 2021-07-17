import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from './Icon';

const styles = EStyleSheet.create({
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '1rem',
    paddingVertical: '1.2rem',
    marginLeft: '1rem',
    borderBottomWidth: 1,
    borderColor: '$menuItemsBorderColor',
  },
  itemText: {
    color: '$menuTextColor',
    fontSize: '0.8rem',
  },
  checkIcon: {
    fontSize: '1rem',
    color: '$menuTextColor',
  },
});

export const RadioButtonItem = ({ item, onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item)}
      style={styles.itemWrapper}>
      <Text style={styles.itemText}>{title}</Text>
      {item.selected && <Icon name="check" style={styles.checkIcon} />}
    </TouchableOpacity>
  );
};
