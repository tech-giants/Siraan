import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import * as nav from '../services/navigation';

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
        <TouchableOpacity
          key={index}
          onPress={() => {
            nav.showGallery({
              images: [...children],
              activeIndex: index,
            });
          }}>
          <Image source={{ uri: img }} style={styles.productImage} />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

const MemoizedSwiperWrapper = React.memo(SwiperWrapper);
export default MemoizedSwiperWrapper;
