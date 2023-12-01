/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './src/screen/Home';
import {name as appName} from './app.json';
import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailRecipe from './src/screen/DetailRecipe';

const theme = {
  ...DefaultTheme,
  version: 2,
  colors: {
    ...DefaultTheme.colors,
    tmRed: '#c70800',
    tmBlack: '#3F3A3A',
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

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
