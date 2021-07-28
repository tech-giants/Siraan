import React from 'react';
import { StyleSheet, View, Text, Image,Pressable
 } from 'react-native';

const SaldiriSideBar = () => {
  return (
    <>
      <View style={styles.SaldiriSideBarCont}>
        {/* col 1 */}
        <View style={styles.sidebarColumn1}>
          <Pressable style={styles.sidebarTabCont}>
            <Image
              style={styles.sidebarTabImage}
              source={{
                uri:
                  'https://siraan.com/images/abt__ut2/menu-with-icon/8/222-abt__ut2_mwi__icon.png',
              }}
            />
            <Text style={styles.sidebarTabText}>categories</Text>
          </Pressable>
          <Pressable style={styles.sidebarTabCont}>
            <Image
              style={styles.sidebarTabImage}
              source={{
                uri:
                  'https://siraan.com/images/abt__ut2/menu-with-icon/8/222-abt__ut2_mwi__icon.png',
              }}
            />
            <Text style={styles.sidebarTabText}>categories</Text>
          </Pressable>
          <Pressable style={styles.sidebarTabCont}>
            <Image
              style={styles.sidebarTabImage}
              source={{
                uri:
                  'https://siraan.com/images/abt__ut2/menu-with-icon/8/222-abt__ut2_mwi__icon.png',
              }}
            />
            <Text style={styles.sidebarTabText}>categories</Text>
          </Pressable>
          <Pressable style={styles.sidebarTabCont}>
            <Image
              style={styles.sidebarTabImage}
              source={{
                uri:
                  'https://siraan.com/images/abt__ut2/menu-with-icon/8/222-abt__ut2_mwi__icon.png',
              }}
            />
            <Text style={styles.sidebarTabText}>categories</Text>
          </Pressable>
        </View>
        {/* col 2 */}
        <View style={styles.sidebarColumn2}>
          <Text>column 2</Text>
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
    backgroundColor: 'rgba(227, 209, 228, 0.2)',
    flex: 1,
  },
  sidebarColumn2: {
    // width: '75%',
    backgroundColor: 'yellow',
    flex: 3,
  },
  sidebarTabCont: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    //   textAlign: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  sidebarTabImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  sidebarTabText: {
    fontSize: 12,
    textAlign: 'center',
    // color: 'rgba(227, 209, 228, 1)',
    color: '#696868',
  },
});
