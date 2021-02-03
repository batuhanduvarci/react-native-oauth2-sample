import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListScreen from './ProductListScreen';
import AddProductScreen from './AddProductScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const ProductMainScreen = ({navigation}) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      }),
    [navigation],
  );
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          options={{
            tabBarLabel: 'Products',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{
            tabBarLabel: 'Add Product',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="plus-box-multiple"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ProductMainScreen;
