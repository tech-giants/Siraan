import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  I18nManager,
  Image,
  Text,
  Pressable,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import { get } from 'lodash';
import { stripTags } from '../utils';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  imageWrapper: {
    marginTop: 5,
    marginBottom: 20,
    // backgroundColor: 'red'
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
  },
  textBannerWrapper: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textBanner: {
    textAlign: 'center',
    fontSize: '1.3rem',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '$categoriesHeaderColor',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

/**
 * Block with banners inside the swiper.
 *
 * @reactProps {string} name - Block name.
 * @reactProps {string} wrapper - If passed, then the block name is rendered.
 * @reactProps {object[]} items - An array of objects describing each banner.
 * @reactProps {function} onPress - Go to banner detail page.
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

  /**
   * @ignore
   */
  static defaultProps = {
    items: [],
  };

  /**
   * Renders image.
   *
   * @param {object} item - Banner information.
   * @param {number} index - Banner index.
   */
  renderImage = (item, index) => {
    const imageUri = get(item, 'main_pair.icon.image_path');
    const { onPress } = this.props;
    return (
      <Pressable key={index} onPress={() => onPress(item)}>
        {imageUri ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.img} />
          </View>
        ) : (
          <View style={styles.textBannerWrapper}>
            <Text style={styles.textBanner}>{stripTags(item.description)}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  /**
   * Renders component.
   *
   * @returns {JSX.Element}
   */
  render() {
    const { items, name, wrapper } = this.props;
    const itemsList = items.map((item, index) => this.renderImage(item, index));
    return (
      <View style={styles.container}>
        {wrapper !== '' && <Text style={styles.header}>{name}</Text>}
        <Swiper
          // loadMinimalLoader={<ActivityIndicator size={20} color="#7c2981" />}
          activeDot={
            <View
              style={{
                backgroundColor: '#6c007c',
                width: 22,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          horizontal
          height={200}
          loadMinimal={6}>
          {itemsList}
        </Swiper>
      </View>
    );
  }
}
