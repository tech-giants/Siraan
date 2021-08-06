import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import SaldiriTextInput from './SaldiriTextInput';

const SaldiriGenderPicker = ({ callBack, placeholder, label, optional }) => {
  const [gender, setgender] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (e) => {
    setgender(e);
    callBack(e);
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  // const optionsArr = ['male', 'female', 'others'];
  const optionsArr = [
    { title: 'male', border: true },
    { title: 'female', border: true },
    { title: 'others', border: false },
  ];

  return (
    <>
      <Pressable onPress={() => setShowModal(!showModal)}>
        <SaldiriTextInput
          optional={optional ? optional : null}
          value={gender? gender.charAt(0).toUpperCase() + gender.slice(1) : null} 
          label={label ? label : null}
          editable={false}
          placeholder={placeholder ? placeholder : 'gender'}
        />
      </Pressable>
      <View style={styles.centeredView}>
        <Modal animationType="fade" transparent={true} visible={showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalTitle}>Select Gender</Text>
                {optionsArr.map((item, index) => {
                  return (
                    <Pressable
                      style={{
                        ...styles.genderOptionPressable,
                        borderBottomWidth: item.border ? 0.5 : 0,
                      }}
                      key={`gender_option_${index}`}
                      onPress={() => handleSelect(item.title)}>
                      <Text style={styles.genderOptionText}>
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.hideModalBtnWrapper}>
                <Pressable
                  style={{ ...styles.hideModalBtn, backgroundColor: '#e3d1e4' }}
                  onPress={() => handleCancel()}>
                  <Text style={{ ...styles.textStyle, color: '#19161a' }}>
                    Cancel
                  </Text>
                </Pressable>
                {/* <Pressable
                  style={{ ...styles.hideModalBtn, backgroundColor: '#7c2981' }}
                  onPress={() => handleSelect()}>
                  <Text
                    style={{ ...styles.textStyle, backgroundColor: '#7c2981' }}>
                    Select
                  </Text>
                </Pressable> */}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export default SaldiriGenderPicker;
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
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: 250,
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
  genderOptionPressable: {
    width: '100%',
    // flex: 1,
    padding: 5,
    borderRadius: 20,
    borderColor: '#7c2981',

    // backgroundColor:'red'
  },
  genderOptionText: {
    fontSize: 15,
    width: '100%',
    // flex: 1,
    margin: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    width: '100%',
    // marginHorizontal:10,
  },
});
