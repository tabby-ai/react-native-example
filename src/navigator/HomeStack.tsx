import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {Payment} from '../screens/Payment';
import {ROUTES, TabbyPurchaseType} from '../constants';
import {SnippetWebView} from '../screens/SnippetWebView/SnippetWebView';

export type HomeStackParamsList = {
  [ROUTES.Home]: undefined;
  [ROUTES.Payment]: {type: TabbyPurchaseType};
  [ROUTES.SnippetWebView]: {lang: 'en' | 'ar'};
};

const HomeStack = createStackNavigator<HomeStackParamsList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
      }}>
      <HomeStack.Screen
        name={ROUTES.Home}
        component={Home}
        options={{
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.Payment}
        component={Payment}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.SnippetWebView}
        component={SnippetWebView}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </HomeStack.Navigator>
  );
}

export {HomeStackScreen};
