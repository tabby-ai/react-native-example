import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {App as Application} from './src/index';
import {StyleGuide} from './src/constants';
import {Tabby} from 'tabby-react-native-sdk';
import {tabbyApiKey} from './src/constants/api';

Tabby.setApiKey(tabbyApiKey);

const styles = StyleSheet.create({
  container: {flex: 1},
  flashMessageText: {
    color: StyleGuide.colors.black,
    fontSize: 14,
    lineHeight: 18,
  },
  flashMessageContainer: {
    borderRadius: 16,
    elevation: 3,
    backgroundColor: StyleGuide.colors.white,
    shadowColor: StyleGuide.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={StyleGuide.colors.bg}
        />
        <Application />
        <FlashMessage
          textStyle={styles.flashMessageText}
          titleStyle={styles.flashMessageText}
          position="top"
          style={styles.flashMessageContainer}
        />
      </NavigationContainer>
    </View>
  );
};

export {App};
