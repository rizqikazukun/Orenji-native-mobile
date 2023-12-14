/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as Icons from 'react-native-feather';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileLink({
  navigation,
  navigationLink,
  title,
  icon,
  logout,
  params,
}) {
  const styles = StyleSheet.create({
    outerBody: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'space-between',
      padding: 10,
      borderRadius: 20,
    },
    textLink: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      color: 'black',
    },
  });

  if (params === undefined) {
    params = {};
  }

  return (
    <TouchableNativeFeedback
      onPress={async () => {
        if (logout) {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('token');
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}, {name: 'Profile'}],
          });
        } else {
          navigation.navigate(navigationLink, params);
        }
      }}>
      <View style={styles.outerBody}>
        <View style={{flexDirection: 'row', gap: 20}}>
          {icon}
          <Text style={styles.textLink}>{title}</Text>
        </View>
        <View>
          <Icons.ChevronRight color="black" height={20} width={20} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
