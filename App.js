import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/login/LoginScreen';
import NativeLoginScreen from './screens/login/NativeLoginScreen';
import ProductMainScreen from './screens/product/ProductMainScreen';

const Stack = createStackNavigator();
export const UserDataContext = React.createContext({});

const App = () => {
  const [userData, setUserData] = useState({});

  const setData = (data) => {
    setUserData(data);
  };

  return (
    <UserDataContext.Provider value={userData}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
            initialParams={{setData: setData}}
          />
          <Stack.Screen
            name="NativeLoginScreen"
            component={NativeLoginScreen}
            options={{title: 'Login'}}
            initialParams={{setData: setData}}
          />
          <Stack.Screen
            name="ProductMainScreen"
            component={ProductMainScreen}
            options={{headerShown: false, headerLeft: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserDataContext.Provider>
  );
};

export default App;
