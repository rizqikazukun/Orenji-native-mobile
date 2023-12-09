/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {useTheme} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableNativeFeedback,
} from 'react-native';
import * as Icons from 'react-native-feather';

const styles = StyleSheet.create({
  body: {
    height: 64,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',

    borderColor: '#eaeaea',
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  container: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default function BottomNavbar({navigation, screenName}) {
  const theme = useTheme();

  return (
    <>
      <View style={styles.body}>
        <View style={styles.container}>
          {[
            {
              title: 'Home',
              link: 'HomeScreen',
              icon: (
                <Icons.Home
                  color={
                    screenName === 'Home'
                      ? theme.colors.OjenjiMid
                      : theme.colors.gray40
                  }
                />
              ),
            },
            {
              title: 'Explore',
              link: 'HomeScreen',
              icon: (
                <Icons.Compass
                  color={
                    screenName === 'Explore'
                      ? theme.colors.OjenjiMid
                      : theme.colors.gray40
                  }
                />
              ),
            },
            {
              title: 'Recipe',
              link: 'HomeScreen',
              icon: (
                <Icons.Book
                  color={
                    screenName === 'Recipe'
                      ? theme.colors.OjenjiMid
                      : theme.colors.gray40
                  }
                />
              ),
            },
            {
              title: 'Profile',
              link: 'UserProfile',
              icon: (
                <Icons.User
                  color={
                    screenName === 'Profile'
                      ? theme.colors.OjenjiMid
                      : theme.colors.gray40
                  }
                />
              ),
            },
          ].map((item, index) => {
            return (
              <TouchableNativeFeedback
                key={index}
                onPress={() => navigation.navigate(item.link)}
                background={TouchableNativeFeedback.Ripple(
                  theme.colors.gray40,
                  true,
                  50,
                )}>
                <View
                  style={{
                    height: 48,
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{item.icon}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </View>
    </>
  );
}
