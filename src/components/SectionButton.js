import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from './Icon';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$grayColor',
    paddingTop: 20,
  },
  wrapper: {
    backgroundColor: '#fff',
    padding: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: '1rem',
    paddingTop: 4,
  },
  btnIcon: {
    color: 'gray',
  },
});

/**
 * Section button.
 *
 * @param {string} text - Button text.
 * @param {function} onPress - Push function.
 * @param {string} icon - Icon name.
 *
 * @return {JSX.Element}
 */
const SectionButton = ({ text, onPress, icon = 'keyboard-arrow-right' }) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.btn} onPress={() => onPress()}>
        <Text style={styles.btnText}>{text}</Text>
        {icon && <Icon name={icon} style={styles.btnIcon} />}
      </TouchableOpacity>
    </View>
  </View>
);

/**
 * @ignore
 */
SectionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
};

export default SectionButton;
