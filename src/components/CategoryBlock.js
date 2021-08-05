import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import orderBy from 'lodash/orderBy';

import CategoryListView from './CategoryListView';
import i18n from '../utils/i18n';
import * as nav from '../services/navigation';

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
    // fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5,
    // paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '$categoriesHeaderColor',
    overflow: 'visible',
    // backgroundColor: 'red',
    // width: '80%',
    flex:1,
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
    fontSize: 11,
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
    location: PropTypes.string,
    listStyleType: PropTypes.string,
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
    const { items, wrapper, onPress, location, listStyleType } = this.props;

    if (!items.length) {
      return null;
    }

    const itemsList = orderBy(items, (i) => parseInt(i.position, 10), ['asc'])
      .slice(0, 5)
      .map((item, index) => (
        <ScrollView horizontal={true}>
          <CategoryListView
            listStyleType={listStyleType}
            category={item}
            onPress={() => onPress(item)}
            key={index}
          />
        </ScrollView>
      ));

    return (
      <>
        <View style={styles.container}>
          <View style={styles.ProductGridHeaderCont}>
            {wrapper !== '' && (
              <Text numberOfLines={1} style={styles.header}>{i18n.t('Categories')}</Text>
            )}
            {location && location === 'Layouts' ? (
              <Pressable
                // onPress={() => nav.showCategoriesHub(items)}
                onPress={() => nav.selectTab('search')}
                style={styles.ProductGridHeaderShowMoreBtn}>
                <Text style={styles.ProductGridHeaderShowMoreBtnText}>
                  show more
                </Text>
              </Pressable>
            ) : null}
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {itemsList}
          </ScrollView>
          {/* <View style={styles.wrapper}>{itemsList}</View> */}
        </View>
      </>
    );
  }
}
