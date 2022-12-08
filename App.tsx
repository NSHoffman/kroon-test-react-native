import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Main } from './src/screens';
import { ModalsProvider } from './src/providers';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ModalsProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </ModalsProvider>
  );
}
