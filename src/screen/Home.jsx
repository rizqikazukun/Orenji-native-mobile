/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
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

import { Searchbar, useTheme } from 'react-native-paper';
import BagdeCategory from '../components/BagdeCategory';
import HeatCard from '../components/cards/HeatCard';
import PopularCard from '../components/cards/PopularCard';

export default function Home() {
  const [search, setSearch] = React.useState('');
  const theme = useTheme();
  const { height, width, scale, fontScale } = useWindowDimensions();

  React.useEffect(() => { }, []);

  const styles = StyleSheet.create({
    searchbar: {
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 20,
      marginTop: 150,
    },
    h2_black: {
      color: theme.colors.tmRed,
      fontWeight: '800',
      fontSize: 20,
    },
    sub_h2: {
      color: theme.colors.gray40,
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>

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
              }}>

              <Image
                style={{ width: 160, objectFit: 'contain' }}
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
            style={{ backgroundColor: '#fff' }}
          />
        </View>

        {/* Popular Section */}
        <View style={{ paddingHorizontal: theme.padding.containerHorizontal }}>
          <View style={{ padding: 5 }}>
            <Text style={styles.h2_black}>Popular Recipes</Text>
            <Text style={styles.sub_h2}>Populer check</Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ display: 'flex', flexDirection: 'row' }}>
            {
              [{
                image: require('../assets/images/f-pizza.jpg'),
                title: 'Tomato Pizza',
              }, {
                image: require('../assets/images/f-burger.jpeg'),
                title: 'Beef Burger',
              }, {
                image: require('../assets/images/f-spageti.jpg'),
                title: 'Spageti',
              }, {
                image: require('../assets/images/dummy.jpeg'),
                title: 'Telur Asin Bali',
              }].map((recipe, index) => (
                <View key={index}>
                  <PopularCard
                    title={recipe.title}
                    imageSource={recipe.image}
                  />
                </View>
              ))
            }
          </ScrollView>
        </View>

        {/* Category Section */}
        <View style={{ paddingHorizontal: theme.padding.containerHorizontal }}>
          <View style={{ padding: 5 }}>
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
            {
              [{
                icon: require('../assets/images/c-spicy.png'),
                title: 'Spicy',
              }, {
                icon: require('../assets/images/c-curry.png'),
                title: 'Curry',
              }, {
                icon: require('../assets/images/c-vegie.png'),
                title: 'Vegie',
              }, {
                icon: require('../assets/images/c-salty.png'),
                title: 'Salty',
              }].map((category, index) => (
                <BagdeCategory
                  key={index}
                  imageSource={category.icon}
                  title={category.title}
                />
              ))
            }
          </View>
        </View>

        {/* Heat's Section */}
        <View style={{ paddingHorizontal: theme.padding.containerHorizontal }}>
          <View style={{ padding: 5 }}>
            <Text style={styles.h2_black}>Heat's 🔥</Text>
            <Text style={styles.sub_h2}>Checkout this week heat's</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {[{
                image: require('../assets/images/f-pizza.jpg'),
                title: 'Tomato Pizza',
                category: 'salted',
                rating: 4.7,
              }, {
                image: require('../assets/images/f-burger.jpeg'),
                title: 'Beef Burger',
                category: 'salted',
                rating: 4.7,
              }, {
                image: require('../assets/images/f-spageti.jpg'),
                title: 'Spageti',
                category: 'salted',
                rating: 4.7,
              }, {
                image: require('../assets/images/dummy.jpeg'),
                title: 'Telur Asin Bali',
                category: 'salted',
                rating: 4.7,
              }].map((card, index) => {
              return (
                <HeatCard
                  key={index}
                  image={card.image}
                  title={card.title}
                  category={card.category}
                  rating={card.rating}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
