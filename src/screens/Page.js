import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { WebView } from 'react-native-webview';
import { Navigation } from 'react-native-navigation';
import { iconsMap } from '../utils/navIcons';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
  },
});

/**
 * Renders page from server.
 *
 * @reactProps {string} uri - Link to the page.
 */
export class Page extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    uri: PropTypes.string,
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  /**
   * Sets header options.
   */
  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });
  }

  /**
   * Page modal navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { uri } = this.props;
    return (
      <View style={styles.container}>
        <WebView
          useWebKit={true}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          userAgent="Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36"
          source={{
            uri,
          }}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  auth: state.auth,
}))(Page);
