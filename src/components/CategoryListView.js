import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getImagePath } from '../utils';

const styles = EStyleSheet.create({
  container: {
    width: '33.33333%',
    padding: 5,
    shadowColor: '#E0E0E0',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
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
    height: 100,
    width: '100%',
    resizeMode: 'contain',
  },
  categoryTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 4,
  },
  categoryTitle: {
    textAlign: 'center',
    fontSize: '0.8rem',
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '$categoryBlockBackgroundColor',
    color: '$categoryBlockTextColor',
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
const CategoryListView = ({ category, onPress }) => {
  const imageUri = getImagePath(category);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}>
      <View style={styles.wrapper}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.categoryImage} />
        ) : null}
        <View style={styles.categoryTitleWrapper}>
          <Text numberOfLines={3} style={styles.categoryTitle}>
            {category.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
