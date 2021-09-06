import React from 'react';
import { Text, Pressable, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from './Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = EStyleSheet.create({
  itemWrapper: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '1rem',
    paddingVertical: '0.7rem',
    marginLeft: '1.2rem',
    marginRight: '1.2rem',
    borderBottomWidth: 1,
    borderColor: '#AC78B0',
  },
  itemText: {
    color: '$menuTextColor',
    fontSize: '0.9rem',
  },
});

export const RadioButtonItem = ({ item, onPress, title }) => {
  return (
    <>
      <Pressable
        onPress={() => onPress && onPress(item)}
        style={styles.itemWrapper}>
        <Text style={styles.itemText}>{title}</Text>
        {item.selected && (
          <Ionicons name="checkmark-circle-sharp" color="#7c2981" size={25} />
        )}
      </Pressable>
    </>
  );
};
