import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import Auth0 from 'react-native-auth0';
import CustomButton from '../../components/button/CustomButton';
import CustomTextInput from '../../components/textInput/CustomTextInput';

const auth0 = new Auth0({
  domain: 'dev-ja8-m7r2.eu.auth0.com',
  clientId: 'aitQBPHQpdib4ggYKHDO7HJRrFLgs1ZA',
});

const NativeLoginScreen = ({route, navigation}) => {
  const {setData} = route.params;
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [userData, setUserData] = useState({username: null, password: null});
  const [isLoading, setIsLoading] = useState(false);

  const updateUserData = (value, fieldType) => {
    if (fieldType == 'Username') {
      setUserData({...userData, username: value});
    } else {
      setUserData({...userData, password: value});
    }
  };

  const login = () => {
    setIsLoading(true);
    auth0.auth
      .passwordRealm({
        username: userData.username,
        password: userData.password,
        realm: 'Username-Password-Authentication',
      })
      .then((credentials) =>
        setIsLoggedIn({
          accessToken: credentials.accessToken,
          sessionId: credentials.idToken,
        }),
      )
      .then(() => {
        navigation.navigate('ProductMainScreen');
      })
      .catch(console.error);
  };

  useEffect(() => {
    setData(isLoggedIn);
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.containerStyle}>
          <View style={styles.loginContainerStyle}>
            {isLoading ? (
              <ActivityIndicator size="large" color="deepskyblue" />
            ) : (
              <>
                <CustomTextInput
                  placeholder="Username"
                  updateUserData={updateUserData}
                />
                <CustomTextInput
                  placeholder="Password"
                  updateUserData={updateUserData}
                />
                <CustomButton buttonText="Login" buttonAction={() => login()} />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: 'white'},
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loginContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NativeLoginScreen;
