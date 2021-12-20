import React from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import SaldiriHeader from '../../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button, DataTable, RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
function Card({ allProducts, title, componentId }) {
  const [checked, setChecked] = React.useState('first');
  return (
    <>
      <SaldiriHeader
        startComponent={
          <Pressable
            onPress={() => Navigation.pop(componentId)}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#16191a',
            }}>
            <MaterialIcons name="arrow-back" size={25} color="#7c2981" />
          </Pressable>
        }
        midHeaderTitle="Card"
        endComponent={
          <TouchableOpacity
            activeOpacity={2}
            style={{
              paddingTop: 5,
              paddingHorizontal: 10,
              paddingBottom: 0,
              color: '#16191a',
            }}
            onPress={() => this.props.ordersActions.fetch()}>
            <Icon color="#7c2981" name="search" style={styles.rightArrowIcon} />
          </TouchableOpacity>
        }
      />

      <View style={styles.productContainer}>
        <Image
          style={{ resizeMode: 'contain', width: 70, height: 60 }}
          source={require('../../../assets/rose.jpg')}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Mi Dual Earphones
          </Text>
          <Text>Color family:White</Text>
        </View>
      </View>
          <Text style={{padding:10,color:'#ccc'}}>3***7-1 week ago</Text>
      <View>
        <Text style={styles.textReview}>
          Yar bilkul b achi nai thi ik to price bohat zayada thi dusra sound b
          acha nai tha bilkul b or ik side to is ki bilkul b sai nai chal rai
          thi ma ny isy bilkul b like nai kia.so, ma kisi ko b recommend nai krn
          ga k wo purchase kry.so ap ki marzi hy lo ya nai hum kuch nai keh
          sakty. Dil toot gya qasme..............
        </Text>
      </View>
      <Text style={{padding:10,color:'#ccc'}}>Color Family: White</Text>

      <View>
        <View style={styles.upperPictures}>
          <Image
            style={{ resizeMode: 'contain', width: 110, height: 100 }}
            source={require('../../../assets/bag.jpeg')}
          />
          <Image
            style={{
              resizeMode: 'contain',
              width: 110,
              height: 100,
              marginLeft: 10,
            }}
            source={require('../../../assets/bag.jpeg')}
          />
        </View>

        <View style={styles.lowerPictures}>
          <Image
            style={{ resizeMode: 'contain', width: 110, height: 100 }}
            source={require('../../../assets/bag.jpeg')}
          />
          <Image
            style={{
              resizeMode: 'contain',
              width: 110,
              height: 100,
              marginLeft: 10,
            }}
            source={require('../../../assets/bag.jpeg')}
          />
        </View>
      </View>
    </>
  );
}

export default Card;
const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: '#f2f2f2',
    marginVertical: 20,
    width: '95%',
    // height: '12%',
    marginLeft: 10,
    padding: 13,
    flexDirection: 'row',
  },
  textReview: {
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 10,
    // textAlign: 'center',
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
});
