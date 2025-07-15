import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider, MD3LightTheme, MD3DarkTheme, IconButton } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TournamentDayScreen from './screens/TournamentDayScreen';
import WeekBeforeScreen from './screens/WeekBeforeScreen';
import ResourcesScreen from './screens/ResourcesScreen';

const Tab = createBottomTabNavigator();

// Theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1D4ED8',
    outline: '#374151',
    onSurface: '#000000',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceVariant: '#f8fafc',
    onSurfaceVariant: '#374151',
    card: '#ffffff',
    text: '#000000',
    border: '#e5e7eb',
    notification: '#EF4444',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#60A5FA',
    outline: '#9CA3AF',
    onSurface: '#ffffff',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2D2D2D',
    onSurfaceVariant: '#D1D5DB',
    card: '#1E1E1E',
    text: '#ffffff',
    border: '#374151',
    notification: '#F87171',
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const paperTheme = isDarkMode ? darkTheme : lightTheme;
  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      primary: paperTheme.colors.primary,
      background: paperTheme.colors.background,
      card: paperTheme.colors.surface,
      text: paperTheme.colors.onSurface,
      border: paperTheme.colors.outline,
      notification: paperTheme.colors.notification,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: '700' as const },
      heavy: { fontFamily: 'System', fontWeight: '900' as const },
    },
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={navigationTheme}>
            <Tab.Navigator
              id={undefined}
              screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: paperTheme.colors.surface,
                },
                headerTintColor: paperTheme.colors.onSurface,
                headerRight: () => (
                  <IconButton
                    icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
                    iconColor={paperTheme.colors.onSurface}
                    size={24}
                    onPress={toggleDarkMode}
                  />
                ),
                tabBarActiveTintColor: paperTheme.colors.primary,
                tabBarInactiveTintColor: paperTheme.colors.outline,
                tabBarStyle: {
                  backgroundColor: paperTheme.colors.surface,
                  borderTopWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  height: 80,
                  paddingBottom: 18,
                  paddingTop: 8,
                },
              })}
            >
              <Tab.Screen name="Tournament Day" component={TournamentDayScreen} />
              <Tab.Screen name="Week Before" component={WeekBeforeScreen} />
              <Tab.Screen name="Tournaments" component={ResourcesScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}