import AsyncStorage from '@react-native-async-storage/async-storage';

const checkAuth = async ({setUser, setToken}) => {
  try {
    const getUser = await AsyncStorage.getItem('user');
    const getToken = await AsyncStorage.getItem('token');
    if (getUser && getToken) {
      setUser(JSON.parse(getUser));
      setToken(getToken);
    }
  } catch (error) {
    //
  }
};

export default checkAuth;
