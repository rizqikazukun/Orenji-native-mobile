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
import {useTheme, TextInput, Button} from 'react-native-paper';
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

export default function UserLogin({navigation, route}) {
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {}, []);

  const styles = StyleSheet.create({
    LinkBody: {
      backgroundColor: 'white',
      marginTop: -30,
      padding: 24,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      flexDirection: 'column',
      gap: 20,
    },
  });

  return (
    <SafeAreaView style={{backgroundColor: 'white', flexGrow: 1}}>
      <StatusBar backgroundColor="#c40900ff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 64}}>
        {/* Header */}
        <ProfileHeader text1="Login" />

        {/* Profile Links */}
        {/* Not Login */}
        <View style={styles.LinkBody}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: 'Montserrat-Medium',
            }}>
            Login with email
          </Text>

          <TextInput
            onChangeText={query => setEmail(query)}
            mode="outlined"
            label="Email"
            outlineColor="gray"
            inputMode="email"
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
            }}
            left={<TextInput.Icon icon="account-outline" color="gray" />}
            inputStyle={{fontFamily: 'Lato-Regular', fontSize: 14}}
            style={{
              backgroundColor: theme.colors.gray5,
            }}
          />

          <TextInput
            onChangeText={query => setPassword(query)}
            mode="outlined"
            label="Password"
            secureTextEntry
            outlineColor="gray"
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
            }}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
            }}
          />

          <Button
            mode="contained"
            buttonColor={theme.colors.tmRed}
            style={{
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => console.log('Pressed')}>
            <Text style={{fontFamily: 'Montserrat-Medium'}}>Login</Text>
          </Button>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontFamily: 'Montserrat-Medium',
              }}>
              {"Don't have an account? "}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UserRegister')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.colors.tmRed,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {'Register'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
      <BottomNavbar navigation={navigation} screenName="Profile" />
    </SafeAreaView>
  );
}
