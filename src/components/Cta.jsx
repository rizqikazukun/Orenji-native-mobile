/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function Cta({navigation}) {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 64,
        height: 50,
        width: width,
        backgroundColor: '#c40900ff',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        zIndex: 9999,
      }}>
      <Text style={{color: 'white', fontFamily: 'Montserrat-Medium'}}>
        Sudah punya akun Tomato?
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          height: 30,
          width: 80,
          borderRadius: 30,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('UserLogin')}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              textAlign: 'center',
              color: theme.colors.tmRed,
            }}>
            Login
          </Text>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
