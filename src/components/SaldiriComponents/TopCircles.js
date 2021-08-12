import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  Pressable,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import * as nav from '../../services/navigation';
import FastImage from 'react-native-fast-image';

const TopCircles = () => {
  const topCirclesArr = [
    {
      title: 'Brands',
      image: require('../../assets/topCircleBrands.jpg'),
      onpress: () =>
        nav.pushBrandsShowcase('HOME_SCREEN', {
          // allProducts: items,
            title: 'Brands',
        }),
    },
    {
      title: 'Discounts',
      image: require('../../assets/topCircle1.jpg'),
      id: 'on_sale',
    },
    {
      title: 'Newest',
      image: require('../../assets/topCircle2.jpg'),
      id: 'timestamp',
    },
    {
      title: 'Popular',
      image: require('../../assets/topCircle3.jpg'),
      id: 'popularity',
    },
    {
      title: 'Best Seller',
      image: require('../../assets/bag.jpeg'),
      id: 'bestsellers',
    },
    // {
    //   title: 'Featured',
    //   image: require('../../assets/topCircle4.jpg'),
    //   id: 'featured_id',
    // },
    // {
    //   title: 'Others',
    //   image: require('../../assets/topCircle5.png'),
    //   id: 'others_id',
    // },
  ];
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {topCirclesArr.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={styles.topCirclesPressable}
              onPress={
                item.onpress
                  ? item.onpress
                  : () =>
                      nav.pushCirclesLayouts('HOME_SCREEN', {
                        // allProducts: items,
                        //   title: name,
                        id: item.id,
                        title: item.title,
                        firstLoad: true,
                      })
              }>
              <View style={styles.topCirclesWrapper}>
                <FastImage
                  style={styles.headerLogo}
                  source={item.image}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                }}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
};

export default TopCircles;

const styles = StyleSheet.create({
  topCirclesPressable: {
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  topCirclesWrapper: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#7c2981',
    borderWidth: 1,
    width: 60,
    height: 60,
    marginTop: 10,
  },
  headerLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
    borderColor: '#7c2981',
    borderWidth: 0.7,
  },
});
