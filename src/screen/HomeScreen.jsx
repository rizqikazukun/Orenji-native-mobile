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
import {Searchbar, useTheme, Portal, Modal} from 'react-native-paper';
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
  TouchableNativeFeedback,
} from 'react-native';

import BagdeCategory from '../components/BagdeCategory';
import HeatCard from '../components/cards/HeatCard';
import PopularCard from '../components/cards/PopularCard';
import axios from 'axios';
import {backendUrl} from '../config';

export default function HomeScreen({navigation}) {
  const [search, setSearch] = React.useState('');
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();

  const [popularRecipes, setPopularRecipes] = React.useState(undefined);
  const [newRecipes, setNewRecipes] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const initialize = async () => {
    try {
      setLoading(true);
      const list = await axios.get(`${backendUrl}/home/list`);
      setPopularRecipes(list.data.data);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (popularRecipes === undefined) {
      initialize();
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
    <SafeAreaView style={{backgroundColor: 'white', flexGrow: 1}}>
      <StatusBar backgroundColor={theme.colors.OjenjiMid} />

      <Portal>
        <Modal
          visible={loading}
          onDismiss={() => {
            //
          }}
          contentContainerStyle={{
            width,
            height,
            backgroundColor: 'white',
            flexGrow: 1,
          }}>
          <View
            style={{justifyContent: 'center', gap: 10, alignItems: 'center'}}>
            <Image
              style={{width: 160, height: 100, objectFit: 'scale-down'}}
              source={require('../assets/images/logo-w-slogan.png')}
            />
            <ActivityIndicator size="large" color={theme.colors.OjenjiMid} />
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

      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={{
              height: 240,
              flexDirection: 'column',
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}
            imageStyle={{
              borderBottomRightRadius: 14,
              borderBottomLeftRadius: 14,
              objectFit: 'scale-down',
            }}
            source={require('../assets/images/header.png')}>
            <Image
              style={{width: 160, height: 100, objectFit: 'scale-down'}}
              source={require('../assets/images/logo-w-slogan.png')}
            />

            <View style={styles.searchbar}>
              <Searchbar
                // onSubmitEditing={navigation.navigate('Explore')}
                iconColor={theme.colors.gray20}
                placeholderTextColor={theme.colors.gray20}
                placeholder="Search Pasta, Bread, etc"
                onChangeText={query => setSearch(query)}
                allowFontScaling={true}
                inputStyle={{fontFamily: 'Lato-Regular', fontSize: 14}}
                style={{backgroundColor: '#fff', borderRadius: 14}}
                onSubmitEditing={() => navigation.navigate('Explore', {search})}
              />
            </View>
          </ImageBackground>

          {/* Popular Section */}
          <View
            style={{
              // paddingHorizontal: theme.padding.containerHorizontal,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 12,
              backgroundColor: 'white',
              borderRadius: 14,
              marginHorizontal: 10,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
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
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'Detail Recipe',
                      params: recipe,
                      initial: false,
                    })
                  }>
                  <View>
                    <PopularCard title={recipe.title} source={recipe.image} />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>

          {/* Category Section */}
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: theme.padding.containerHorizontal,
              borderRadius: 14,

              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
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
                  title: 'Dishes',
                },
                {
                  icon: require('../assets/images/c-curry.png'),
                  title: 'Drink',
                },
                {
                  icon: require('../assets/images/c-vegie.png'),
                  title: 'Dessert',
                },
                {
                  icon: require('../assets/images/c-salty.png'),
                  title: 'Snack',
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
            style={{
              paddingHorizontal: theme.padding.containerHorizontal,
              borderRadius: 14,
              // marginHorizontal: 10,

              // backgroundColor: 'white',
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },
              // shadowOpacity: 0.22,
              // shadowRadius: 2.22,

              // elevation: 3,
            }}>
            <View style={{padding: 5}}>
              <Text style={styles.h2_black}>Heat's 🔥</Text>
              <Text style={styles.sub_h2}>Checkout this week heat's</Text>
            </View>

            {popularRecipes?.map((recipe, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'Detail Recipe',
                      params: recipe,
                      initial: false,
                    })
                  }>
                  <View>
                    <HeatCard
                      source={recipe.image}
                      title={recipe.title}
                      category={recipe.category}
                      rating={recipe.rating}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
