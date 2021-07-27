import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import orderBy from 'lodash/orderBy';

import CategoryListView from './CategoryListView';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$categoriesBackgroundColor',
    padding: 5,
    paddingTop: 5,
    paddingBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    alignItems: 'stretch',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '$categoriesHeaderColor',
    textAlign: 'left',
  },
  ProductGridHeaderCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  ProductGridHeaderShowMoreBtnText: {
    textTransform: 'uppercase',
    fontSize: '0.7rem',
  },
});

/**
 * Renders a block with product categories.
 *
 * @reactProps {string} name - Block name.
 * @reactProps {string} wrapper - If passed, then the block name is rendered.
 * @reactProps {objects[]} items - An array of objects describing each category.
 * @reactProps {function} onPress - Push function.
 */
export default class CategoriesBlocks extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    wrapper: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    items: [],
  };

  /**
   * Renders component.
   *
   * @returns {JSX.Element}
   */
  render() {
    const { items, wrapper, onPress } = this.props;

    if (!items.length) {
      return null;
    }

    const itemsList = orderBy(items, (i) => parseInt(i.position, 10), [
      'asc',
    ]).slice(0,3).map((item, index) => (
      <CategoryListView
        category={item}
        onPress={() => onPress(item)}
        key={index}
      />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.ProductGridHeaderCont}>
          {wrapper !== '' && (
            <Text style={styles.header}>{i18n.t('Categories')}</Text>
          )}
          <Pressable style={styles.ProductGridHeaderShowMoreBtn}>
            <Text style={styles.ProductGridHeaderShowMoreBtnText}>
              show more
            </Text>
          </Pressable>
        </View>

        <View style={styles.wrapper}>{itemsList}</View>
      </View>
    );
  }
}
