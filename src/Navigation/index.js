import React from 'react';

import {Platform, Dimensions, View} from 'react-native';

import Registration from '../Screens/Registration';

import Profile from '../Screens/Profile';

import Splash from '../Screens/Splash';

import OnBoarding from '../Screens/Onboarding';

import {createStackNavigator} from '@react-navigation/stack';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../Assets';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Registration" component={OnBoarding} />
      {/* <Stack.Screen name="Navigator" component={Navigator} /> */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
