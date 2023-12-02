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
  Image,
} from 'react-native';

import {useTheme} from 'react-native-paper';

export default function HeatCard({source, title, category, rating, style}) {
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
      elevation: 2,
      shadowColor: '#00000088',
    },
  });

  return (
    <View style={{...styles.cardBody, ...style}}>
      <Image
        style={{height: 60, width: 60, borderRadius: 12}}
        source={{uri: source}}
      />

      <View style={{gap: 4, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Lato-Bold',
            color: theme.colors.tmBlack,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.gray40,
            fontFamily: 'Lato-Regular',
          }}>
          {category}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.gray40,
            fontFamily: 'Lato-Regular',
          }}>
          {`Rating : ${rating}`}
        </Text>
      </View>
    </View>
  );
}
