import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import HotelList from '../screens/HotelListScreen';
import FlightScreen from '../screens/FlightScreen';
import MusicScreen from '../screens/MusicScreen';
import FoodScreen from '../screens/FoodScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { ClerkLoaded, useUser } from '@clerk/clerk-expo';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const tabNavigatorOptions = {
  tabBarActiveTintColor: '#101',
  tabBarInactiveTintColor: 'gray',
  labelStyle: {
    fontSize: 10,
    fontWeight: '700',
  },
  headerShown: false,
  style: {
    backgroundColor: '#000',
  },
};

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Profile') {
      iconName = 'home';
    } else if (route.name === 'Settings') {
      iconName = 'cog';
    } else if (route.name === 'Itinerary') {
      iconName = 'heart';
    } else if (route.name === 'Hotel') {
      iconName = 'bed';
    } else if (route.name === 'Flight') {
      iconName = 'airplane';
    } else if (route.name === 'Music') {
      iconName = 'music-note';
    } else if (route.name === 'Food') {
      iconName = 'food';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarLabel: '',
});

const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <ClerkLoaded>
      {isSignedIn ? (
        <Tab.Navigator screenOptions={tabNavigatorOptions}>
          <Tab.Screen
            name="Profile"
            component={MyProfileScreen}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Hotel"
            component={HotelList}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Flight"
            component={FlightScreen}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Food"
            component={FoodScreen}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Itinerary"
            component={ItineraryScreen}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Music"
            component={MusicScreen}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={tabScreenOptions}
          />
          {/* Include FoodDetailScreen here */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen
            name="VerifyCode"
            component={VerifyCodeScreen}
          />
        </Stack.Navigator>
      )}
    </ClerkLoaded>
  );
}
