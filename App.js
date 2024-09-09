import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./src/screens/LandingPage";
import ArenaGame from "./src/screens/ArenaGame";
import Login from "./src/screens/Login";

const Stack = createStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
