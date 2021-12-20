import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const App = (props) => {
  const {
    modalVisible,
    login,
    setModalVisible,
    LoginButtons,
    SignupButtons,
  } = props;
  const buttons = login ? LoginButtons : SignupButtons;
  // const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerView}>
              <Text style={styles.textHeader}>
                Sign {login ? 'in' : 'up'} As
              </Text>
            </View>
            <View style={styles.modalBodyWrapper}>
              <Text style={styles.insideText}>
                Dream Platform for Buyers & Sellers
              </Text>
              <View style={styles.textandButton}>
                <Text style={styles.AreYouA}>Are you a?</Text>
                <View style={styles.mainButtonView}>
                  <Pressable
                    onPress={buttons.first.press}
                    style={styles.sellerVendorButton}>
                    <Text style={styles.sellerVendorText}>
                      {buttons.first.title}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={buttons.second.press}
                    style={styles.sellerVendorButton1}>
                    <Text style={styles.sellerVendorText1}>
                      {buttons.second.title}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: '#7c2981',
  },
  textHeader: {
    marginTop: 10,
    textAlign: 'center',
    color: '#7c2981',
    fontWeight: '700',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideText: {
    marginHorizontal: 15,
    // marginTop: 50,
    textAlign: 'center',
    color: '#7c2981',
    fontWeight: '700',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginVertical: 70,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  sellerVendorButton: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#7c2981',
    backgroundColor: 'rgba(124,41,129,0.2)',
    width: '46%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerVendorButton1: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#7c2981',
    backgroundColor: '#7c2981',
    width: '46%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerVendorText: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: '#7c2981',
  },
  sellerVendorText1: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  modalBodyWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  AreYouA: {
    width: '100%',
    // textAlign: 'center',
    color: '#7c2981',
    // fontWeight: '400',
    fontSize: 15,
    margin: 5,
    fontStyle: 'italic',
  },
  textandButton: {
    // backgroundColor: 'red',
  },
  upperPictures: {
    padding: 5,
    flexDirection: 'row',
    marginLeft: 10,
  },
  lowerPictures: {
    padding: 5,
    flexDirection: 'row',
    marginLeft: 10,
  },

  centeredView: {
    backgroundColor: 'rgba(124,41,129,0.2)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '90%',
    height: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 270,
    width: 50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
