/* eslint-disable no-alert */
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
import {Searchbar, useTheme, Portal, Snackbar} from 'react-native-paper';
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

import axios from 'axios';
import {backendUrl} from '../config';
import * as Icons from 'react-native-feather';
import SelectDropdown from 'react-native-select-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BagdeCategory from '../components/BagdeCategory';
import {useSelector, useDispatch} from 'react-redux';
import * as book from '../redux/slices/my-orenji';
import SearchItemHorizontalCard from '../components/cards/SearchItemHorizontalCard';

export default function ExploreScreen({navigation}) {
  const [search, setSearch] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);
  const [setting, setSetting] = React.useState(false);
  const theme = useTheme();
  const {height, width, scale, fontScale} = useWindowDimensions();
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [amount, setAmount] = React.useState(6);
  const [sortBy, setSortBy] = React.useState('title');
  const [sort, setSort] = React.useState('asc');
  const [pageLength, setPageLength] = React.useState(1);
  const [category, setCategory] = React.useState('None');

  const dropdownAmount = ['6', '10'];
  const dropdownSortBy = ['title', 'date'];
  const dropdownSort = ['asc', 'desc'];
  const dropdownCategory = ['None', 'Dishes', 'Drink', 'Dessert', 'Snack'];

  const [snackMessage, setSnackMessage] = React.useState('');
  const [snackVisible, setSnackVisible] = React.useState(false);

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
      marginBottom: 4,

      backgroundColor: 'white',
      paddingBottom: 20,
      borderBottomLeftRadius: 14,
      borderBottomRightRadius: 14,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
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
    optionBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    optionButton: {
      backgroundColor: theme.colors.gray10,
      borderRadius: 50,
      width: 200,
    },
  });

  const handleSaveRecipe = async recipes_uid => {
    try {
      await axios({
        method: 'post',
        url: `${backendUrl}/recipes/bookmark`,
        data: {
          recipes_uid,
        },
        headers: {
          Authorization: token,
        },
      });

      const savedRecipe = await axios({
        method: 'get',
        url: `${backendUrl}/recipes/getmybookmark`,
        headers: {
          Authorization: token,
        },
      });

      dispatch(book.addSavedByApi(savedRecipe.data.data));
      alert('Recipe Saved');
    } catch (error) {
      if (error) {
        console.log(error.response.data);
        alert('To save recipe please login first');
      }
    }
  };

  const handleSearch = async () => {
    try {
      let url = `${backendUrl}/recipes/search?title=${search}`;
      url += `&page=1&amount=${amount}&sortBy=${sortBy}&sort=${sort}`;
      category === 'None' ? '' : (url += `&category=${category}`);

      const makeSearch = await axios({
        method: 'get',
        url,
      });

      setSearchResult(makeSearch.data.data.search);
      setPage(makeSearch.data.pagination.page);
      setPageLength(makeSearch.data.pagination['page-length']);
    } catch (error) {
      setSearchResult([]);
      setSnackMessage(error.response.data.message);
      setSnackVisible(true);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      let url = `${backendUrl}/recipes/search?title=${search}`;
      url += `&page=${page + 1}&amount=${amount}&sortBy=${sortBy}&sort=${sort}`;
      category === 'None' ? '' : (url += `&category=${category}`);

      const makeSearch = await axios({
        method: 'get',
        url,
      });

      setSearchResult([...searchResult, ...makeSearch.data.data.search]);
      setPage(makeSearch.data.pagination.page);
      setPageLength(makeSearch.data.pagination['page-length']);
    } catch (error) {
      setSearchResult([]);
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
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
      <StatusBar backgroundColor={theme.colors.OjenjiMid} />

      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchbar}>
            <Image
              style={{width: 140, height: 100, objectFit: 'scale-down'}}
              source={require('../assets/images/logo-w-slogan.png')}
            />

            <View style={{flexDirection: 'row'}}>
              <Searchbar
                autoFocus={true}
                showSoftInputOnFocus={true}
                iconColor={theme.colors.gray20}
                placeholderTextColor={theme.colors.gray20}
                placeholder="Search Pasta, Bread, etc"
                onChangeText={query => setSearch(query)}
                allowFontScaling={true}
                inputStyle={{fontFamily: 'Lato-Regular', fontSize: 14}}
                style={{backgroundColor: '#fff', borderRadius: 14, flexGrow: 1}}
                defaultValue={search}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity
                onPress={() => {
                  if (!setting) {
                    setSetting(true);
                  } else if (setting) {
                    setSetting(false);
                  }
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 20,
                  }}>
                  {!setting ? (
                    <Icons.Sliders
                      color={theme.colors.gray20}
                      style={{height: 30, width: 30}}
                    />
                  ) : (
                    <Icons.ChevronUp
                      color={theme.colors.gray20}
                      style={{height: 30, width: 30}}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {!setting ? null : (
              <View style={{marginVertical: 10, padding: 10, gap: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Options
                </Text>

                <View style={styles.optionBody}>
                  <Text>Max Row</Text>
                  <SelectDropdown
                    rowTextStyle={{fontFamily: 'Lato-Regular'}}
                    selectedRowTextStyle={{fontFamily: 'Lato-Regular'}}
                    buttonStyle={styles.optionButton}
                    data={dropdownAmount}
                    defaultValue={amount}
                    onSelect={(selectedItem, index) => {
                      setAmount(selectedItem);
                    }}
                  />
                </View>

                <View style={styles.optionBody}>
                  <Text>Sort By</Text>
                  <SelectDropdown
                    buttonStyle={styles.optionButton}
                    data={dropdownSortBy}
                    defaultValue={sortBy}
                    onSelect={(selectedItem, index) => {
                      setSortBy(selectedItem);
                    }}
                  />
                </View>

                <View style={styles.optionBody}>
                  <Text>Sort Direction</Text>
                  <SelectDropdown
                    buttonStyle={styles.optionButton}
                    data={dropdownSort}
                    defaultValue={sort}
                    onSelect={(selectedItem, index) => {
                      setSort(selectedItem);
                    }}
                  />
                </View>

                <View style={styles.optionBody}>
                  <Text>Category</Text>
                  <SelectDropdown
                    buttonStyle={styles.optionButton}
                    data={dropdownCategory}
                    defaultValue={category}
                    onSelect={(selectedItem, index) => {
                      setCategory(selectedItem);
                    }}
                  />
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              marginVertical: 10,
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
              ].map((foodCategory, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('ExploreCategory', {
                      foodCategory,
                    })
                  }>
                  <BagdeCategory
                    imageSource={foodCategory.icon}
                    title={foodCategory.title}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignContent: 'center',
            }}>
            {searchResult?.map((recipe, index) => {
              return (
                <SearchItemHorizontalCard
                  key={index}
                  title={recipe.title}
                  image={recipe.image}
                  description={recipe.sort_desc}
                  buttonLink={() => {
                    navigation.navigate('Detail Recipe', recipe);
                  }}
                  buttonLike={() => {
                    handleSaveRecipe(recipe.recipes_uid);
                  }}
                />
              );
            })}

            {!(page !== pageLength && searchResult.length !== 0) ? null : (
              <TouchableOpacity onPress={handleLoadMore}>
                <View
                  style={{
                    padding: 10,
                    margin: 20,
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Icons.PlusCircle
                    color={theme.colors.gray40}
                    height={40}
                    width={40}
                  />
                  <Text style={{fontFamily: 'Lato-Bold'}}>Load More</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
