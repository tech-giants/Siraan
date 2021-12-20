import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const RadioGroup = (props) => {
  let { list, selectedId, onSelect } = props;
  //   let list = [
  //     {
  //       label: 'Car',
  //       value: 'transport_car',
  //     },
  //   ];
  return (
    <View style={{ ...styles.groupWrapper, flexDirection: 'row' }}>
      {list.map((item, index) => {
        let { label, value, id } = item;
        return (
          <Pressable
            key={id}
            onPress={() => onSelect(item)}
            style={{
              ...styles.radioButton,
              backgroundColor: id === selectedId ? '#7c2981' : '#fff',
            }}>
            <Text
              style={{
                ...styles.label,
                color: id !== selectedId ? '#7c2981' : '#fff',
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  groupWrapper: {},
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#7c2981',
    justifyContent: 'center',
    // marginVertical: 5,
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    // fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
