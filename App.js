import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterSukses from './src/screens/registerSuksesScreen';
import HistoryScreen from "./src/screens/historyScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='History' component={HistoryScreen}
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
  );
}

export default App;