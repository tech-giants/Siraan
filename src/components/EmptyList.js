import React from 'react';
import { View, Text, Dimensions, Image, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import FastImage from 'react-native-fast-image';

import i18n from '../utils/i18n';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    fontSize: '1rem',
    color: 'gray',
    textAlign: 'center',
  },
  headerLogo: {
    // flex: 1,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

/**
 * Renders empty information block.
 *
 * @return {JSX.Element}
 */
const EmptyList = (props) => {
  const { message, button } = props;
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // height: '100%',
        height: windowHeight - 120,
      }}>
      <FastImage
        style={styles.headerLogo}
        source={require('../assets/emptycategory.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text
        style={{
          marginTop: 30,
          textAlign: 'center',
          // fontWeight: 'bold',
          fontSize: 20,
          color: '#999999',
          // fontFamily: '',
        }}>
        {message ? message : 'Empty !'}
      </Text>
      {button ? button : null}

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
    <MaterialIcons
      name="arrow-forward"
      size={25}
      color="#fff"
    />
  </Pressable> */}
    </View>
  );
};

export default EmptyList;
