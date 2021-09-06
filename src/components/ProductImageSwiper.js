import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Pressable, Image, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import * as nav from '../services/navigation';
import FastImage from 'react-native-fast-image';

const styles = EStyleSheet.create({
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});

const SwiperWrapper = ({ children }) => {
  return (
    <Swiper horizontal={true} height={300} removeClippedSubviews={false}>
      {children.map((img, index) => (
        <Pressable
          key={index}
          onPress={() => {
            nav.showGallery({
              images: [...children],
              activeIndex: index,
            });
          }}>
          <FastImage
            source={{ uri: img }}
            style={styles.productImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>
      ))}
    </Swiper>
  );
};

const MemoizedSwiperWrapper = React.memo(SwiperWrapper);
export default MemoizedSwiperWrapper;
