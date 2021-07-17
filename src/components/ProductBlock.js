import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, I18nManager } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import chunk from 'lodash/chunk';
import ProductListView from './ProductListView';
import { PRODUCT_NUM_COLUMNS } from '../utils';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: '$categoriesHeaderColor',
  },
  chunk: {
    flex: 1,
    flexDirection: 'row',
  },
});

/**
 * Renders product block.
 *
 * @reactProps {string} name - Block name.
 * @reactProps {string} wrapper - Renders name if exists.
 * @reactProps {object[]} items - Products information.
 * @reactProps {function} onPress - Opens a product.
 */
export default class ProductBlock extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    name: PropTypes.string,
    wrapper: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  };

  static defaultProps = {
    items: [],
  };

  /**
   * Renders all products in the block.
   *
   * @return {JSX.Element}
   */
  renderProduct = (items, index) => (
    <View style={styles.chunk} key={index}>
      {items.map((item, chunkIndex) => (
        <ProductListView
          key={chunkIndex}
          product={{ item }}
          onPress={() => this.props.onPress(item)}
        />
      ))}
    </View>
  );

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { items, name, wrapper } = this.props;
    const itemsList = chunk(items, PRODUCT_NUM_COLUMNS).map((items, index) =>
      this.renderProduct(items, index),
    );

    return (
      <View style={styles.container}>
        {wrapper !== '' && <Text style={styles.header}>{name}</Text>}
        <Swiper
          horizontal
          height={300}
          style={styles.container}
          loadMinimal={6}>
          {itemsList}
        </Swiper>
      </View>
    );
  }
}
