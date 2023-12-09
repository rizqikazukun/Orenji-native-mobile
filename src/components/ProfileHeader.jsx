/* eslint-disable no-unused-vars */
import React from 'react';
import * as Icons from 'react-native-feather';
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
import {useTheme} from 'react-native-paper';

export default function ProfileHeader({text1, text2}) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    headerBody: {
      height: 300,
      backgroundColor: theme.colors.OjenjiMid,
      flexDirection: 'column',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerProfile: {
      height: 120,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 8,
      borderRadius: 60,
    },
    headerText: {
      fontFamily: 'Montserrat-Bold',
      color: 'white',
      textAlign: 'center',
    },
    headerTextSingle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 24,
      color: 'white',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.headerBody}>
      <View style={styles.headerProfile}>
        <Icons.User color={theme.colors.OjenjiMid} height={80} width={80} />
      </View>
      <HeaderMessage styles={styles} text1={text1} text2={text2} />
    </View>
  );
}

const HeaderMessage = ({text1, text2, styles}) => {
  if (text1 && text2) {
    return (
      <View>
        <Text style={styles.headerText}>{text1}</Text>
        <Text style={styles.headerText}>{text2}</Text>
      </View>
    );
  } else if (text1) {
    return (
      <View>
        <Text style={styles.headerTextSingle}>{text1}</Text>
      </View>
    );
  } else if (text2) {
    return (
      <View>
        <Text style={styles.headerTextSingle}>{text2}</Text>
      </View>
    );
  } else {
    return null;
  }
};
