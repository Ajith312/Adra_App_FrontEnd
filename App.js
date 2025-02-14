import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './Src/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './Store';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    </Provider>
  );
}
