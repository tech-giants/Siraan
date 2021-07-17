import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    fontSize: '1rem',
    color: 'gray',
    textAlign: 'center',
  },
});

/**
 * Renders empty information block.
 *
 * @return {JSX.Element}
 */
const EmptyList = () => (
  <View style={styles.container}>
    <Text style={styles.header}>{i18n.t('List is empty')}.</Text>
  </View>
);

export default EmptyList;
