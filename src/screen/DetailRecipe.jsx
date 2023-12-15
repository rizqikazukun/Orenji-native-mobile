/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  useTheme,
  DataTable,
  TextInput,
  Snackbar,
  Portal,
  Modal,
} from 'react-native-paper';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ImageBackground,
  Button,
  ActivityIndicator,
  Linking,
} from 'react-native';
import axios from 'axios';
import {backendUrl} from '../config';
import UserComment from '../components/UserComment';
import * as Icons from 'react-native-feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailRecipe({navigation, route}) {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const theme = useTheme();
  const {recipes_uid} = route.params;

  const [title, setTitle] = React.useState(undefined);
  const [image, setImage] = React.useState(undefined);
  const [fname, setFname] = React.useState(undefined);
  const [lname, setLname] = React.useState(undefined);

  const [user, setUser] = React.useState(undefined);
  const [token, setToken] = React.useState(undefined);

  const [ingredients, setIngredient] = React.useState(undefined);
  const [youtube, setYoutube] = React.useState(undefined);

  const [comments, setComments] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const [newComment, setNewComment] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const initialize = async url => {
    try {
      setLoading(true);

      const getUser = await AsyncStorage.getItem('user');
      const getToken = await AsyncStorage.getItem('token');

      setUser(JSON.parse(getUser));
      setToken(getToken);

      const food = await axios({
        method: 'get',
        url: `${backendUrl}/recipes/${recipes_uid}`,
      });

      const comment = await axios({
        method: 'get',
        url: `${backendUrl}/recipes/${recipes_uid}/detail/comments`,
      });

      console.log(food.data.data[0]);
      setImage(food?.data?.data[0]?.image);
      setTitle(food?.data?.data[0]?.title);
      setFname(food?.data?.data[0]?.first_name);
      setLname(food?.data?.data[0]?.last_name);
      setIngredient(food?.data?.data[0]?.ingredients);
      setYoutube(food?.data?.data[0]?.video_url);

      setComments(comment.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const commentHandler = async (req, res) => {
    try {
      setIsLoading(true);
      await axios({
        method: 'post',
        url: `${backendUrl}/comments`,
        data: {
          recipeUid: recipes_uid,
          message: newComment,
        },
        headers: {
          Authorization: token || '',
        },
      });

      setNewComment('');
      initialize();
    } catch (error) {
      console.log(error.response.status);
      if (
        error.message.includes('user_uid') ||
        error.message.includes('token')
      ) {
        setSnackMessage('Please Login First');
        setVisible(true);
        return;
      }
      if (error?.response?.status === 401) {
        setSnackMessage('Please Login First');
        setVisible(true);
        return;
      }

      if (error?.response?.status === 422) {
        setSnackMessage("Comment cant't be empty");
        setVisible(true);
        return;
      }

      if (error?.response?.status === 500) {
        setSnackMessage('Internal Application Error');
        setVisible(true);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    initialize();
  }, []);

  const styles = StyleSheet.create({
    headerImage: {
      height: 340,
      width: width,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 60,
      justifyContent: 'space-between',
    },
    headerBack: {
      fontSize: 14,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    Title: {
      fontFamily: 'Montserrat-Black',
      fontSize: 24,
      color: 'black',
    },
    Creator: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      color: 'black',
    },
  });

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        wrapperStyle={{top: 0}}
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          zIndex: 999,
        }}
        action={{
          label: 'Close',
          labelStyle: {color: 'black'},
          onPress: () => {
            setSnackMessage('');
          },
        }}>
        <Text style={{color: theme.colors.OjenjiMid}}>{snackMessage}</Text>
      </Snackbar>

      <Portal>
        <Modal
          visible={isLoading}
          onDismiss={() => {
            //
          }}
          contentContainerStyle={{backgroundColor: 'transparent', padding: 20}}>
          <View style={{justifyContent: 'center', gap: 10}}>
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

      <StatusBar backgroundColor={theme.colors.OjenjiMid} />
      {loading ? (
        <View
          style={{
            flexGrow: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{justifyContent: 'center', gap: 10}}>
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
        </View>
      ) : (
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              zIndex: 999,
            }}>
            <ImageBackground
              src={image === undefined ? 'https://placehold.co/400' : image}
              style={styles.headerImage}>
              <View>
                <Text style={styles.headerBack}> </Text>
              </View>
            </ImageBackground>
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 20,
                borderTopRightRadius: 24,
                borderTopLeftRadius: 24,
                backgroundColor: 'white',
                marginTop: -24,
              }}>
              {/* Youtube Link */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.Title}>{title}</Text>
                  <Text style={styles.Creator}>
                    {`Created by ${fname} ${lname}`}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(youtube)}>
                  <View>
                    <Icons.Youtube height={40} width={40} color="black" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{margin: 10}}>
                <Text
                  style={{
                    fontFamily: 'Lato-BlackItalic',
                    fontSize: 20,
                    color: 'black',
                    marginVertical: 4,
                  }}>
                  Ingredients :
                </Text>
                <DataTable>
                  {ingredients?.ingridient?.map((ingred, index) => {
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>
                          <Text
                            style={{
                              fontFamily: 'Lato-Regular',
                              color: 'black',
                            }}>
                            {ingred}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
              </View>

              <View style={{margin: 10}}>
                <Text
                  style={{
                    fontFamily: 'Lato-BlackItalic',
                    fontSize: 20,
                    color: 'black',
                    marginVertical: 4,
                  }}>
                  The Steps :
                </Text>
                <DataTable>
                  {ingredients?.steps?.map((ingred, index) => {
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell style={{flex: 0}}>
                          {index + 1 + '     '}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <View style={{padding: 2}}>
                            <Text
                              style={{
                                fontFamily: 'Lato-Regular',
                                color: 'black',
                                lineHeight: 22,
                              }}>
                              {ingred}
                            </Text>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
              </View>

              <View style={{margin: 10, flexDirection: 'column', gap: 10}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                  }}>
                  Post Comment
                </Text>

                <TextInput
                  style={{
                    paddingVertical: 15,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  multiline={true}
                  numberOfLines={4}
                  mode="outlined"
                  outlineColor={theme.colors.gray20}
                  onChangeText={input => setNewComment(input)}
                />

                <Button
                  title="send"
                  color={theme.colors.OjenjiMid}
                  onPress={commentHandler}
                />
              </View>

              <View style={{margin: 10}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                  }}>
                  Comments
                </Text>

                {comments === undefined ? (
                  <Text>No Comment Found</Text>
                ) : comments.length === 0 ? (
                  <Text>No Comment Found</Text>
                ) : (
                  comments?.map((comment, index) => {
                    return (
                      <View key={index}>
                        <UserComment comment={comment} />
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
