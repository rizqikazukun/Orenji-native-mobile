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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScreenTemplate({navigation, route}) {
  const theme = useTheme();

  const [user, setUser] = React.useState(undefined);
  const [token, setToken] = React.useState(undefined);

  const checkAuth = async () => {
    try {
      console.log('loading');
      const getUser = await AsyncStorage.getItem('user');
      const getToken = await AsyncStorage.getItem('token');
      if (getUser && getToken) {
        setUser(JSON.parse(getUser));
        setToken(getToken);
      }
    } catch (error) {
      //
    } finally {
      console.log('finish');
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

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
      <StatusBar backgroundColor={theme.colors.OjenjiMid} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Links */}

        {/* Not Login */}
        {!(user === undefined && token === undefined) ? (
          <>
            <ProfileHeader
              text1={`Hi, ${user.first_name}`}
              text2="Have a Day!"
            />
            <View style={styles.LinkBody}>
              <ProfileLink
                title="Logout"
                navigation={navigation}
                logout={true}
                icon={<Icons.LogOut color="black" height={18} width={18} />}
              />
            </View>
          </>
        ) : (
          <>
            {/* Header */}
            <ProfileHeader
              text1="Hi, Feel free to Join"
              text2="Enjoy Your Day!"
            />
            <View style={styles.LinkBody}>
              <ProfileLink
                title="Login"
                navigation={navigation}
                navigationLink="UserLogin"
                icon={<Icons.Users color="black" height={18} width={18} />}
              />
              <ProfileLink
                title="Register"
                navigation={navigation}
                navigationLink="UserRegister"
                icon={<Icons.UserPlus color="black" height={18} width={18} />}
              />
            </View>
          </>
        )}
        {/* Login */}
        {/* <View style={styles.profileLinkBody}>
            <Text>Not Login</Text>
          </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
