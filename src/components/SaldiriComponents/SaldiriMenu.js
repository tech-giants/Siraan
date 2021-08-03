import React, { Component } from 'react';
import {
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  Pressable,
  View,
    Image,
  FlatList
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const SaldiriMenu = ({ trigerComp, optionsArr }) => (
  <View>
    <Menu>
      <MenuTrigger>{trigerComp}</MenuTrigger>
      <MenuOptions>
        <FlatList
          data={optionsArr}
          renderItem={(item) => (
            <MenuOption onSelect={item.onPress}>
              <Text style={{color: 'red'}}>{item.title}</Text>
            </MenuOption>
          )}
        />
        {/* {optionsArr.map((item, index) => {
          <MenuOption onSelect={item.onPress} text={item.title} />;
        })} */}
        {/* <MenuOption onSelect={() => alert(`Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        /> */}
      </MenuOptions>
    </Menu>
  </View>
);
export default SaldiriMenu;
