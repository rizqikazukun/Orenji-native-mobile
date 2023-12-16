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
  View,
  Image,
  Text,
} from 'react-native';
import * as Icons from 'react-native-feather';
import ProfileLink from '../components/ProfileLink';
import ProfileHeader from '../components/ProfileHeader';
import {useSelector} from 'react-redux';

export default function AboutAppScreen({navigation, route}) {
  const theme = useTheme();
  const {user, token} = useSelector(state => state.auth);

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
    headerBody: {
      height: 280,
      backgroundColor: theme.colors.OjenjiMid,
      flexDirection: 'column',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bodyText: {
      textAlign: 'justify',
      color: 'black',
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      paddingHorizontal: 24,
    },
  });

  return (
    <SafeAreaView style={{backgroundColor: 'white', flexGrow: 1}}>
      <StatusBar backgroundColor={theme.colors.OjenjiMid} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Links */}

        <>
          <View style={styles.headerBody}>
            <Image
              style={{height: 150, width: 200, objectFit: 'scale-down'}}
              src="https://res.cloudinary.com/dwptyupfa/image/upload/v1702706793/default/jfsxlpohcho4rk1hdsht.png"
            />
          </View>
          <View style={styles.LinkBody}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontFamily: 'Montserrat-Bold',
                fontSize: 23,
                padding: 24,
              }}>
              Orenji Recipe Mobile
            </Text>
            <Text style={styles.bodyText}>
              Halo selamat datang di app ini, project ini adalah versi mobile
              dari web mama recipe, Mama Recipe adalah website untuk melihat,
              membuat, dan membagikan resep. ada juga resep yang disediakan oleh
              saya selaku developernya hehe.
            </Text>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
}
