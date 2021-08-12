import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const BackgroundAuthImage = () => {
  return (
    <Image
      source={{
        uri:
          'https://firebasestorage.googleapis.com/v0/b/siraan-68555.appspot.com/o/Path-1.png?alt=media&token=66f6cf1a-f140-4e87-9255-53d8a490bb95',
      }}
      style={styles.BackgroundAuthImage}
    />
  );
};

export { BackgroundAuthImage };

const styles = StyleSheet.create({
  BackgroundAuthImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    zIndex: -100,
    elevation: -100,
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: -100,
    // justifyContent: 'flex-end',
    // backgroundColor: 'red'
  },
});
