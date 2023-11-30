/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import BottomNavbar from '../components/BottomNavbar';



export default function ScreenTemplate({ navigation, route }) {
  const [search, setSearch] = React.useState('');
  const theme = useTheme();
  const { height, width, scale, fontScale } = useWindowDimensions();
  const { image, title } = route.params;

  React.useEffect(() => { }, []);

  const inset = useSafeAreaInsets();
  const styles = StyleSheet.create({});

  return (
    <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={{ height: height - 30 }}>
      <StatusBar backgroundColor="#c40900ff" />
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 64 }}>
          <Text>Hello</Text>
        </ScrollView>
      </View>
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
}
