/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './src/screen/Home';
import {name as appName} from './app.json';

import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    tmBlack: '#3F3A3A',
    gray10: '#EFEFEF',
    gray20: '#B6B6B6',
    gray40: '#666666',
    whiteT70: '#f8f8f8',
    whiteT80: '#FFFFFF80',
  },
  padding: {
    containerHorizontal: 12,
    viewPadding: 5,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <Home />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
