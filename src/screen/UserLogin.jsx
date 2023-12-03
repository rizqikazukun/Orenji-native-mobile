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
import {
  useTheme,
  TextInput,
  Button,
  Portal,
  Modal,
  Snackbar,
} from 'react-native-paper';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import ProfileHeader from '../components/ProfileHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {backendUrl} from '../config';

export default function UserLogin({navigation}) {
  const theme = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const signButtonHandler = async () => {
    try {
      setIsLoading(true);
      const request = await axios({
        method: 'post',
        url: `${backendUrl}/user/login`,
        data: {
          email,
          password,
        },
      });

      await AsyncStorage.setItem('token', `Bearer ${request.data.token}`);
      await AsyncStorage.setItem('user', JSON.stringify(request.data.data));

      navigation.navigate('HomeScreen');
      // console.log(await AsyncStorage.getItem('token'));
      // console.log(await AsyncStorage.getItem('user'));
    } catch (err) {
      if (err.response.status === 422) {
        setSnackMessage(String(err.response.data.message));
        setVisible(true);
      }

      if (err.response.status === 401) {
        setSnackMessage('Wrong Password');
        setVisible(true);
        return;
      }

      if (err.response.status === 404) {
        setSnackMessage('User Not Found');
        setVisible(true);
        return;
      }

      if (err.response.status === 500) {
        setSnackMessage(String(err.response.data.massage));
        setVisible(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        wrapperStyle={{top: 0}}
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          zIndex: 999,
        }}
        action={{
          label: 'Close',
          labelStyle: {color: 'black'},
          onPress: () => {
            setSnackMessage('');
          },
        }}>
        <Text style={{color: theme.colors.tmRed}}>{snackMessage}</Text>
      </Snackbar>

      <Portal>
        <Modal
          visible={isLoading}
          onDismiss={() => {
            //
          }}
          contentContainerStyle={{backgroundColor: 'transparent', padding: 20}}>
          <View style={{justifyContent: 'center', gap: 10}}>
            <ActivityIndicator size="large" color={theme.colors.tmRed} />
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontFamily: 'Montserrat-Bold',
              }}>
              Loading
            </Text>
          </View>
        </Modal>
      </Portal>

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
            onPress={signButtonHandler}>
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
