import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IntakeListScreen, AddIntakeScreen, NoteListScreen} from '../screens';

export enum MainRoutes {
  IntakeList = 'IntakeList',
  AddIntake = 'AddIntake',
  NoteList = 'NoteList',
}

export type MainStackParamList = {
  [MainRoutes.IntakeList]: undefined;
  [MainRoutes.AddIntake]: {id?: string};
  [MainRoutes.NoteList]: {id?: string};
};

const MainNav = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <MainNav.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}
      initialRouteName={MainRoutes.IntakeList}>
      <MainNav.Screen
        name={MainRoutes.IntakeList}
        component={IntakeListScreen}
      />
      <MainNav.Screen
        name={MainRoutes.AddIntake}
        component={AddIntakeScreen}
        options={{headerShown: true}}
      />
      <MainNav.Screen
        name={MainRoutes.NoteList}
        component={NoteListScreen}
        options={{headerShown: true, headerTitle: 'Notes'}}
      />
    </MainNav.Navigator>
  );
};

export default MainStack;
