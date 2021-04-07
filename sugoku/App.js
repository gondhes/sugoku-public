import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';Provider

import { Provider } from 'react-redux'
import store from './store'

import Home from './screens/Home'
import Game from './screens/Game'
import Finish from './screens/Finish'
import Lose from './screens/Lose'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ Home }/>
          <Stack.Screen name="Game" component={ Game }/>
          <Stack.Screen name="Finish" component={ Finish }/>
          <Stack.Screen name="Lose" component={ Lose }/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e3c6',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
