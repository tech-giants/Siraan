import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SaldiriHeader from './SaldiriHeaderBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

const SaldiriSideBar = (props) => {
  // const [activeCategory, setactiveCategory ] = useState(props.items[0])
  const [selectedCategoryTitle, setselectedCategoryTitle] = useState(
    props.items[0].category,
  );
  const [subcategories, setsubcategories] = useState(
    props.items[0].subcategories,
  );
  var state_array = Array(props.items[0].subcategories.length).fill(false);
  const [subcategories_sub, setsubsubcategories] = useState(state_array);
  console.log("asasdada ",subcategories_sub)

  return (
    <>
      <SaldiriHeader
        startHeaderTitle={
          selectedCategoryTitle ? selectedCategoryTitle : 'categories'
        }
      />

      <View style={styles.SaldiriSideBarCont}>
        {/* col 1 */}
        <View
          showsVerticalScrollIndicator={false}
          style={styles.sidebarColumn1}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            containerStyle={styles.sidebarColumn1}>
            {/* <ScrollView> */}
            {props.items.map((item, index1) => (
              <>
                {/* {console.log('subcategories cccccccccccccccccccccccccccccccccccccccccccc', item.category,item.subcategories)} */}
                <Pressable
                  onPress={() => {
                    setselectedCategoryTitle(item.category);
                    setsubcategories(item.subcategories);
                    // console.log("sub sub 62 ",item.subcategories.subcategories.length)
                    // if(item.subcategories.subcategories){
                      if(item.subcategories){
                          state_array = Array(item.subcategories.length).fill(false);
                          setsubsubcategories(
                            state_array
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
                    selectedCategoryTitle === item.category
                      ? styles.activeSidebarTabCont1
                      : styles.sidebarTabCont1
                  }>
                  <Image
                    style={styles.sidebarTabImage}
                    source={{
                      uri: 'https://siraan.com/moblogo/moblogo.png',
                    }}
                  />
                  <Text
                    style={
                      selectedCategoryTitle === item.category
                        ? styles.activeSidebarTabText1
                        : styles.sidebarTabText1
                    }>
                    {item.category}
                  </Text>
                </Pressable>
              </>
            ))}
          </ScrollView>
        </View>
        {/* col 2 */}
        <View style={styles.sidebarColumn2}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            containerStyle={styles.sidebarColumn1}>
            {subcategories ? (
              subcategories.map((item, index2) => {
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
                        <Pressable style={styles.sidebarTabCont11}>
                          <Text style={styles.sidebarTabText2}>
                            {' '}
                            {item.category}
                          </Text>
                        </Pressable>
                        {item.subcategories ? (
                          <Pressable
                            onPress={() => {
                              console.log("press event ");
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
                              for(var i=0;i<subcategories_sub.length;i++){
                                console.log("ith of ",subcategories_sub[i])
                              if(subcategories_sub[i]==true){
                                state_array[i]=true
                              }
                              }
                              if(subcategories_sub[index2]==true){
                                console.log("inside true event")
                              state_array[index2] =false;
                              }
                              else{
                                console.log("inside false event")
                                 state_array[index2] =true;
                              }
                              //  console.log(
                              //   'state_array --164 ',
                              //   state_array,
                              // );
                              // console.log(
                              //   'sub categoriess --132 ',
                              //   subcategories_sub,
                              // );
                              setsubsubcategories(state_array);
                             
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

                      {/* showSubSubCategories && */}
                      {subcategories_sub[index2] && item.subcategories ? (
                        <View>
                          {item.subcategories.map((item, index3) => {
                            return (
                              <>
                                <Text style={styles.sidebarTabText2}>
                                  {item.category}
                                </Text>
                              </>
                            );
                          })}
                        </View>
                      ) : null}
                    </View>
                  </>
                );
              })
            ) : (
              <Text>this category has no sub-category</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SaldiriSideBar;

const styles = StyleSheet.create({
  SaldiriSideBarCont: {
    flex: 1,
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
  },
  sidebarDownArrow: {
    // backgroundColor:'red',
    paddingHorizontal: 10,
    paddingVertical: 3,
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
