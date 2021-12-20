import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SaldiriHeader from '../../../components/SaldiriComponents/SaldiriHeaderBar';
import * as nav from '../../../services/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductImageSwiper from '../../../components/ProductImageSwiper';
import Icon from '../../../components/Icon';
import { Navigation } from 'react-native-navigation';
import { Button, DataTable, RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Swiper from 'react-native-swiper';
// import { Item } from 'react-native-paper/lib/typescript/components/';
import EmptyList from '../../../components/EmptyList';
import MyStatusBar from '../../../components/SaldiriComponents/SaldiriStatusBar';
import StarsRating from '../../../components/StarsRating';
import * as reviewActions from '../../../actions/vendorManage/reviews';
import { getImagePath } from '../../../utils';
import Spinner from '../../../components/Spinner';

//
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//
function Review(props) {
  const {
    componentId,
    companyId,
    reviewActions,
    vendorManageReviews,
    page,
    reviewsData,
    hasMore,
    loadingMore,
    fetching,
  } = props;
  const [checked, setChecked] = React.useState('first');
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const demoArr = [
    'https://media.istockphoto.com/photos/group-of-unrecognisable-international-students-having-online-meeting-picture-id1300822108?b=1&k=20&m=1300822108&s=170667a&w=0&h=CPtbj-Ax8p0oHcxhk30uhQEXc05Yg1LrfEdpxN1p2rc=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
    'https://media.istockphoto.com/photos/searching-browsing-data-information-network-concept-businessman-using-picture-id1264839512?b=1&k=20&m=1264839512&s=170667a&w=0&h=QbzcI671w7ELHtwSMX2VqWOKRIfbq8xiDsBfkd0f9wo=',
  ];
  const handleRefresh = async () => {
    setRefreshing(true);
    await reviewActions
      .getReviews({ id: companyId, page: 0 })
      .then(() => setRefreshing(false));
  };
  const handleLoad = async (page = 1) => {
    console.log('vendorreviews action review screen handle load ', hasMore);
    if (hasMore) {
      console.log(
        'vendorreviews action review screen handle load hasMore',
        vendorManageReviews,
      );
      return await reviewActions.getReviews({ id: companyId, page });
    }
  };

  useEffect(() => {
    if (reviewsData.length < 1) {
      console.log('vendorreviews action review screen useEffect ', hasMore);
      handleLoad();
    }
    return () => {};
  }, []);
  if (fetching) {
    return <Spinner visible />;
  }
  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
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
        midHeaderTitle="Review & Ratings"
      />
      {/* <View style={styles.mainRatingButtons}>
        <View style={styles.ratingButtons}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>1</Text>
          <Entypo style={{ color: '#fdcc0d' }} name="star-outlined" size={20} />
        </View>
        <View style={styles.ratingButtons}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>2</Text>
          <Entypo style={{ color: '#fdcc0d' }} name="star" size={20} />
        </View>
        <View style={styles.ratingButtons}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>3</Text>
          <Entypo style={{ color: '#fdcc0d' }} name="star-outlined" size={20} />
        </View>
        <View style={styles.ratingButtons}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>4</Text>
          <Entypo
            style={{
              color: '#fdcc0d',
            }}
            name="star-outlined"
            size={20}
          />
        </View>

        <View style={styles.ratingButtons}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>5</Text>
          <Entypo style={{ color: '#fdcc0d' }} name="star-outlined" size={20} />
        </View>
      </View> */}

      <FlatList
        data={reviewsData}
        keyExtractor={(item, index) => index}
        refreshing={refreshing}
        ListEmptyComponent={<EmptyList message="No reviews found." />}
        ListFooterComponent={
          loadingMore && hasMore ? (
            <ActivityIndicator color="#7c2981" size={30} />
          ) : !hasMore ? (
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'capitalize',
                marginVertical: 10,
              }}>
              No more reviews to show.{' '}
            </Text>
          ) : null
        }
        onRefresh={() => {
          handleRefresh();
        }}
        onEndReached={() => handleLoad(page + 1)}
        onEndReachedThreshold={1}
        renderItem={({ item, index }) => {
          return (
            <ReviewCard key={index} data={item} componentId={componentId} />
          );
        }}
      />
    </>
  );
}

export default connect(
  (state) => ({
    companyId: state.profile.company_id,
    vendorManageReviews: state.vendorManageReviews,
    page: state.vendorManageReviews.params.page,
    hasMore: state.vendorManageReviews.hasMore,
    loadingMore: state.vendorManageReviews.loadingMore,
    fetching: state.vendorManageReviews.fetching,
    reviewsData: state.vendorManageReviews.data,
  }),
  (dispatch) => ({
    reviewActions: bindActionCreators(reviewActions, dispatch),
  }),
)(Review);

const ReviewCard = (props) => {
  let { data, key, componentId } = props;
  let { product, message, name, rating_value, timestamp } = data;
  let imageUri = getImagePath(product);
  const timeAgo = (timestamp) => {
    let d = new Date(timestamp);
    const diff = (new Date() - d) / 1000;
    if (diff < 60) {
      const v = Math.round(diff);
      return v === 0 ? 'now' : v + ' second' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60) {
      const v = Math.round(diff / 60);
      return v + ' minute' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60 * 24) {
      const v = Math.round(diff / (60 * 60));
      return v + ' hour' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60 * 24 * 30.436875) {
      const v = Math.round(diff / (60 * 60 * 24));
      return v + ' day' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60 * 24 * 30.436875 * 12) {
      const v = Math.round(diff / (60 * 60 * 24 * 30.436875));
      return v + ' month' + (v === 1 ? '' : 's') + ' ago';
    }
    const v = Math.round(diff / (60 * 60 * 24 * 30.436875 * 12));
    return v + ' year' + (v === 1 ? '' : 's') + ' ago';
  };
  return (
    <View key={key}>
      <Pressable
        onPress={() =>
          nav.ProductInfo(componentId, {
            productID: product.product_id,
          })
        }
        style={styles.productContainer}>
        <Image
          style={{ resizeMode: 'contain', width: 70, height: 60 }}
          source={{
            uri: imageUri || 'https://siraan.com/moblogo/moblogo.png',
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              width: '100%',
            }}>
            {product.product}
          </Text>
          <Text
            style={{
              // fontSize: 12,
              width: '100%',
            }}>
            {product.company_name}
          </Text>
        </View>
      </Pressable>
      <View style={styles.textRating}>
        <Text style={{ padding: 10, color: '#7c2981' }}>
          {name} -{' '}
          <Text style={{ color: '#ccc' }}>{timeAgo(Number(timestamp))}</Text>
        </Text>
        {/* <Rating
            count={4}
            ratingCount={5}
            imageSize={18}
            style={{ paddingVertical: 10 }}
          /> */}
        <StarsRating
          size={14}
          value={Number(rating_value)}
          isRatingSelectionDisabled
        />
      </View>
      <View>
        <Text style={styles.textReview}>{message}</Text>
      </View>
      {/* <Text style={{ padding: 10, color: '#ccc' }}>Color Family: White</Text> */}
      <>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <MaterialIcons name="cancel" size={30} color="#7c2981" />
              </Pressable>
              <ProductImageSwiper>{demoArr}</ProductImageSwiper>
            </View>
          </View>
        </Modal> */}
        {/* <Pressable onPress={() => setModalVisible(true)}>
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
      </Pressable> */}
        {/* <Pressable onPress={() => setModalVisible(true)}>
          <FlatList
            key={2}
            numColumns={2}
            data={demoArr.slice(0, 4)}
            renderItem={({ item }) => (
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 110,
                  height: 100,
                  marginLeft: 10,
                }}
                source={{ uri: item }}
              />
            )}
            keyExtractor={(Item) => Item.id}
          />
        </Pressable> */}
        {/* <View style={styles.textRating}>
          <Entypo
            style={{ padding: 20, color: '#7c2981' }}
            name="dots-three-horizontal"
            size={20}
          />
          <AntDesign
            style={{ paddingVertical: 10, color: '#7c2981' }}
            name="like1"
            size={25}
          />
        </View> */}
      </>
      <View
        style={{
          width: '80%',
          padding: 0.5,
          alignSelf: 'center',
          backgroundColor: '#7c2981',
          marginVertical: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainRatingButtons: {
    flexDirection: 'row',
  },
  ratingButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: 52,
    height: 40,
  },
  productContainer: {
    backgroundColor: '#f2f2f2',
    marginVertical: 10,
    width: '95%',
    // marginLeft: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 5,
    alignSelf: 'center',
  },
  textRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  textReview: {
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 10,
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
    width: '90%',
    height: 400,
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
