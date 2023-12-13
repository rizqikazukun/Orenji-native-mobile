/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
} from 'react-native';

import {useTheme} from 'react-native-paper';

export default function PopularCard({title, source}) {
  return (
    <ImageBackground
      source={{uri: source}}
      imageStyle={{
        borderRadius: 10,
        marginVertical: 12,
        marginHorizontal: 5,
      }}>
      <View
        style={{
          width: 160,
          height: 240,
          display: 'flex',
          justifyContent: 'flex-end',
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Lato-Bold',
            fontSize: 16,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
          }}>
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
}
