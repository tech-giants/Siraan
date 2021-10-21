/*
required props:
actionSheetRef 
*/

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';

// const actionSheetRef = createRef();
export default (props) => {
  const {
    actionSheetRef,
    label,
    optional,
    rightIcon,
    w50,
    value,
    body,
    loading,
    hideHeader,
  } = props;

  const RenderLabels = () => {
    return (
      <>
        {label && optional ? (
          <View style={styles.lableOptionalWrapper}>
            <Text style={{ ...styles.SaldiriTextInputLabel }}> {label} </Text>
            <Text
              style={{ ...styles.SaldiriTextInputOptional, color: '#E3D1E4' }}>
              (optional)
            </Text>
          </View>
        ) : label ? (
          <View style={styles.lableRequirWrapper}>
            <Text style={styles.SaldiriTextInputLabel}>
              {label}{' '}
              <Text
                style={{ ...styles.SaldiriTextInputOptional, color: 'red' }}>
                *
              </Text>
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Pressable
        disabled={loading}
        style={{ ...styles.SaldiriTextInputCont, width: w50 ? '49%' : '100%' }}
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}>
        {/* <View
        > */}
        {RenderLabels()}
        <View style={styles.SaldiriTextInputFieldCont}>
          <Text style={styles.SaldiriTextInputField}>{value}</Text>
          {/* for custom icons at right position  */}
          {rightIcon && !loading ? (
            <MaterialIcons name="arrow-drop-down" size={25} color="#16191a" />
          ) : null}
          {loading ? <ActivityIndicator size={20} color="#16191a" /> : null}
        </View>
        {/* </View> */}
      </Pressable>

      {/*
       */}

      <ActionSheet
        containerStyle={{
          backgroundColor: '#f2f2f2',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 20,
          paddingHorizontal: 10,
        }}
        ref={actionSheetRef}>
        {hideHeader ? null : (
          <View style={{ paddingHorizontal: 10 }}>{RenderLabels()}</View>
        )}
        <View style={{ height: Dimensions.get('window').height / 1.5 }}>
          {body}
        </View>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  SaldiriTextInputCont: {
    // backgroundColor: '#ccc',
    // width: '100%',
    marginVertical: 5,
    overflow: 'hidden',
  },
  SaldiriTextInputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
    marginBottom: 10,
  },
  SaldiriTextInputOptional: {
    fontSize: 14,
    // fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },

  lableOptionalWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  lableRequirWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  ActionSchhetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  SaldiriTextInputFieldCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // margin: 5,
    // paddingHorizontal: 10,
    // backgroundColor: 'red',
    borderColor: '#19161a',
    borderWidth: 0.5,
    borderRadius: 10,

    overflow: 'hidden',
    paddingLeft: 12,
    height: 45,
    paddingRight: 8,
  },
  SaldiriTextInputField: {
    // backgroundColor: 'red',
    // borderColor: '#19161a',
    // borderWidth: 0.5,
    // borderRadius: 10,
    flex: 1,
    // marginHorizontal:10,
    // backgroundColor: 'red',
    padding: 0,
    margin: 0,
    color: '#3a3a3a',
  },
});
