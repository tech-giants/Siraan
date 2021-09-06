import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// theme
import theme from '../config/theme';
import i18n from '../utils/i18n';
import * as nav from '../services/navigation';
import { formatPrice, getImagePath } from '../utils';
import { get } from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';

import { iconsMap } from '../utils/navIcons';
const windowWidth = Dimensions.get('window').width;

function WishlistProductItem({ item, addCallback, removeCallback }) {
  const [loaderState, setloaderState] = useState(false);
    const handleRemove = async () => {
       setloaderState(true)
       await removeCallback(item)
        setloaderState(false)
  };
    const handleAddToCart =async () => {
        setloaderState(true)
       await addCallback(item)
        setloaderState(false)
  };
  let productImage = null;
  const imageUri = getImagePath(item);
  if (imageUri) {
    productImage = (
      <FastImage
        source={{ uri: imageUri }}
        style={styles.productItemImage}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }

  const swipeoutBtns = [
    {
      text: i18n.t('Delete'),
      type: 'delete',
      onPress: () => this.handleRemoveProduct(item),
    },
  ];

  return (
    <View style={{ ...styles.fullView }}>
      <View style={styles.topview}>
        <View>
          <View>{productImage}</View>

          {/* <Image style={styles.Image}
          source={{uri: 'https://firebasestorage.googleapis.com/v0/b/siraan-68555.appspot.com/o/49735714502_f1b80c86ca_b.png?alt=media&token=bffbab85-4729-4573-ac44-3da8ed9567d4'}}
      /> */}
        </View>

        <View style={{ justifyContent: 'flex-start' }}>
          {/* <Text style={{fontSize:20,fontWeight:'bold',}}>$35.70</Text> */}
          {/* <Text style={styles.price}>
           $35.70
          </Text> */}
          <Text style={styles.productItemPrice}>
            {item.amount} x {formatPrice(item.price_formatted.price)}
          </Text>

          <View>
            <Text
              style={{ ...styles.name, ...styles.productItemName }}
              numberOfLines={1}>
              {item.product}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ ...styles.bottomview }}>
        <View>
          <Pressable
            onPress={() => handleRemove()}
            style={styles.curvedbtn}>
            <Text style={styles.curvedbtnText}>{i18n.t('Remove')}</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() =>handleAddToCart()}
            style={styles.curvedbtn}>
            <Text style={styles.curvedbtnText}>{i18n.t('Add To Cart')}</Text>
          </Pressable>
        </View>

        <View></View>
      </View>
      {loaderState ? (
        <View
          style={{
            borderRadius: 10,
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(25, 22, 26, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}>
          <ActivityIndicator
            // size="large"
            size={45}
            style={styles.indicator}
            color="#7c2981"
          />
        </View>
      ) : null}
    </View>
  );
}

export default WishlistProductItem;

const styles = EStyleSheet.create({
  productItemImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  fullView: {
    marginTop: 20,
    marginLeft: 17,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#A26EA6',
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topview: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.3,
    borderColor: '#A26EA6',
    paddingVertical: 15,
    // width: 130,
    // height: 130,
    // resizeMode: 'cover',
    // // marginTop: 20,
    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius:20,
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  name: {
    fontSize: '0.9rem',
    marginLeft: 20,
    width: 150,
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bottomview: {
    // flexDirection:'row',
    //   fontSize: '1.0rem',
    //   color: 'black',
    //  marginLeft:150,
    //   marginTop: -10,
    //   fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '90%',
    paddingVertical: 10,
  },
  curvedbtn: {
    backgroundColor: '#7c2981',
    padding: 8,
    borderRadius: 10,
    height: 50,
    width: 140,
    marginLeft: 2,
  },
  curvedbtnText: {
    color: '#fff',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: 150,
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
    marginLeft: -10,
  },
});
