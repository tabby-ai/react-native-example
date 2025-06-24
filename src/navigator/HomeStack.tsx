import * as React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {Payment} from '../screens/Payment';
import {ROUTES} from '../constants';
import {Checkout} from '../screens/Checkout';

export type HomeStackParamsList = {
  [ROUTES.Home]: undefined;
  [ROUTES.Checkout]: undefined;
  [ROUTES.Payment]: {url: string};
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
          // headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </HomeStack.Navigator>
  );
}

export {HomeStackScreen};
