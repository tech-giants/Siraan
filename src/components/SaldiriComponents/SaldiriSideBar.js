import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SaldiriHeader from './SaldiriHeaderBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import orderBy from 'lodash/orderBy';
import has from 'lodash/has';
import * as nav from '../../services/navigation';

import FastImage from 'react-native-fast-image';

import SaldiriBackBtn from './SaldiriBackButton';
import { bg } from 'date-fns/locale';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SaldiriSideBar = (props) => {
  const [item1, setitem1] = useState(props.items[0]);
  // console.log("ppropssssssssssss inside side bar---------------------------- ", props);
  const categoriesList = orderBy(
    props.items.data,
    (i) => parseInt(i.position, 10),
    ['asc'],
  );
  //  console.log("vategory list inside side bar---------------------------- ", categoriesList);
  const [selectedCategoryTitle, setselectedCategoryTitle] = useState(
    categoriesList[0].category,
  );
  const [subcategories, setsubcategories] = useState(
    categoriesList[0].subcategories,
  );
  // var state_array = Array(categoriesList[0].subcategories.length).fill(false);
  const [subcategories_sub, setsubsubcategories] = useState(
    Array(categoriesList[0].subcategories.length).fill(false),
  );

  //  setselectedCategoryTitle(item.category);
  // setsubcategories(item.subcategories);
  // console.log("sub sub 62 ",item.subcategories.subcategories.length)
  // if(item.subcategories.subcategories){
  // if (item.subcategories) {
  // state_array = Array(categoriesList[0].subcategories.length).fill(
  //   false,
  // );
  // setsubsubcategories(state_array);
  // }
  // console.log("asasdada ",subcategories_sub)

  return (
    <>
      <SaldiriHeader
        // startComponent={
        //   <SaldiriBackBtn onPress={() => nav.selectTab('home')} />
        // }
        midHeaderTitle={
          selectedCategoryTitle ? selectedCategoryTitle : 'categories'
        }
      />

      <View style={styles.SaldiriSideBarCont}>
        {/* col 1 */}
        <View
          showsVerticalScrollIndicator={false}
          style={{
            ...styles.sidebarColumn1,
            borderColor: '#7c2981',
            borderRightWidth: 0.4,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            containerStyle={styles.sidebarColumn1}>
            {categoriesList.map((item_1, index1) => (
              <>
                {}
                <Pressable
                  onPress={() => {
                    setselectedCategoryTitle(item_1.category);
                    setsubcategories(item_1.subcategories);
                    setitem1(item_1);
                    // console.log("sub sub 62 ",item.subcategories.subcategories.length)
                    // if(item.subcategories.subcategories){
                    if (item_1.subcategories) {
                      setsubsubcategories(
                        Array(categoriesList[0].subcategories.length).fill(
                          false,
                        ),
                      );
                    }

                    // console.log('length 65 ', item.subcategories.length);
                    // console.log(
                    // 'cate gory array 65 ',
                    // Array(item.subcategories.length).fill(false),
                    // );
                    // }
                    // else{
                    // setsubsubcategories([])
                    // }
                  }}
                  key={index1}
                  style={
                    selectedCategoryTitle === item_1.category
                      ? styles.activeSidebarTabCont1
                      : styles.sidebarTabCont1
                  }>
                  {has(item_1, 'main_pair.detailed.image_path') ? (
                    <>
                      <FastImage
                        source={{ uri: item_1.main_pair.detailed.image_path }}
                        style={{
                          ...styles.sidebarTabImage,
                          resizeMode: 'cover',
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        />
                    </>
                  ) : has(item_1, 'main_pair.icon.image_path') ? (
                    <>
                      <FastImage
                        source={{ uri: item_1.main_pair.icon.image_path }}
                        style={{
                          ...styles.sidebarTabImage,
                          resizeMode: 'cover',
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        />
                    </>
                  ) : (
                    <>
                      <FastImage
                        source={require('../../assets/siraan_logo.png')}
                        style={{
                          ...styles.sidebarTabImage,
                          resizeMode: 'contain',
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </>
                  )}
                  <Text
                    numberOfLines={2}
                    style={
                      selectedCategoryTitle === item_1.category
                        ? styles.activeSidebarTabText1
                        : styles.sidebarTabText1
                    }>
                    {item_1.category}
                  </Text>
                </Pressable>
              </>
            ))}
          </ScrollView>
        </View>
        {/* {/ col 2 /} */}
        <View style={styles.sidebarColumn2}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            containerStyle={styles.sidebarColumn1}>
            {subcategories ? (
              subcategories.map((item_2, index2) => {
                {
                  /* const [
                    showSubSubCategories,
                    setshowSubSubCategories,
                  ] = useState(false); */
                }
                {
                  /* const [
                    showSubSubCategories,
                    setshowSubSubCategories,
                  ] = useToggle(); */
                }
                return (
                  <>
                    <View key={index2} style={styles.sidebarTabCont2}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Pressable
                          onPress={() => {
                            nav.pushCategory('SEARCH_SCREEN', {
                              category: item_2,
                            });
                          }}
                          style={styles.sidebarTabCont11}>
                          <Text style={styles.sidebarTabText2}>
                            {item_2.category}
                          </Text>
                        </Pressable>
                        {item_2.subcategories ? (
                          <Pressable
                            onPress={() => {
                              // console.log('press event ');
                              // console.log(
                              //   'sub categories ---130 ',
                              //   subcategories_sub,
                              // );
                              // console.log("indexxxx 151 ",index2);
                              //    console.log(
                              //   'state_array --152 ',
                              //   state_array,
                              // );
                              // state_array=subcategories_sub;
                              // console.log('state arrayu ', state_array);
                              // for (
                              //   var i = 0;
                              //   i < subcategories_sub.length;
                              //   i++
                              // ) {
                              //   console.log('ith of ', subcategories_sub[i]);
                              //   if (subcategories_sub[i] == true) {
                              //     state_array[i] = true;
                              //     console.log('Inside suces of ');
                              //   }
                              // }
                              let items = [...subcategories_sub];
                              // 2. Make a shallow copy of the item you want to mutate
                              let item = items[index2];
                              // 3. Replace the property you're intested in
                              if (item) {
                                item = false;
                              } else {
                                item = true;
                              }
                              // item.name = 'newName';
                              // 4. Put it back into our array. N.B. we are mutating the array here, but that's why we made a copy first
                              items[index2] = item;
                              // if (subcategories_sub[index2] == true) {
                              //   console.log('inside true event');
                              //   state_array[index2] = false;
                              // } else {
                              //   console.log('inside false event');
                              //   state_array[index2] = true;
                              // }
                              //  console.log(
                              //   'state_array --164 ',
                              //   state_array,
                              // );
                              // console.log(
                              //   'sub categoriess --132 ',
                              //   subcategories_sub,
                              // );
                              setsubsubcategories(items);

                              // setshowSubSubCategories()
                            }}
                            style={styles.sidebarDownArrow}>
                            <MaterialIcons
                              name={
                                subcategories_sub[index2]
                                  ? 'keyboard-arrow-up'
                                  : 'keyboard-arrow-down'
                              }
                              // "keyboard-arrow-down"
                              // chevron-small-up
                              size={25}
                              color="#696868"
                            />
                          </Pressable>
                        ) : null}
                      </View>

                      {subcategories_sub[index2] && item_2.subcategories ? (
                        <View>
                          {/* {/  /} */}
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            data={item_2.subcategories}
                            // keyExtractor={(item) => +item.product_id}
                            numColumns={3}
                            key={3}
                            renderItem={(item_3) => (
                              <>
                                {/* start */}
                                <Pressable
                                  style={styles.subSubCategoryContainer}
                                  onPress={() => {
                                    nav.pushCategory('SEARCH_SCREEN', {
                                      category: item_3.item,
                                    });
                                  }}>
                                  <View style={styles.wrapper}>
                                    {has(
                                      item_3.item,
                                      'main_pair.detailed.image_path',
                                    ) ? (
                                      <>
                                        <FastImage
                                          source={{
                                            uri:
                                              item_3.item.main_pair.detailed
                                                .image_path,
                                          }}
                                          style={{
                                            ...styles.categoryImage,
                                            resizeMode: 'cover',
                                          }}
                                          resizeMode={FastImage.resizeMode.cover}
                                          />
                                      </>
                                    ) : has(
                                      item_3.item,
                                      'main_pair.icon.image_path',
                                      ) ? (
                                        <>
                                        <FastImage
                                          source={{
                                            uri:
                                            item_3.item.main_pair.icon
                                            .image_path,
                                          }}
                                          resizeMode={FastImage.resizeMode.cover}
                                          style={{
                                            ...styles.categoryImage,
                                            resizeMode: 'cover',
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <FastImage
                                          source={require('../../assets/siraan_logo.png')}
                                          style={{
                                            ...styles.categoryImage,
                                            resizeMode: 'contain',
                                          }}
                                          resizeMode={FastImage.resizeMode.contain}
                                          />
                                      </>
                                    )}
                                    <View style={styles.categoryTitleWrapper}>
                                      <Text
                                        numberOfLines={2}
                                        style={styles.categoryTitle}>
                                        {item_3.item.category}
                                      </Text>
                                    </View>
                                  </View>
                                </Pressable>
                                {/* {/  end/} */}
                              </>
                            )}
                          />
                        </View>
                      ) : null}
                    </View>
                  </>
                );
              })
            ) : (
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
                  }}>
                  <FastImage
                   resizeMode={FastImage.resizeMode.contain}
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
                    This category has no sub-category.
                  </Text>
                  <Pressable
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
                  </Pressable>
                </View>
              </>
            )}
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Pressable
                onPress={() => {
                  nav.pushCategory('SEARCH_SCREEN', {
                    category: item1,
                  });
                }}
                style={styles.btn}>
                <Text style={{ ...styles.btnText, flex: 1 }}>
                  {selectedCategoryTitle}
                </Text>
                <MaterialIcons name="arrow-forward" size={25} color="#fff" />
              </Pressable> */}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SaldiriSideBar;

const styles = EStyleSheet.create({
  SaldiriSideBarCont: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center',
    // backgroundColor: 'red',
    // padding: 10,
    flexDirection: 'row',
    width: '100%',
  },
  sidebarColumn1: {
    // width: '25%',
    // backgroundColor: '#e3d1e4',
    backgroundColor: 'rgba(227, 209, 228, 1)',
    flex: 1,
  },
  sidebarColumn2: {
    // width: '75%',
    // backgroundColor: 'yellow',
    flex: 3,
  },
  sidebarTabCont1: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    //   textAlign: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  sidebarTabCont2: {
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    borderColor: 'rgba(227, 209, 228, 1)',
    borderRadius: 10,
  },
  sidebarTabImage: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    // wordBreak: 'break-word',
  },
  sidebarTabText1: {
    fontSize: 12,
    // textAlign: 'center',
    // color: 'rgba(227, 209, 228, 1)',
    color: '#696868',
    textAlign: 'center',
  },
  sidebarTabText2: {
    fontSize: 18,
    // textAlign: 'center',
    // color: 'rgba(227, 209, 228, 1)',
    color: '#19161a',
    width: '100%',
    // flex: 1,
    // backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 5,
    textTransform: 'capitalize',
  },
  //
  activeSidebarTabCont1: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    //   textAlign: 'center',
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  activeSidebarTabText1: {
    fontSize: 12,
    // textAlign: 'center',
    // color: 'rgba(227, 209, 228, 1)',
    color: '#7c2981',
    textAlign: 'center',
  },
  sidebarDownArrow: {
    // backgroundColor:'red',
    paddingHorizontal: 10,
    paddingVertical: 3,
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(227, 209, 228, 1)',
    borderLeftWidth: 0.5,
  },
  headerLogo: {
    // flex: 1,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: '#7c2981',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    width: '100%',
    height: 30,
    fontWeight: 'bold',
    marginTop: 7,
    textTransform: 'capitalize',
  },
  subSubCategoryContainer: {
    // backgroundColor: 'red',
    // width: '33.33333%',
    width: '25%',
    // padding: 5,
    // shadowColor: '#E0E0E0',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // elevation: 2,
    // borderRadius: 10,
    borderColor: '#7c2981',
    // borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 5,
    overflow: 'hidden',
  },
  categoryImage: {
    height: 50,
    width: '100%',
    // resizeMode: 'cover',
    // backgroundColor: '#7c2981',
    // borderRadius: 10,
  },
  categoryTitleWrapper: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    paddingRight: 2,
    // borderBottomWidth: 0.5,
    borderColor: '#7c2981',
  },
  categoryTitle: {
    textAlign: 'center',
    fontSize: '0.5rem',
    paddingLeft: 4,
    paddingRight: 4,
    color: '#000',
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
