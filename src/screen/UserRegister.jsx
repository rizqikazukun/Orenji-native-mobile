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
  Snackbar,
  Modal,
  Portal,
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
import axios from 'axios';
import {backendUrl} from '../config';

export default function UserRegister({navigation, route}) {
  const theme = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordc, setPasswordc] = React.useState('');
  const [firstName, setFirstname] = React.useState('');
  const [lastName, setLastname] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {}, [isLoading]);

  const registerButtonHandler = () => {
    setIsLoading(true);

    if (password !== passwordc) {
      setIsLoading(false);
      setSnackMessage('Password Not Match');
      setVisible(true);
      return;
    }

    axios({
      method: 'post',
      url: `${backendUrl}/user/register`,
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    })
      .then(() => {
        setSnackMessage('Register Success');
        setVisible(true);
        navigation.navigate('UserLogin');
      })
      .catch(err => {
        if (err.response.status === 422) {
          setSnackMessage(String(err.response.data.message));
          setVisible(true);
        }

        if (err.response.status === 409) {
          setSnackMessage(String(err.response.data.massage));
          setVisible(true);
        }

        if (err.response.status === 500) {
          setSnackMessage(String(err.response.data.massage));
          setVisible(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        <ProfileHeader text1="Register" />

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
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
            }}
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
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
            }}
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
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
            }}
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
            onPress={registerButtonHandler}>
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
      </ScrollView>
      <BottomNavbar navigation={navigation} screenName="Profile" />
    </SafeAreaView>
  );
}
