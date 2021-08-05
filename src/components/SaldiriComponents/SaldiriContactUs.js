import React from 'react';
import { View, Text, Image, Dimensions,Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SaldiriHeader from '../../components/SaldiriComponents/SaldiriHeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from 'react-native-navigation';




const windowWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingVertical: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    //   justifyContent:'center',
  },
  contactUs: {
    resizeMode: 'contain',
    width: windowWidth - 70,
    height: 200,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#e3d1e4',
    borderRadius: 30,
  },
  text1: {
    width: '35%',
    color: '#7c2981',
    fontWeight: 'bold',
    fontSize: 15,
  },
  text2: {
    textAlign: 'left',
    width: '70%',
    fontSize: 15,
    color: '#a0a0a0',
  },
});
const SaldiriContactUs = () => {
  const infoArr = [
    {
      text1: 'Address',
      text2: '2nd Floor-Dubai Plaza, Siddiqui Road,Block G, Attock.',
      showBorder: true,
    },
    {
        text1: 'Email',
        text2: 'info@siraan.com',
        showBorder: true,
    },
    {
        text1: 'Contact Us',
        text2: '+92 318 08497 76',
        showBorder: true,
    },
    {
        text1: 'Working Hours',
        text2: '10AM-6PM (Monday To Friday)',
        showBorder: false,
    },
  ];

  return (
      <>
    
     
    
    <SaldiriHeader
    //  startComponent={
    //   <Pressable
    //     onPress={() => Navigation.popToRoot(this.props.componentId)}
    //     style={{
    //       height: '100%',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}>
    //     <MaterialIcons name="arrow-back" size={20} color="#16191a" />
    //   </Pressable>
    // }
     midHeaderTitle='Contact Us'
        />
     
    <View style={styles.containerStyle}>
      <View>
        <Image
          style={styles.contactUs}
          source={require('../../assets/contactus.png')}
        />
      </View>
      {infoArr.map((item, index) => {
        return <View key={index} style={ {...styles.textWrapper, borderBottomWidth: item.showBorder? 1 : 0}}>
          <Text style={styles.text1}>{item.text1}:</Text>
          <Text style={styles.text2}>
          {item.text2}
          </Text>
        </View>
      })}
    </View>
    </>
  );
};

export default SaldiriContactUs;
