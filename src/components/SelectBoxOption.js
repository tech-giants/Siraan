import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '../components/Icon';
import * as nav from '../services/navigation';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginVertical: 10,
  },
  selectWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconAndValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBoxText: {
    fontSize: '0.9rem',
  },
  menuItemIcon: {
    fontSize: '1.2rem',
    marginHorizontal: 5,
  },
});

/**
 * Renders row with name and value.
 *
 * @param {object} option - Option information.
 * @param {string} value - Option value.
 *
 * @return {JSX.Element}
 */
const SelectBoxOption = ({ option, value, onChange }) => {
  if (!value) {
    return null;
  }

  const pickerValues = option.selectVariants.map(
    (variant) => variant.selectValue,
  );

  const changePickerValueHandler = (value) => {
    const selectedVariant = option.selectVariants.find(
      (variant) => variant.selectValue.toLowerCase() === value.toLowerCase(),
    );
    onChange(selectedVariant);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        nav.showModalScrollPicker({
          pickerValues: pickerValues,
          changePickerValueHandler,
          selectValue: value.selectValue,
          title: option.selectTitle,
        });
      }}
      style={styles.container}>
      <View style={styles.selectWrapper}>
        <Text style={styles.selectBoxText}>{option.selectTitle}</Text>
        <View style={styles.iconAndValueWrapper}>
          <Text style={styles.selectBoxText}>{value.selectValue}</Text>
          <Icon name="arrow-drop-down" style={styles.menuItemIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * @ignore
 */
SelectBoxOption.propTypes = {
  value: PropTypes.object,
};

export default SelectBoxOption;
