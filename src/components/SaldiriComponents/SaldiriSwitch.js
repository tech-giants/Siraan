import * as React from 'react';
import { Switch } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';

export default (props) => {
  const { label, onToggle, value } = props;
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    onToggle(!isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
    // console.log('isSwitchOn=>', isSwitchOn, 'not_isSwitchOn =>', !isSwitchOn);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.SaldiriSwitchLabel}>{label}</Text>
        <Switch
          color="#7c2981"
          value={value ? value : isSwitchOn}
          onValueChange={onToggleSwitch}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SaldiriSwitchLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
  },
});
