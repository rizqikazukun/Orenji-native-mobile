/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import * as Icons from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';

export default function BookmarkScreen() {
  const theme = useTheme();
  const {user, token} = useSelector(state => state.auth);
  const navigation = useNavigation();

  React.useEffect(() => {}, []);
  const styles = StyleSheet.create({});

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <ScrollView>
        <View id="BookmarkScreen">
          <Text>Hello World</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
