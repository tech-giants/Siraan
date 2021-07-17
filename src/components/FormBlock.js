import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from './Button';

const styles = EStyleSheet.create({
  container: {
    margin: 0,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  containerSimple: {
    padding: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  header: {
    marginBottom: 14,
    fontWeight: 'bold',
    fontSize: '0.9rem',
    textAlign: 'left',
  },
  btnWrapper: {
    marginTop: 14,
    marginBottom: 14,
  },
});

/**
 * Renders a block of form.
 *
 * @reactProps {string} buttonText - Button text.
 * @reactProps {string} title - Block title.
 * @reactProps {function} onShowMorePress - Opens or closes a block.
 * @reactProps {boolean} noContainerStyle - Block styles flag.
 * @reactProps {JSX.Element} simpleView - Standard form.
 */
export default class FormBlock extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.node,
    ]),
    buttonText: PropTypes.string,
    title: PropTypes.string,
    onShowMorePress: PropTypes.func,
    noContainerStyle: PropTypes.bool,
    simpleView: PropTypes.shape(),
  };

  /**
   * @ignore
   */
  static defaultProps = {
    onShowMorePress: () => {},
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
    };
  }

  /**
   * Renders Title
   *
   * @return {JSX.Element}
   * @return {null}
   */
  renderTitle() {
    const { title } = this.props;
    if (!title) {
      return null;
    }

    return <Text style={styles.header}>{title.toUpperCase()}</Text>;
  }

  /**
   * Renders the content of the block.
   *
   * @return {JSX.Element}
   */
  renderContent() {
    const { buttonText, children, simpleView, onShowMorePress } = this.props;
    const { showMore } = this.state;

    if (buttonText && !showMore) {
      return (
        <View>
          {simpleView}
          <View style={styles.btnWrapper}>
            <Button
              onPress={() => {
                onShowMorePress();
                this.setState({
                  showMore: !showMore,
                });
              }}>
              {buttonText.toUpperCase()}
            </Button>
          </View>
        </View>
      );
    }
    return <View>{children}</View>;
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { noContainerStyle } = this.props;
    return (
      <View
        style={[styles.container, noContainerStyle && styles.containerSimple]}>
        {this.renderTitle()}
        {this.renderContent()}
      </View>
    );
  }
}
