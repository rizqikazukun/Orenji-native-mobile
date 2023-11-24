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
  Image,
} from 'react-native';

import {useTheme} from 'react-native-paper';

export default function HeatCard({image, title, category, rating, style}) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    cardBody: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: 15,
      padding: 10,
      borderRadius: 12,
      backgroundColor: '#fff',
      marginVertical: 5,
    },
  });

  return (
    <View style={{...styles.cardBody, ...style}}>
      <Image style={{height: 60, width: 60, borderRadius: 12}} source={image} />

      <View>
        <Text
          style={{fontSize: 16, fontWeight: 500, color: theme.colors.tmBlack}}>
          {title}
        </Text>
        <Text style={{fontSize: 12, color: theme.colors.gray40}}>
          {category}
        </Text>
        <Text style={{fontSize: 12, color: theme.colors.gray40}}>{rating}</Text>
      </View>
    </View>
  );
}
