import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const SaldiriEmpty = ({ message }) => {
  return (
    <>
      <View
        style={{
          // flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          // height: '100%',
          height: windowHeight - 120,
          width: '100%',
        }}>
        <Image
          style={styles.headerLogo}
          source={require('../../assets/emptycategory.png')}
        />
        <Text
          style={{
            marginTop: 30,
            color: '#999999',
            textAlign: 'center',
            // flex: 1,
            width: '100%',
          }}>
          {message}
        </Text>
        {/* <Pressable
            onPress={() => {
              nav.pushCategory('SEARCH_SCREEN', {
                category: item1,
              });
            }}
            style={{ ...styles.btn, marginTop: 30 }}>
            <Text style={{ ...styles.btnText, flex: 1 }}>
              {selectedCategoryTitle}
            </Text>
            <MaterialIcons name="arrow-forward" size={25} color="#fff" />
          </Pressable> */}
      </View>
    </>
  );
};

export default SaldiriEmpty;

const styles = StyleSheet.create({
  headerLogo: {
    // flex: 1,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
});
