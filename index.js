/* eslint-disable react/no-unstable-nested-components */
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
import UserRegister from './src/screen/UserRegister';

import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as Icons from 'react-native-feather';

const theme = {
  ...DefaultTheme,
  version: 2,
  colors: {
    ...DefaultTheme.colors,
    OjenjiMid: '#f0570bff',
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
const Tab = createMaterialBottomTabNavigator();

function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={HomeScreen} />
      <Stack.Screen
        name="Detail Recipe"
        component={DetailRecipe}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={UserProfile} />
      <Stack.Screen
        name="UserLogin"
        component={UserLogin}
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.OjenjiMid,
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegister}
        options={{
          title: 'Register',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.OjenjiMid,
          },
          cardShadowEnabled: false,
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationType="shifting"
      activeColor={theme.colors.OjenjiMid}
      inactiveColor={theme.colors.gray20}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarColor: 'white',
      }}
      backBehavior="order"
      labeled={false}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({color}) => <Icons.Home color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        options={{
          tabBarIcon: ({color}) => <Icons.User color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <TabNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
