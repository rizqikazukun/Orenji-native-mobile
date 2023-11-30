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
} from 'react-native';
import BottomNavbar from '../components/BottomNavbar';

export default function DetailRecipe({navigation, route}) {
  const [search, setSearch] = React.useState('');
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();
  const {image, title, first_name, last_name, ingredients} = route.params;

  console.log(route.params);

  React.useEffect(() => {}, []);

  const inset = useSafeAreaInsets();
  const styles = StyleSheet.create({
    headerImage: {
      height: 340,
      width: width,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 60,
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
    },
    headerBack: {
      fontSize: 14,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    Title: {
      fontSize: 32,
      // fontWeight: 900,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    Creator: {
      fontSize: 14,
      // fontWeight: 400,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 2,
    },
  });

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={{height: height - 30}}>
      <StatusBar backgroundColor="#c40900ff" />
      <View>
        <ImageBackground src={image} style={styles.headerImage}>
          <View>
            <Text style={styles.headerBack}>Back</Text>
          </View>
        </ImageBackground>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 64,
            zIndex: 999,
          }}>
          <View
            style={{
              paddingHorizontal: theme.padding.containerHorizontal,
              paddingVertical: theme.padding.containerHorizontal,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: 'white',
              marginTop: 300,
            }}>
            <View style={{marginTop: -100, marginBottom: 40}}>
              <Text style={styles.Title}>{title}</Text>
              <Text style={styles.Creator}>
                {`Created by ${first_name} ${last_name}`}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginBottom: 10,
                padding: 4,
              }}>
              <Text style={{color: 'black', fontWeight: 900, fontSize: 24}}>
                Ingredient
              </Text>
              <Text
                style={{
                  color: theme.colors.gray40,
                  fontWeight: 900,
                  fontSize: 24,
                }}>
                Videos
              </Text>
            </View>

            <View style={{padding: 4}}>
              {ingredients === undefined
                ? null
                : ingredients.ingridient.map((ingred, index) => {
                    return <Text key={index}>{ingred}</Text>;
                  })}
            </View>

            <View style={{padding: 4}}>
              {ingredients === undefined
                ? null
                : ingredients.steps.map((ingred, index) => {
                    return <Text key={index}>{ingred}</Text>;
                  })}
            </View>

          </View>
        </ScrollView>
      </View>
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
}
