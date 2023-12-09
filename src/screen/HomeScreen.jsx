/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
} from 'react-native';

import BagdeCategory from '../components/BagdeCategory';
import HeatCard from '../components/cards/HeatCard';
import PopularCard from '../components/cards/PopularCard';
import axios from 'axios';
import {backendUrl} from '../config';
import BottomNavbar from '../components/BottomNavbar';

export default function HomeScreen({navigation}) {
  const [search, setSearch] = React.useState('');
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();

  const [popularRecipes, setPopularRecipes] = React.useState(undefined);
  const [newRecipes, setNewRecipes] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const initScreen = async () => {
    try {
      setLoading(true);
      const list = await axios.get(`${backendUrl}/home/list`);
      setPopularRecipes(list.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (popularRecipes === undefined) {
      initScreen();
    }
  }, [popularRecipes]);

  const styles = StyleSheet.create({
    loadingScreen: {
      height,
      width,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    searchbar: {
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 20,
      marginTop: 150,
    },
    h2_black: {
      color: theme.colors.OjenjiMid,
      fontFamily: 'Montserrat-Black',
      fontSize: 20,
    },
    sub_h2: {
      color: theme.colors.gray40,
      fontFamily: 'Lato-Italic',
    },
  });

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <StatusBar backgroundColor={theme.colors.OjenjiMid} />
      {loading === true ? (
        <View style={styles.loadingScreen}>
          <Image
            source={require('../assets/images/logo-w-slogan.png')}
            style={{width: 200, objectFit: 'contain'}}
          />
          <ActivityIndicator size="large" color={`${theme.colors.OjenjiMid}`} />
        </View>
      ) : (
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 64}}>
            <View
              style={{
                height: 220,
                width: width,
                position: 'absolute',
              }}>
              <ImageBackground
                style={{
                  height: '100%',
                }}
                imageStyle={{
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
                source={require('../assets/images/header.png')}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingVertical: theme.padding.containerHorizontal,
                    paddingHorizontal: 28,
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    style={{width: 160, objectFit: 'contain'}}
                    source={require('../assets/images/logo-w-slogan.png')}
                  />
                </View>
              </ImageBackground>
            </View>

            <View style={styles.searchbar}>
              <Searchbar
                iconColor={theme.colors.gray20}
                placeholderTextColor={theme.colors.gray20}
                placeholder="Search Pasta, Bread, etc"
                onChangeText={query => setSearch(query)}
                allowFontScaling={true}
                inputStyle={{fontFamily: 'Lato-Regular', fontSize: 14}}
                style={{backgroundColor: '#fff', borderRadius: 30}}
              />
            </View>

            {/* Popular Section */}
            <View
              style={{
                paddingHorizontal: theme.padding.containerHorizontal,
                marginTop: 12,
              }}>
              <View style={{padding: 5}}>
                <Text style={styles.h2_black}>Popular</Text>
                <Text style={styles.sub_h2}>Popular check</Text>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{display: 'flex', flexDirection: 'row'}}>
                {popularRecipes?.map((recipe, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.navigate('DetailRecipe', recipe)}>
                    <View>
                      <PopularCard title={recipe.title} source={recipe.image} />
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            </View>

            {/* Category Section */}
            <View
              style={{paddingHorizontal: theme.padding.containerHorizontal}}>
              <View style={{padding: 5}}>
                <Text style={styles.h2_black}>Category</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: 20,
                  marginTop: 15,
                }}>
                {[
                  {
                    icon: require('../assets/images/c-spicy.png'),
                    title: 'Spicy',
                  },
                  {
                    icon: require('../assets/images/c-curry.png'),
                    title: 'Curry',
                  },
                  {
                    icon: require('../assets/images/c-vegie.png'),
                    title: 'Vegie',
                  },
                  {
                    icon: require('../assets/images/c-salty.png'),
                    title: 'Salty',
                  },
                ].map((category, index) => (
                  <BagdeCategory
                    key={index}
                    imageSource={category.icon}
                    title={category.title}
                  />
                ))}
              </View>
            </View>

            {/* Heat's Section */}
            <View
              style={{paddingHorizontal: theme.padding.containerHorizontal}}>
              <View style={{padding: 5}}>
                <Text style={styles.h2_black}>Heat's 🔥</Text>
                <Text style={styles.sub_h2}>Checkout this week heat's</Text>
              </View>

              {popularRecipes?.map((recipe, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.navigate('DetailRecipe', recipe)}>
                    <View>
                      <HeatCard
                        source={recipe.image}
                        title={recipe.title}
                        category={recipe.category?.join(', ')}
                        rating={recipe.rating}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
      {loading ? null : (
        <BottomNavbar navigation={navigation} screenName="Home" />
      )}
    </SafeAreaView>
  );
}
