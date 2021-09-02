import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, I18nManager, Pressable,ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import chunk from 'lodash/chunk';
import ProductListView from './ProductListView';
import { PRODUCT_NUM_COLUMNS } from '../utils';
import SaldiriProductGrid from './SaldiriComponents/SaldiriProductGrid';
import * as nav from '../services/navigation'

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
    paddingBottom:5 ,
    borderColor: '#ddcbde',
    borderTopWidth: 0.8,
    // borderBottomWidth: 0.8,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    // fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5,
    // paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: '$categoriesHeaderColor',
    overflow: 'visible',
    flex: 1,

  },
  chunk: {
    // flex: 1,
    flexDirection: 'row',
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
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} key={index}>
      <View style={styles.chunk}>
        {items.map((item, chunkIndex) => (
          <ProductListView
            key={chunkIndex}
            product={{ item }}
            onPress={() => this.props.onPress(item)}
          />
        ))}
      </View>
    </ScrollView>
  );

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { items, name, wrapper } = this.props;
    // const itemsList = chunk(items, PRODUCT_NUM_COLUMNS)
    const itemsList = chunk(items, 6)
      .slice(0, 1)
      .map((items, index) => this.renderProduct(items, index));
    return (
      <View style={styles.container}>
        <View style={styles.ProductGridHeaderCont}>
          {wrapper !== '' && (
            <Text numberOfLines={1} style={styles.header}>
              {name}
            </Text>
          )}
          <Pressable
            onPress={() => {
              nav.pushAllProducts('HOME_SCREEN', {
                allProducts: items,
                title: name,
              });
            }}
            style={styles.ProductGridHeaderShowMoreBtn}>
            <Text style={styles.ProductGridHeaderShowMoreBtnText}>
              show more
            </Text>
          </Pressable>
        </View>
        {itemsList}

        {/* <Swiper
          horizontal
          height={300}
          style={styles.container}
          loadMinimal={6}>
          {itemsList}
        </Swiper> */}
      </View>
    );
  }
}
