import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Auth0 from 'react-native-auth0';
import CustomButton from '../../components/button/CustomButton';

const auth0 = new Auth0({
  domain: 'dev-ja8-m7r2.eu.auth0.com',
  clientId: 'aitQBPHQpdib4ggYKHDO7HJRrFLgs1ZA',
});

const LoginScreen = ({route, navigation}) => {
  const {setData} = route.params;
  const [isLoggedIn, setIsLoggedIn] = useState({});

  const showWebLoginWindow = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then((credentials) =>
        // Successfully authenticated
        // Store the accessToken
        setIsLoggedIn({
          accessToken: credentials.accessToken,
          sessionId: credentials.idToken,
        }),
      )
      .then(() => {
        navigation.navigate('ProductMainScreen');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setData(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.scrollViewContainerStyle}>
          <View style={styles.loginContainerStyle}>
            <CustomButton
              buttonText="Login via Web"
              buttonAction={showWebLoginWindow}
            />
            <CustomButton
              buttonText="Login"
              buttonAction={() => {
                navigation.navigate('NativeLoginScreen');
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: 'white'},
  scrollViewContainerStyle: {
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

export default LoginScreen;
