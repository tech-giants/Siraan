import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, I18nManager } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  blockHeader: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '$darkColor',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  btn: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '$grayColor',
  },
  btnText: {
    fontSize: '0.8rem',
  },
});

/**
 * Renders a block with a list of pages.
 *
 * @reactProps {string} name - Block name.
 * @reactProps {string} wrapper - Renders name if exists.
 * @reactProps {object[]} items - Pages information.
 * @reactProps {function} onPress - Opens a page.
 */
export default class BannerBlocks extends Component {
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
   * Renders item.
   *
   * @param {object} item - Page information.
   * @param {number} index - Page index.
   */
  renderItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.btn}
      onPress={() => this.props.onPress(item)}>
      <Text style={styles.btnText}>{item.page}</Text>
    </TouchableOpacity>
  );

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { items, name, wrapper } = this.props;
    const itemsList = items.map((item, index) => this.renderItem(item, index));
    return (
      <View style={styles.container}>
        {wrapper !== '' && <Text style={styles.blockHeader}>{name}</Text>}
        {itemsList}
      </View>
    );
  }
}
