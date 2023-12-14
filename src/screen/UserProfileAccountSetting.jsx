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
import {useTheme, TextInput} from 'react-native-paper';

export default function UserProfileAccountSetting({navigation, route}) {
  const [userLatest, setUser] = React.useState(undefined);
  const [tokenLatest, setToken] = React.useState(undefined);
  const [profilePicture, setProfilePicture] = React.useState(undefined);

  const [fname, setFname] = React.useState('');

  const theme = useTheme();
  const {user, token} = route.params;

  console.log(route.params);

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
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    try {
      // console.log('loading');
      const getUser = await AsyncStorage.getItem('user');
      const getToken = await AsyncStorage.getItem('token');

      if (getUser && getToken) {
        setUser(JSON.parse(getUser));
        setToken(getToken);
      }
    } catch (error) {
      //
    } finally {
      // console.log('finish');
    }
  };

  React.useEffect(() => {
    requestPermission();

    if (!user && !token) {
      checkAuth();
    }
  }, [fname, token, user]);

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
    <SafeAreaView style={{flexGrow: 1}}>
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
          <View style={{flexDirection: 'row'}}>
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
            <TouchableOpacity>
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
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
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
            outlineColor="gray"
            inputMode="text"
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
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
            defaultValue={user.phone}
            outlineColor="gray"
            inputMode="numeric"
            theme={{
              roundness: 36,
              fonts: {regular: {fontFamily: 'Lato-Regular'}},
            }}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TouchableOpacity>
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
            // onChangeText={query => setPassword(query)}
            mode="outlined"
            label="Old Passwors"
            secureTextEntry
            outlineColor="gray"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TextInput
            // onChangeText={query => setPassword(query)}
            mode="outlined"
            label="Password"
            secureTextEntry
            outlineColor="gray"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TextInput
            // onChangeText={query => setPasswordc(query)}
            mode="outlined"
            label="Confirm Password"
            secureTextEntry
            outlineColor="gray"
            theme={{roundness: 36}}
            left={<TextInput.Icon icon="form-textbox-password" color="gray" />}
            style={{
              backgroundColor: theme.colors.gray5,
              fontFamily: 'Montserrat-Medium',
              width: '80%',
            }}
          />

          <TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
}
