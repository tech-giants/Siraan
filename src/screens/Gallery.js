import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  BackHandler,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';

// Components
import Icon from '../components/Icon';
import { Navigation } from 'react-native-navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    width: '94%',
    height: 400,
    resizeMode: 'contain',
  },
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 0,
    right: 14,
  },
  removeBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    flex: 1,
    alignItems: 'center',
  },
  removeBtn: {
    padding: 10,
  },
  closeBtn: {
    color: 'black',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

/**
 * Renders a gallery of product images.
 *
 * @reactProps {object} navigator - Navigator.
 * @reactProps {function} onRemove - Remove function.
 * @reactProps {string[]} images - Image links.
 * @reactProps {number} activeIndex - Current image index.
 */
export default class Gallery extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    onRemove: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.string),
    activeIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.backHandler = null;
  }

  /**
   * Sets listener for Android back button.
   */
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.closeOverlay();
      return true;
    });
  }

  /**
   * Removes the listener.
   */
  componentWillUnmount() {
    this.backHandler.remove();
  }

  closeOverlay() {
    Navigation.dismissOverlay(this.props.componentId);
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { images, activeIndex, onRemove } = this.props;
    if (!images.length) {
      return null;
    }
    const items = images.map((href, index) => (
      <View style={styles.slide} key={index}>
        <Image style={styles.img} source={{ uri: href }} />
      </View>
    ));

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <Swiper horizontal index={activeIndex} loadMinimal={6}>
            {items}
          </Swiper>
          <TouchableOpacity
            style={styles.closeBtnContainer}
            onPress={() => this.closeOverlay()}>
            <Icon name="close" style={styles.closeBtn} />
          </TouchableOpacity>
          {onRemove && (
            <View style={styles.removeBtnContainer}>
              <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
                <Icon name="delete" style={styles.closeBtn} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
