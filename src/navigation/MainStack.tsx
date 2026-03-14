import React from 'react';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Tabs: undefined;
  EventDetails: { eventId: string };
  Settings: undefined;
};
const Stack = createNativeStackNavigator<MainStackParamList>();


const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStack;