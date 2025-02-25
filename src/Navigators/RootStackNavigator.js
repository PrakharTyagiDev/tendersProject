import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import AdminScreen from '../Screens/AdminScreen';
import UserScreen from '../Screens/UserScreen';
import BidsManagement from '../Screens/BidsManagements';



const Stack = createStackNavigator();
const RootStackNavigator = ({navigation}) => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{
            title: 'Auctions',
          }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{
            title: 'Auctions',
          }}
        />
        <Stack.Screen
          name="BidsManagement"
          component={BidsManagement}
          options={{
            title: 'Bids',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
