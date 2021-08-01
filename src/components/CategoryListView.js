import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getImagePath } from '../utils';

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
    width: 160,
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
    overflow: 'hidden'
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
    resizeMode: 'contain',
    // backgroundColor: '#7c2981',
    borderRadius: 10,
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
    textAlign: 'center',
    fontSize: '1rem',
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '$categoryBlockBackgroundColor',
    color: '$categoryBlockTextColor',
    fontWeight: 'bold',
    borderRadius: 10,
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
        style={ styles.container
        }
        onPress={() => onPress(category)}>
        <View style={styles.wrapper}>
          <View style={styles.categoryTitleWrapper}>
            <Text numberOfLines={3} style={styles.categoryTitle}>
              {category.category}
            </Text>
          </View>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.categoryImage} />
          ) : (
            <Image
              source={require('../assets/siraan_logo.png')}
              style={styles.categoryImage}
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
