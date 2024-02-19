/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
// Import your screen components
import { TaskListScreen } from './src/screens/TaskList/TaskList';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { ModifyTaskScreen } from './src/screens/ModifyTaskScreen/ModifyTaskScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="TaskList"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="ModifyTaskScreen" component={ModifyTaskScreen} />
        </Stack.Navigator>
      </Provider>
    </GluestackUIProvider>
  );
}

export default AppNavigator;
