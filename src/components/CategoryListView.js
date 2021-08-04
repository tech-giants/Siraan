import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getImagePath } from '../utils';
const windowWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  // container: {
  //   width: '33.33333%',
  //   padding: 5,
  //   shadowColor: '#E0E0E0',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 1,
  //   shadowRadius: 1,
  //   elevation: 2,
  // },
  container: {
    // backgroundColor: 'red',
    // width: '33.33333%',
    // width: 160,
    width: windowWidth/2.5,
    // padding: 5,
    // shadowColor: '#E0E0E0',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // elevation: 2,
    borderRadius: 10,
    borderColor: '#7c2981',
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 5,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,

    elevation: 7,
  },
  wrapper: {
    flex: 1,
    minHeight: 70,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '$categoryBorderRadius',
    backgroundColor: '$categoryBlockBackgroundColor',
  },
  categoryImage: {
    height: 110,
    width: '100%',
    // resizeMode: 'cover',
    // backgroundColor: '#7c2981',
    // borderRadius: 10,
  },
  categoryTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 2,
    paddingRight: 2,
    borderBottomWidth: 0.5,
    borderColor: '#7c2981',
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

/**
 * Renders a category.
 *
 * @param {string} category - Category description.
 * @param {string} onPress - Push function.
 *
 * @return {JSX.Element}
 */
const CategoryListView = ({ category, onPress, listStyleType }) => {
  const imageUri = getImagePath(category);
  return (
    <>
      <Pressable
        style={ styles.container }
        onPress={() => onPress(category)}>
        <View style={styles.wrapper}>
          <View style={styles.categoryTitleWrapper}>
            <Text numberOfLines={2} style={styles.categoryTitle}>
              {category.category}
            </Text>
          </View>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{...styles.categoryImage, resizeMode: 'cover'}} />
          ) : (
            <Image
              source={require('../assets/siraan_logo.png')}
              style={{...styles.categoryImage, resizeMode: 'contain'}}
            />
          )}
        </View>
      </Pressable>
    </>
  );
};

/**
 * @ignore
 */
CategoryListView.propTypes = {
  category: PropTypes.shape({}),
  onPress: PropTypes.func,
};

export default CategoryListView;
