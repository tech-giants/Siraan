import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';

// Import actions.
import * as authActions from '../actions/authActions';
import * as cartActions from '../actions/cartActions';
import { objectToQuerystring } from '../utils/index';
import * as nav from '../services/navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export class SettlementsCompleteWebView extends Component {
  static propTypes = {
    return_url: PropTypes.string,
    payment_url: PropTypes.string,
    orderId: PropTypes.number,
    cartActions: PropTypes.shape({
      clear: PropTypes.func,
    }),
  };

  onNavigationStateChange = ({ nativeEvent }, cart) => {
    const { return_url, cartActions, orderId, cancel_url } = this.props;

    if (
      nativeEvent.url &&
      return_url &&
      nativeEvent.url.toLowerCase().startsWith(return_url.toLowerCase())
    ) {
      cartActions.clear(cart);
      nav.pushCheckoutComplete(this.props.componentId, { orderId });
    }

    if (
      nativeEvent.url &&
      cancel_url &&
      nativeEvent.url.toLowerCase().startsWith(cancel_url.toLowerCase())
    ) {
      Navigation.pop(this.props.componentId);
    }
  };

  render() {
    const { payment_url, query_parameters, cart } = this.props;
    let url = payment_url;

    if (Object.keys(query_parameters)?.length) {
      url = `${url}?${objectToQuerystring(query_parameters)}`;
    }

    return (
      <View style={styles.container}>
        <WebView
          useWebKit
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          source={{
            uri: url,
          }}
          onLoadStart={(e) => this.onNavigationStateChange(e, cart)}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
  }),
)(SettlementsCompleteWebView);
