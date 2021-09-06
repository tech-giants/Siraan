import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    paddingTop: 20,
  },
  topDivider: {
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    width: '100%',
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '1.2rem',
    // paddingHorizontal: 20,
    paddingVertical: 5,
    // textAlign: 'left',
    fontWeight: 'bold',
    color: '#7c2981',
  },
  rightButton: {
    position: 'absolute',
    top: 25,
    right: 14,
  },
  rightButtonText: {
    color: '$primaryColor',
    fontSize: '1rem',
  },
});

/**
 * Application section wrapper.
 *
 * @param {string} title - Section title.
 * @param {object} wrapperStyle - Styles for children wrapper.
 * @param {object} containerStyle - Styles for section wrapper.
 * @param {boolean} showRightButton - Right button flag.
 * @param {string} rightButtonText - Right button text.
 * @param {function} onRightButtonPress - Right button onPress function.
 *
 * @return {JSX.Element}
 */
const Section = ({
  children,
  title = '',
  wrapperStyle,
  containerStyle,
  showRightButton,
  rightButtonText,
  onRightButtonPress,
  topDivider = false,
  location,
}) => (
  <>
    {topDivider && <View style={styles.topDivider} />}
    <View
      style={{
        ...styles.container,
        ...containerStyle,
        paddingHorizontal: location === 'productDetail' ? null : 20,
      }}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {showRightButton && (
        <Pressable
          onPress={() => onRightButtonPress()}
          style={styles.rightButton}>
          <Text style={styles.rightButtonText}>{rightButtonText}</Text>
        </Pressable>
      )}
      <View style={[styles.wrapper, wrapperStyle]}>{children}</View>
    </View>
  </>
);

/**
 * @ignore
 */
Section.propTypes = {
  title: PropTypes.string,
  wrapperStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  containerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  showRightButton: PropTypes.bool,
  rightButtonText: PropTypes.string,
  onRightButtonPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
