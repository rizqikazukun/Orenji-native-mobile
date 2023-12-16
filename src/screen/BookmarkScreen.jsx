/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import * as Icons from 'react-native-feather';
import VerticalCard from '../components/cards/VerticalCard';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {backendUrl} from '../config';
import * as book from '../redux/slices/my-orenji';

export default function BookmarkScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.auth);
  const {created, saved} = useSelector(state => state.book);
  const login = user && token;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    header: {
      height: 300,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,

      borderBottomLeftRadius: 14,
      borderBottomRightRadius: 14,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    headerMessage: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,

      width: '70%',
      height: '60%',
      borderRadius: 14,
      backgroundColor: 'white',
      margin: 5,
      padding: 20,
      opacity: 0.9,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    headerButton: {
      backgroundColor: theme.colors.OjenjiMid,
      padding: 10,
      margin: 10,
      borderRadius: 4,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    cards: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      padding: 20,
      marginHorizontal: 5,
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
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      color: 'black',
      fontSize: 16,
    },
    recipeCard: {
      height: 150,
      width: 100,
      margin: 5,

      backgroundColor: 'white',
      borderRadius: 10,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
  });

  const initialize = async () => {
    try {
      const created = await axios({
        method: 'get',
        url: `${backendUrl}/recipes/getmyrecipe`,
        headers: {
          Authorization: token,
        },
      });

      const saved = await axios({
        method: 'get',
        url: `${backendUrl}/recipes/getmybookmark`,
        headers: {
          Authorization: token,
        },
      });

      dispatch(book.addCreatedByApi(created.data.data));
      dispatch(book.addSavedByApi(saved.data.data));
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
    }
  };

  const handlerDeleteSavedRecipe = async recipes_uid => {
    try {
      await axios({
        method: 'delete',
        url: `${backendUrl}/recipes/unbookmark`,
        data: {
          recipes_uid,
        },
        headers: {
          Authorization: token,
        },
      });

      const recipeIndex = saved.findIndex(item => {
        return item.recipes_uid === recipes_uid;
      });

      const data = [...saved];
      data.splice(recipeIndex, 1);

      dispatch(book.addSavedByApi(data));
      alert('Saved Recipe Deleted');
    } catch (error) {
      console.log(error);
      alert(error?.response?.data);
    }
  };

  React.useEffect(() => {
    if (login) {
      initialize();
    }
  }, [login]);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <ScrollView>
        <ImageBackground
          source={{
            uri: 'https://res.cloudinary.com/dwptyupfa/image/upload/v1702641772/default/invgp0l8ecywa4btqoi3.jpg',
          }}
          imageStyle={{borderBottomLeftRadius: 14, borderBottomRightRadius: 14}}
          style={styles.header}>
          <View style={styles.headerMessage}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Bold',
                fontSize: 24,
                textAlign: 'center',
              }}>
              Cook, Eat, Repeat!
            </Text>
            <Text style={{fontFamily: 'Lato-Regular'}}>
              Buat dan bagikan resep disini!
            </Text>
            <TouchableNativeFeedback
              onPress={() => {
                if (!login) {
                  navigation.navigate('Profile', {
                    screen: 'UserLogin',
                    initial: false,
                  });
                } else {
                  //
                }
              }}>
              <View style={styles.headerButton}>
                {login ? (
                  <>
                    <Text style={{color: 'white'}}>Buat Resep</Text>
                    <Icons.Edit color="white" />
                  </>
                ) : (
                  <>
                    <Text style={{color: 'white'}}>Login Dulu</Text>
                    <Icons.LogIn color="white" />
                  </>
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </ImageBackground>

        <View style={styles.cards}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.cardTitle}>Created Recipe</Text>
            <Icons.BookOpen color={'black'} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {!login ? null : created.length === 0 ? (
              <Text style={{width: 200, textAlign: 'center'}}>
                You haven't created any recipes yet
              </Text>
            ) : (
              created?.map((recipe, index) => {
                return (
                  <VerticalCard
                    key={index}
                    title={String(recipe.title).slice(0, 21)}
                    image={recipe.image}
                    onPress={() => {
                      navigation.navigate('Explore', {
                        screen: 'Detail Recipe',
                        params: recipe,
                        initial: false,
                      });
                    }}
                  />
                );
              })
            )}

            {login ? null : (
              <Text style={{width: 200, textAlign: 'center'}}>
                To save a recipe you must log in first
              </Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.cards}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.cardTitle}>Saved Recipe</Text>
            <Icons.Bookmark color={'black'} />
          </View>
          <ScrollView horizontal>
            {!login ? null : saved.length === 0 ? (
              <Text style={{width: 200, textAlign: 'center'}}>
                You haven't saved any recipes
              </Text>
            ) : (
              saved?.map((recipe, index) => {
                return (
                  <VerticalCard
                    key={index}
                    title={String(recipe.title).slice(0, 21)}
                    image={recipe.image}
                    deleteButton={() => {
                      handlerDeleteSavedRecipe(recipe.recipes_uid);
                    }}
                    onPress={() => {
                      navigation.navigate('Explore', {
                        screen: 'Detail Recipe',
                        params: recipe,
                        initial: false,
                      });
                    }}
                  />
                );
              })
            )}

            {login ? null : (
              <Text style={{width: 200, textAlign: 'center'}}>
                Saved recipe will show here, but you must login first
              </Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.cards}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.cardTitle}>Liked History</Text>
            <Icons.Clock color={'black'} />
          </View>
          <ScrollView horizontal>
            <Text style={{width: 200, textAlign: 'center'}}>
              Saved recipe will show here. The feature is coming soon
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
