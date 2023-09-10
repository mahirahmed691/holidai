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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon library you want to use

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
  tabBarActiveTintColor: '#9ff9ff', // Active icon color
  tabBarInactiveTintColor: 'gray', // Inactive icon color
  labelStyle: {
    fontSize: 10,
    fontWeight: '700',
  },
  headerShown: false,
  style: {
    backgroundColor: '#000', // Black background for the tab bar
  },
};

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Profile') {
      iconName = 'home'; // Your icon name
    } else if (route.name === 'Settings') {
      iconName = 'cog'; // Your icon name
    } else if (route.name === 'Itinerary'){
      iconName = 'note'; 
    } else if (route.name === 'Hotel'){
      iconName = 'bed'; 
    }
    else if (route.name === 'Flight'){
      iconName = 'airplane'; 
    }
    else if (route.name === 'Music'){
      iconName = 'music'; 
    }
    else if (route.name === 'Food'){
      iconName = 'food'; 
    }
    
    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarLabel: '', // Set the tabBarLabel to an empty string to hide the title
});


  
const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <ClerkLoaded>
      {isSignedIn ? (
        <Tab.Navigator
          {...tabNavigatorOptions}
        >
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
          <Stack.Screen
            name="Itinerary"
            component={ItineraryScreen}
            options={tabScreenOptions}
          />
          <Stack.Screen
            name="Music"
            component={MusicScreen}
            options={tabScreenOptions}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={tabScreenOptions}
          />
          
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
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
