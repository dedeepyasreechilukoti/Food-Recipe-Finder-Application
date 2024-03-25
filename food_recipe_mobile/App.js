import React, { useState } from 'react';
import { AppRegistry, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RecipeSearchScreen from './src/components/RecipeSearchScreen';
import RecipeDetailsScreen from './src/components/RecipeDetailsScreen';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Dashboard" : "Login"}>
        {user ? (
          <>
            <Stack.Screen name="Dashboard">
              {props => <DashboardScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="RecipeSearch" component={RecipeSearchScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <RegisterScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
