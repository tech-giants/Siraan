import { isThisMinute } from 'date-fns';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const windowWidth = Dimensions.get('window').width;

const QtyOptionModal = ({ modalVisible, hideModal, min, setAmount, max }) => {
  // const max =20
  var maxArr = [];
  for (let i = min; i <= max; i++) {
    maxArr.push(i);
  }
  // console.log('jjdddddddddddddddddddddddddd', max, min)

  return (
    <>
      <Modal
        // animationType="slide"
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text>Qty</Text>
              <Pressable
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                onPress={() => hideModal()}>
                <Entypo name="cross" size={18} color="#19161A" />
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}>
              {maxArr.map((item, index) => {
                return (
                  <>
                    <Pressable
                      style={styles.amountPressable}
                      onPress={() => {
                        setAmount(item);
                        hideModal();
                      }}>
                      <Text style={styles.modalText}>{item}</Text>
                    </Pressable>
                    <View style={styles.divider} />
                  </>
                );
              })}
              {/* <FlatList data={maxArr} renderItem={(item) =>  <Text style={styles.modalText}>{item}</Text> } /> */}
            </ScrollView>
          </View>
          {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => hideModal()}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // maxHeight: 200,
    backgroundColor: 'rgba(25, 22, 26, 0.5)',
  },
  modalView: {
    // margin: 20,
    overflow: 'hidden',
    width: windowWidth / 2.5,
    maxHeight: 300,
    // padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#7c2981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    // marginBottom: 5,
    textAlign: 'left',
    paddingHorizontal: 10,
    // paddingVertical: 3,
  },

  modalHeader: {
    width: '100%',
    height: 30,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    // borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#8D6F18',
    backgroundColor: '#E8E2D0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollViewContainer: {
    width: windowWidth / 2.8,
  },
  amountPressable: {
    width: '100%',
  },
  divider: {
    height: 0.5,
    width: '90%',
    backgroundColor: 'rgba(25, 22, 26, 0.5)',
    marginVertical: 5,
  },
});
export default QtyOptionModal;
