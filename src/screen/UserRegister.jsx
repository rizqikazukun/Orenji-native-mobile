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

export default function UserRegister({navigation, route}) {
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordc, setPasswordc] = React.useState('');
  const [firstName, setFirstname] = React.useState('');
  const [lastName, setLastname] = React.useState('');

  const [authError, setAuthError] = React.useState('');
  const [inputError, setInputError] = React.useState(null);
  const [dupEmail, setDupEmailError] = React.useState(null);

  const [pageRegisterState, setPageRegisterState] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(5);

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
        <ProfileHeader text1="Register" />

        {/* Profile Links */}
        {/* Not Login */}
        <View style={styles.LinkBody}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: 'Montserrat-Medium',
            }}>
            Register with email
          </Text>

          <TextInput
            onChangeText={query => setFirstname(query)}
            mode="outlined"
            label="First Name"
            outlineColor="gray"
            inputMode="text"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="rename-box" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
            }}
          />

          <TextInput
            onChangeText={query => setLastname(query)}
            mode="outlined"
            label="Last Name"
            outlineColor="gray"
            inputMode="text"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="rename-box" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
            }}
          />

          <TextInput
            onChangeText={query => setEmail(query)}
            mode="outlined"
            label="Email"
            outlineColor="gray"
            inputMode="email"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="account-outline" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
            }}
          />

          <TextInput
            onChangeText={query => setPassword(query)}
            mode="outlined"
            label="Password"
            secureTextEntry
            outlineColor="gray"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
            }}
          />

          <TextInput
            onChangeText={query => setPasswordc(query)}
            mode="outlined"
            label="Confirm Password"
            secureTextEntry
            outlineColor="gray"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
            }}
          />

          <Button
            mode="contained"
            buttonColor={theme.colors.tmRed}
            style={{height: 50, borderRadius: 50, justifyContent: 'center'}}
            onPress={() => console.log('Pressed')}>
            <Text style={{fontFamily: 'Montserrat-Medium'}}>Register</Text>
          </Button>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', color: 'black'}}>
              {'Have an account? '}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UserLogin')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.colors.tmRed,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {'Login'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
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
