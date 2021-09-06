import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Pressable, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SaldiriBackBtn = ({ ...res }) => {
  return (
    <Pressable
      {...res}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <MaterialIcons name="arrow-back" size={25} color="#19161a" />
    </Pressable>
  );
};

export default SaldiriBackBtn;
