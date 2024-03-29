import React, { useEffect } from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyStatusBar from '../components/SaldiriComponents/SaldiriStatusBar';
const styles = (isItemActive: boolean | null) =>
  EStyleSheet.create({
    container: {
      padding: 10,
    },
    itemWrapper: {
      marginVertical: 10,
      textAlign: 'center',
      paddingVertical: 5,
      borderRadius: '$borderRadius',
      backgroundColor: isItemActive ? '$primaryColor' : undefined,
    },
    itemText: {
      fontSize: '1rem',
      textAlign: 'center',
      color: isItemActive ? '#fff' : undefined,
    },
  });

interface ScrollPickerProps {
  componentId: string;
  pickerValues: [string];
  changePickerValueHandler: Function;
  selectValue: string;
  title: string;
}

export const ScrollPicker: React.FC<ScrollPickerProps> = ({
  componentId,
  pickerValues,
  changePickerValueHandler,
  selectValue,
  title,
}) => {
  const listener = {
    navigationButtonPressed: ({ buttonId }) => {
      if (buttonId === 'close') {
        Navigation.dismissModal(componentId);
      }
    },
  };

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: `${i18n.t('Select')} ${title}`.toUpperCase(),
        },
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });

    const listeners = Navigation.events().registerComponentListener(
      listener,
      componentId,
    );

    return () => {
      listeners.remove();
    };
  });

  const renderItem = (value: string) => {
    const isItemActive = value === selectValue;

    return (
      <Pressable
        activeOpacity={isItemActive ? 1 : 0.2}
        style={styles(isItemActive).itemWrapper}
        onPress={
          !isItemActive
            ? () => {
                changePickerValueHandler(value);
                Navigation.dismissModal(componentId);
              }
            : undefined
        }>
        <Text style={styles(isItemActive).itemText}>{value}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <MyStatusBar backgroundColor="#7c2981" barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS !== 'android' ? StatusBar.currentHeight : 0,
        }}>
        <ScrollView style={styles(null).container}>
          {pickerValues.map((value) => {
            return renderItem(value);
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ScrollPicker;
