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
import {useTheme, DataTable, TextInput} from 'react-native-paper';
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
  Button,
} from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function DetailRecipe({navigation, route}) {
  const [comments, setComments] = React.useState(undefined);
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
              paddingHorizontal: 24,
              paddingVertical: 20,
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              backgroundColor: 'white',
              marginTop: 300,
            }}>
            <View>
              <Text style={styles.Title}>{title}</Text>
              <Text style={styles.Creator}>
                {`Created by ${first_name} ${last_name}`}
              </Text>
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
                style={{paddingVertical: 15, fontFamily: 'Montserrat-Regular'}}
                multiline={true}
                numberOfLines={4}
                mode="outlined"
                outlineColor={theme.colors.gray20}
              />

              <Button title="send" color={theme.colors.tmRed} />
            </View>

            <View style={{margin: 10}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: 'black',
                }}>
                Comments
              </Text>

              {comments === undefined ? <Text>No Comment Found</Text> : null}
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomNavbar navigation={navigation} screenName="Explore" />
    </SafeAreaView>
  );
}
