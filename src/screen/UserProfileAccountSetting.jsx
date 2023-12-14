/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  PermissionsAndroid,
  Button,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, TextInput } from 'react-native-paper';
import axios from 'axios';
import { backendUrl } from '../config'

export default function UserProfileAccountSetting({ navigation, route }) {

  const [profilePicture, setProfilePicture] = React.useState(undefined);
  const [first_name, setFname] = React.useState('');
  const [last_name, setLname] = React.useState('')
  const [phone_number, setPhonenumber] = React.useState('')
  const [old_password, setOldpassword] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordC, setPasswordc] = React.useState('')

  const theme = useTheme();
  const { user, token } = route.params;

  const handlerChangePhoto = async () => {
    try {
      const form = new FormData()
      form.append('user-photo', profilePicture)

      await axios
        .post(`${backendUrl}/user/profile/update-photo`, form, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })

      alert('Photo Profile Updated')
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
    }
  }

  const handlerChangeInfo = async () => {
    try {
      await axios({
        method: 'put',
        url: `${backendUrl}/user/profile/edit`,
        data: {
          first_name,
          last_name,
          phone_number
        },
        headers: {
          Authorization: token
        }
      })

      const getDetailProfile = await axios({
        url: `${backendUrl}/user/profile`,
        headers: {
          Authorization: token,
        },
      });

      await AsyncStorage.setItem('user', JSON.stringify({ ...user, ...getDetailProfile.data.data }))
      alert('Success, Info Updated')
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
    }
  }

  const handlerChangePassword = async () => {
    try {
      if (password !== passwordC) {
        alert('Confirmation Password is not match')
        return
      }

      await axios({
        method: 'put',
        url: `${backendUrl}/user/profile/update-password-new`,
        data: {
          old_password,
          password
        },
        headers: {
          Authorization: token
        }
      })

      alert('Success, Password Updated')
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
    }
  }

  const photoPicker = async () => {
    try {
      const photo = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setProfilePicture(photo);
    } catch (err) {
      //
    }
  };

  const requestPermission = async () => {
    try {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  const styles = {
    cards: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      padding: 20,
      marginHorizontal: 10,
      marginVertical: 5,

      backgroundColor: 'white',

      borderRadius: 14,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    cardTitle: {
      fontFamily: 'Montserrat-Bold',
      color: 'black',
      fontSize: 18,
    },
    submitButton: {
      color: 'white',
      padding: 2,
      fontFamily: 'Montserrat-Bold',
    },
  };

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View id="change-photo" style={styles.cards}>
          <Text style={styles.cardTitle}>Change Photo</Text>
          <Image
            height={120}
            width={120}
            source={{
              uri: profilePicture
                ? profilePicture?.uri
                : user
                  ? user?.photo_profile
                  : 'https://res.cloudinary.com/dwptyupfa/image/upload/v1702351028/default/qypd8uufip0no3st2ukx.jpg',
            }}
            style={{
              borderRadius: 150,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={photoPicker}>
              <View
                style={{
                  padding: 10,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  backgroundColor: theme.colors.gray5,
                }}>
                <Text>Choose Photo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerChangePhoto}>
              <View
                style={{
                  padding: 10,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  backgroundColor: theme.colors.OjenjiMid,
                }}>
                <Text style={styles.submitButton}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View id="change-info" style={styles.cards}>
          <Text style={styles.cardTitle}>Change Info</Text>

          <TextInput
            mode="outlined"
            label="First Name"
            defaultValue={user.first_name}
            onChangeText={text => setFname(text)}
            outlineColor="gray"
            inputMode="text"
            theme={{
              roundness: 36,
              fonts: { regular: { fontFamily: 'Lato-Regular' } },
            }}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TextInput
            mode="outlined"
            label="Last Name"
            defaultValue={user.last_name}
            onChangeText={text => setLname(text)}
            outlineColor="gray"
            inputMode="text"
            theme={{
              roundness: 36,
              fonts: { regular: { fontFamily: 'Lato-Regular' } },
            }}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TextInput
            mode="outlined"
            label="Phone Number"
            defaultValue={user.phone_number}
            onChangeText={text => setPhonenumber(text)}
            outlineColor="gray"
            inputMode="numeric"
            theme={{
              roundness: 36,
              fonts: { regular: { fontFamily: 'Lato-Regular' } },
            }}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TouchableOpacity onPress={handlerChangeInfo}>
            <View
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: theme.colors.OjenjiMid,
              }}>
              <Text style={styles.submitButton}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View id="change-password" style={styles.cards}>
          <Text style={styles.cardTitle}>Change Password</Text>

          <TouchableOpacity>
            <Text>Forgot Password ? Reset Here</Text>
          </TouchableOpacity>

          <TextInput
            onChangeText={query => setOldpassword(query)}
            mode="outlined"
            label="Old Passwors"
            secureTextEntry
            outlineColor="gray"
            theme={{ roundness: 36 }}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TextInput
            onChangeText={query => setPassword(query)}
            mode="outlined"
            label="Password"
            secureTextEntry
            outlineColor="gray"
            theme={{ roundness: 36 }}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TextInput
            onChangeText={query => setPasswordc(query)}
            mode="outlined"
            label="Confirm Password"
            secureTextEntry
            outlineColor="gray"
            theme={{ roundness: 36 }}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TouchableOpacity onPress={handlerChangePassword}>
            <View
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: theme.colors.OjenjiMid,
              }}>
              <Text style={styles.submitButton}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View id="change-photo" style={{...styles.cards, flexDirection: 'column'}}>
          <Text style={{flexShrink: 1, textAlign: 'center'}}>
            Sorry, Application is under development, some change may not change real time.
            If you have been made a changes, please press refresh button.
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Profile'}],
            });
          }}>
            <View
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: theme.colors.OjenjiMid,
              }}>
              <Text style={styles.submitButton}>Refresh</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
