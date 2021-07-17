import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  container: {
    width,
    minHeight: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '$dangerColor',
    paddingTop: Platform.OS === 'ios' ? 44 : 12,
    paddingBottom: Platform.OS === 'ios' ? 8 : 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
  containerSuccess: {
    backgroundColor: '$successColor',
  },
  containerInfo: {
    backgroundColor: '$infoColor',
  },
  containerWarning: {},
  titleText: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    paddingBottom: 2,
    textAlign: 'left',
  },
  msgText: {
    color: '#fff',
    fontSize: '0.8rem',
    textAlign: 'left',
  },
});

/**
 * Renders a notification.
 *
 * @reactProps {string} type - Notification type.
 * @reactProps {string} title - Notification title.
 * @reactProps {string} text - Notification text.
 */
class Notifications extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  };

  componentDidMount() {
    setTimeout(() => {
      Navigation.dismissOverlay(this.props.componentId);
    }, 4000);
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const containerStyle = (type) => {
      const result = [styles.container];
      switch (type) {
        case 'success':
          result.push(styles.containerSuccess);
          break;

        case 'warning':
          result.push(styles.containerWarning);
          break;

        case 'info':
          result.push(styles.containerWarning);
          break;

        default:
          break;
      }
      return result;
    };
    const { type, title, text } = this.props;
    return (
      <View style={containerStyle(type)}>
        {title && <Text style={styles.titleText}>{title}</Text>}
        {text && <Text style={styles.msgText}>{text}</Text>}
      </View>
    );
  }
}

export default Notifications;
