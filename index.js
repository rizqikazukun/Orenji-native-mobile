/* eslint-disable no-unused-vars */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import {name as appName} from './app.json';
import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import DetailRecipe from './src/screen/DetailRecipe';
import UserProfile from './src/screen/UserProfile';
import UserLogin from './src/screen/UserLogin';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const theme = {
  ...DefaultTheme,
  version: 2,
  colors: {
    ...DefaultTheme.colors,
    tmRed: '#c70800',
    tmBlack: '#3F3A3A',
    gray5: '#F8F8F8',
    gray10: '#EFEFEF',
    gray20: '#B6B6B6',
    gray40: '#666666',
    whiteT70: '#f5f5f5',
    whiteT80: '#FFFFFF80',
  },
  padding: {
    containerHorizontal: 12,
    viewPadding: 5,
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UserLogin" component={UserLogin} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
