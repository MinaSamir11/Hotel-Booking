import React from 'react';

import {} from 'react-native';

import Registration from '../Screens/Registration';

import Home from '../Screens/Home';

import HotelDetails from '../Screens/HotelDetails';

import Profile from '../Screens/Profile';

import BookingDetails from '../Screens/BookingDetails';

import Splash from '../Screens/Splash';

import OnBoarding from '../Screens/Onboarding';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="WelcomeStack" component={WelcomeStack} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
