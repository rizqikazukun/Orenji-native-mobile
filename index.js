/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/**
 * @format
 */

import {AppRegistry, Alert, PermissionsAndroid} from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import {name as appName} from './app.json';
import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import DetailRecipe from './src/screen/DetailRecipe';
import UserProfile from './src/screen/UserProfile';
import UserLogin from './src/screen/UserLogin';
import UserRegister from './src/screen/UserRegister';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as Icons from 'react-native-feather';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExploreScreen from './src/screen/ExploreScreen';
import BookmarkScreen from './src/screen/BookmarkScreen';
import UserProfileAccountSetting from './src/screen/UserProfileAccountSetting';
import ExploreCategoryScreen from './src/screen/ExploreCategoryScreen';

import {store, persistor} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const theme = {
  ...DefaultTheme,
  version: 2,
  colors: {
    ...DefaultTheme.colors,
    OjenjiMid: '#f0570bff',
    tmBlack: '#3F3A3A',
    gray5: '#F8F8F8',
    gray10: '#EFEFEF',
    gray15: '#DEDEDE',
    gray20: '#B6B6B6',
    gray40: '#666666',
    whiteT70: '#f5f5f5',
    whiteT80: '#FFFFFF80',
  },
  padding: {
    containerHorizontal: 12,
    viewPadding: 5,
  },
};

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={HomeScreen} />
      <Stack.Screen
        name="Detail Recipe"
        component={DetailRecipe}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={UserProfile} />

      <Stack.Screen
        name="UserLogin"
        component={UserLogin}
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.OjenjiMid,
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />

      <Stack.Screen
        name="UserRegister"
        component={UserRegister}
        options={{
          title: 'Register',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.OjenjiMid,
          },
          cardShadowEnabled: false,
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />

      <Stack.Screen
        name="AccountSetting"
        component={UserProfileAccountSetting}
        options={{
          title: 'Account Setting',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          cardShadowEnabled: false,
          headerTintColor: 'black',
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
    </Stack.Navigator>
  );
}

function ExploreNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={ExploreScreen} />
      <Stack.Screen
        name="Detail Recipe"
        component={DetailRecipe}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
      <Stack.Screen
        name="ExploreCategory"
        component={ExploreCategoryScreen}
        options={{
          headerTitle: 'Category',
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitleStyle: {fontFamily: 'Montserrat-Bold'},
        }}
      />
    </Stack.Navigator>
  );
}

function BookNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={BookmarkScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationType="shifting"
      activeColor={theme.colors.OjenjiMid}
      inactiveColor={theme.colors.gray20}
      barStyle={{
        borderTopColor: theme.colors.gray15,
        borderTopWidth: 2,
        height: 64,
        justifyContent: 'center',
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarColor: 'white',
      }}
      backBehavior="history"
      labeled={true}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({color}) => <Icons.Home color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreNav}
        options={{
          tabBarIcon: ({color}) => <Icons.Compass color={color} />,
        }}
      />
      <Tab.Screen
        name="MyOrenji"
        component={BookNav}
        options={{
          tabBarIcon: ({color}) => <Icons.BookOpen color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        options={{
          tabBarIcon: ({color}) => <Icons.User color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const authAndroid = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
    authAndroid === 'granted' ||
    authAndroid === 'never_ask_again';

  if (enabled) {
    console.log('Authorization IOS:', authStatus);
    console.log('Authorization Android:', authAndroid);

    const token = await messaging().getToken();
    console.log({'Device Token': token});

    const getDeviceId = await AsyncStorage.getItem('device_id');

    if (!getDeviceId) {
      await AsyncStorage.setItem('device_id', token);
    }
  }
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default function Main() {
  React.useEffect(() => {
    requestUserPermission();

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
      );
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <TabNavigator />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
