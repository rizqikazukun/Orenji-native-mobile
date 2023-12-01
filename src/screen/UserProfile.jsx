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
import {Searchbar, useTheme} from 'react-native-paper';
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

export default function ScreenTemplate({navigation, route}) {
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();

  React.useEffect(() => {}, []);

  const styles = StyleSheet.create({
    headerBody: {
      height: 300,
      backgroundColor: theme.colors.tmRed,
      flexDirection: 'column',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerProfile: {
      height: 120,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 8,
      borderRadius: 60,
    },
    headerText: {
      fontFamily: 'Montserrat-Bold',
      color: 'white',
      textAlign: 'center',
    },
    profileLinkBody: {
      backgroundColor: 'white',
      marginTop: -30,
      padding: 24,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      flexDirection: 'column',
    },
  });

  return (
    <SafeAreaView
      style={{
        height: height - StatusBar.currentHeight,
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor="#c40900ff" />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 64}}>
          {/* Header */}
          <View style={styles.headerBody}>
            <View style={styles.headerProfile}>
              <Icons.User color={theme.colors.tmRed} height={80} width={80} />
            </View>
            <View>
              <Text style={styles.headerText}>Hi, Feel free to Join</Text>
              <Text style={styles.headerText}>Enjoy Your Day!</Text>
            </View>
          </View>
          {/* Profile Links */}
          {/* Not Login */}
          <View style={styles.profileLinkBody}>
            <ProfileLink
              title="Login"
              navigation={navigation}
              navigationLink="HomeScreen"
              icon={<Icons.Users color="black" height={30} width={30} />}
            />
            <ProfileLink
              title="Register"
              navigation={navigation}
              navigationLink="HomeScreen"
              icon={<Icons.UserPlus color="black" height={30} width={30} />}
            />
          </View>
          {/* Login */}
          {/* <View style={styles.profileLinkBody}>
            <Text>Not Login</Text>
          </View> */}
        </ScrollView>
      </View>
      <BottomNavbar navigation={navigation} screenName="Profile" />
    </SafeAreaView>
  );
}
