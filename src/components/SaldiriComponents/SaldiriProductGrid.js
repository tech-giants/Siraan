import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductListView from '../ProductListView';

const SaldiriProductGrid = ({items, data, onPressFunction }) => {
    // console.log('saldiri  data =====================================================================================================================',data[0][0])
  return (
    <>
      {/* <View style={styles.chunk} key={index}> */}
      {items.map((item, chunkIndex) => (
        <ProductListView
          key={chunkIndex}
          product={{ item }}
          onPress={() => onPressFunction(item)}
        />
      ))}
      {/* </View> */}
      {/* <FlatList
        data
        renderItem={({ item }) => <Text>{item[0].product}</Text>}
        numColumns={2}
      /> */}
    </>
  );
};

export default SaldiriProductGrid;
