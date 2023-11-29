/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, useTheme } from 'react-native-paper';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  useWindowDimensions,
  ImageBackground,
  Image,
} from 'react-native';


export default function DetailRecipe({navigation, route}) {
  const [search, setSearch] = React.useState('');
  const theme = useTheme();
  const { height, width, scale, fontScale } = useWindowDimensions();
  const {image, title} = route.params;


  React.useEffect(() => { }, []);

  const styles = StyleSheet.create({
    searchbar: {
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 20,
      marginTop: 150,
    },
    h2_black: {
      color: theme.colors.tmRed,
      fontWeight: '800',
      fontSize: 20,
    },
    sub_h2: {
      color: theme.colors.gray40,
    },
  });

  return (
    <SafeAreaView edges={['top', 'right', 'bottom', 'left']}>
      <StatusBar backgroundColor="#c40900ff" />
      <ScrollView showsVerticalScrollIndicator={false}>



      </ScrollView>
    </SafeAreaView>
  );
}
