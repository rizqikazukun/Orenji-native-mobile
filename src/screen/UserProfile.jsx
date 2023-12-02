/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
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
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import * as Icons from 'react-native-feather';
import ProfileLink from '../components/ProfileLink';
import ProfileHeader from '../components/ProfileHeader';

export default function ScreenTemplate({navigation, route}) {
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();

  React.useEffect(() => {}, []);

  const styles = StyleSheet.create({
    LinkBody: {
      backgroundColor: 'white',
      marginTop: -30,
      padding: 24,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      flexDirection: 'column',
    },
  });

  return (
    <SafeAreaView style={{backgroundColor: 'white', flexGrow: 1}}>
      <StatusBar backgroundColor="#c40900ff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 64}}>
        {/* Header */}
        <ProfileHeader text1="Hi, Feel free to Join" text2="Enjoy Your Day!" />

        {/* Profile Links */}
        {/* Not Login */}
        <View style={styles.LinkBody}>
          <ProfileLink
            title="Login"
            navigation={navigation}
            navigationLink="UserLogin"
            icon={<Icons.Users color="black" height={25} width={25} />}
          />
          <ProfileLink
            title="Register"
            navigation={navigation}
            navigationLink="HomeScreen"
            icon={<Icons.UserPlus color="black" height={25} width={25} />}
          />
        </View>
        {/* Login */}
        {/* <View style={styles.profileLinkBody}>
            <Text>Not Login</Text>
          </View> */}
      </ScrollView>
      <BottomNavbar navigation={navigation} screenName="Profile" />
    </SafeAreaView>
  );
}
