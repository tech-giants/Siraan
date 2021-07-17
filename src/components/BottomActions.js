import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from './Button';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    padding: 14,
  },
});

export default class extends PureComponent {
  static propTypes = {
    onBtnPress: PropTypes.func,
    disabled: PropTypes.bool,
    btnText: PropTypes.string,
  };

  static defaultProps = {
    btnText: 'Save',
  };

  render() {
    const { onBtnPress, disabled, btnText } = this.props;
    return (
      <View style={styles.container}>
        <Button type="primary" onPress={() => onBtnPress()} disabled={disabled}>
          <Text style={styles.placeOrderBtnText}>{i18n.t(btnText)}</Text>
        </Button>
      </View>
    );
  }
}
