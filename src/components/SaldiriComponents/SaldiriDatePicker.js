import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  StatusBar,
} from 'react-native';
import SaldiriTextInput from './SaldiriTextInput';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SaldiriDatePicker = ({ callBack, placeholder, label }) => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const dateOptions = {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  //   const handleDateChange = (e) => {
  //   setDate(e.toLocaleDateString('en-US', dateOptions));
  // };

  const handleSelect = () => {
    callBack(date.toLocaleDateString());
    setShowModal(!showModal);
   
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Pressable onPress={() => setShowModal(!showModal)}>
        <SaldiriTextInput
          rightIcon={
            <MaterialCommunityIcons
              name={'calendar'}
              size={20}
              color="#16191a"
            />
          }
          value={date.toLocaleDateString('en-US', dateOptions)}
          label={label ? label : null}
          editable={false}
          placeholder={placeholder ? placeholder : 'Date'}
        />
      </Pressable>
      <View style={styles.centeredView}>
        <Modal animationType="fade" transparent={true} visible={showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="date"
                date={date}
                onDateChange={(e) => setDate(e)}
              />
              <View style={styles.hideModalBtnWrapper}>
                <Pressable
                  style={{ ...styles.hideModalBtn, backgroundColor: '#e3d1e4' }}
                  onPress={() => handleCancel()}>
                  <Text style={{ ...styles.textStyle, color: '#19161a' }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={{ ...styles.hideModalBtn, backgroundColor: '#7c2981' }}
                  onPress={() => handleSelect()}>
                  <Text
                    style={{ ...styles.textStyle, backgroundColor: '#7c2981' }}>
                    Select
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export default SaldiriDatePicker;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(160, 160, 160, 0.2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },

  hideModalBtn: {
    width: '25%',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  hideModalBtnWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 5,
    marginVertical: 5,
    flexDirection: 'row',
  },
});
