/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar, useTheme} from 'react-native-paper';
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
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button,
} from 'react-native';

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

export default function BottomNavbar({navigation}) {
  const theme = useTheme();
  const [rippleOverflow, setRippleOverflow] = React.useState();
  const {height, width, scale, fontScale} = useWindowDimensions();

  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 64,
          height: 40,
          width: width,
          backgroundColor: theme.colors.tmRed,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'row',
          zIndex: 9999,
        }}>
        <Text style={{color: 'white', fontWeight: 600}}>
          Sudah punya akun Tomato?
        </Text>
        <View style={{padding: 2, backgroundColor: 'white'}}>
          <Text style={{color: theme.colors.tmRed, fontWeight: 600}}>
            Masuk
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.container}>
          {[
            {title: 'Home', icon: '', link: 'Home'},
            {title: 'Explore', icon: '', link: 'Home'},
            {title: 'Recipe', icon: '', link: 'Home'},
            {title: 'Profile', icon: '', link: 'Home'},
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
                  <Text>{item.title}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </View>
    </>
  );
}
