import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {Payment} from '../screens/Payment';
import {ROUTES} from '../constants';
import {SnippetWebView} from '../screens/SnippetWebView/SnippetWebView';
import {Checkout} from '../screens/Checkout';
import {TabbyCheckoutPayload} from '../constants/payment';

export type HomeStackParamsList = {
  [ROUTES.Home]: undefined;
  [ROUTES.Checkout]: {payload: TabbyCheckoutPayload};
  [ROUTES.Payment]: {
    url: string;
  };
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
        name={ROUTES.Checkout}
        component={Checkout}
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
