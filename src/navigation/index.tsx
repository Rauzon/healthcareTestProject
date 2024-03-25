import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStack from './main.tsx';

const RootStack = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default RootStack;
