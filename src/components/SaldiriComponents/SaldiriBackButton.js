import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';





const SaldiriBackBtn=()=>{
    return (
        <Pressable
          style={{justifyContent:'center',alignItems:'center',height:'100%',}}  
          >
        <MaterialIcons 
        name="arrow-back" size={25} color='#000' />
        </Pressable>
      );
}


export default SaldiriBackBtn;
// const styles = EStyleSheet.create({
//     clearIcon: {
// //       fontSize: '1rem',
// //       color: '#fff',
// //       position: 'absolute',
//       right: 4,
//       top: 4,
//     },
//   });
  