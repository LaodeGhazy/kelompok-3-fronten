import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from "./src/screens/LandingPage";
import ArenaGame from "./src/screens/ArenaGame";
import Login from "./src/screens/Login";
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterSukses from './src/screens/registerSuksesScreen';
import HistoryScreen from "./src/screens/historyScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ title: "", headerTransparent: true, }}
        />
        <Stack.Screen
          name="ArenaGame"
          component={ArenaGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
         name="Login"
         component={Login}
         options={{ headerShown: false }}
       />
        <Stack.Screen 
          name='History'
          component={HistoryScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}
          options={{
            headerShown: false
          }}
        />
          <Stack.Screen name="RegisterSukses" component={RegisterSukses} 
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
