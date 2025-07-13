import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TournamentDayScreen from './screens/TournamentDayScreen';
import WeekBeforeScreen from './screens/WeekBeforeScreen';
import ResourcesScreen from './screens/ResourcesScreen';

const Tab = createBottomTabNavigator();

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1D4ED8',
    outline: '#374151',
    onSurface: '#000000',
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <Tab.Navigator
            id={undefined}
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#1D4ED8',
              tabBarInactiveTintColor: '#6B7280',
              tabBarStyle: {
                backgroundColor: '#f5f5f7',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 80,
                paddingBottom: 18,
                paddingTop: 8,
              },
            }}
          >
            <Tab.Screen name="Tournament Day" component={TournamentDayScreen} />
            <Tab.Screen name="Week Before" component={WeekBeforeScreen} />
            <Tab.Screen name="Resources" component={ResourcesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}