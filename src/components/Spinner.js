import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

/**
 * Renders spinner.
 *
 * @reactProps {boolean} visible -
 */
class Spinner extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    visible: PropTypes.bool,
    mode: PropTypes.string,
  };

  static defaultProps = {
    mode: 'content',
    visible: false,
  };

  /**
   * Render the spinner as a modal.
   *
   * @return {JSX.Element}
   */
  renderAsModal = () => {
    const { visible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {}}>
        <View style={styles.container}>
          <ActivityIndicator
            color="white"
            size="large"
            style={styles.indicator}
          />
        </View>
      </Modal>
    );
  };

  /**
   * Render the spinner as a content.
   *
   * @return {JSX.Element}
   */
  renderAsContent = () => {
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <View style={styles.contentContainer}>
        <ActivityIndicator
          size="large"
          style={styles.indicator}
          color="black"
        />
      </View>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { mode } = this.props;
    if (mode === 'content') {
      return this.renderAsContent();
    }
    return this.renderAsModal();
  }
}

export default Spinner;
