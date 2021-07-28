import React, { useState, useEffect } from 'react';
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
  // const initiallySelected = props.items[0]
  const [activeTab, setactiveTab ] = useState(props.items[0])
  // const [selectedCategoryTitle, setselectedCategoryTitle] = useState(initiallySelected.category);
  // const [subcategories, setsubcategories] = useState(initiallySelected.subcategories);

  // console.log('subcategories cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc', initiallySelected)
  return (
    <>
      <SaldiriHeader
        startHeaderTitle={
          activeTab.category ? activeTab.category : 'categories'
        }
      />

      <View style={styles.SaldiriSideBarCont}>
        {/* col 1 */}
        <View style={styles.sidebarColumn1}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            containerStyle={styles.sidebarColumn1}>
            {/* <ScrollView> */}
            {props.items.map((item, index) => (
              <>
                {/* {console.log('subcategories cccccccccccccccccccccccccccccccccccccccccccc', item.category,item.subcategories)} */}
                <Pressable
                  onPress={() => {
                    setactiveTab(item);
                    // setselectedCategoryTitle(item.category);
                    // setsubcategories(item.subcategories);
                  }}
                  key={index}
                  style={
                    activeTab.category === item.category
                      ? styles.activeSidebarTabCont1
                      : styles.sidebarTabCont1
                  }>
                  <Image
                    style={styles.sidebarTabImage}
                    source={{
                      uri:
                        'https://siraan.com/images/abt__ut2/menu-with-icon/8/222-abt__ut2_mwi__icon.png',
                    }}
                  />
                  <Text
                    style={
                      activeTab.category === item.category
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
            {activeTab.subcategories
              ? activeTab.subcategories.map((item, index) => {
                  const [showSubSubCategories, setshowSubSubCategories] = useState(false);
                  return (
                    <>
                      <View key={index} style={styles.sidebarTabCont2}>
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
                              onPress={() =>
                                setshowSubSubCategories(!showSubSubCategories)
                              }
                              style={styles.sidebarDownArrow}>
                              <MaterialIcons
                                name={
                                  showSubSubCategories
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

                        {showSubSubCategories && item.subcategories ? (
                          <View>
                            {item.subcategories.map((item, index) => {
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
              : null}
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
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
