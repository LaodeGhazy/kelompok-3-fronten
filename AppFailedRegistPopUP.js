import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput, View, Pressable, StyleSheet, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.containerFailed}>
          <Text style={styles.failed}>Failed</Text>
        </View>
        <View style={styles.containerAksi}>
          <Text>The email address you entered is already registered</Text>
          <View style={styles.containerButton}>
            <Pressable
              style={styles.loginButton}
            >
              <Text style={styles.text}>Log In</Text>
            </Pressable>
            <Pressable
              style={styles.anotherEmailButton}
            >
              <Text style={styles.text}>Use another email</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  failed:{
    fontSize: 35,
    color:'white',
    fontWeight: 'bold'
  },
  card:{
    flex: 0.5,
    margin: 50,
    backgroundColor: '#ede8e8',
    borderRadius: 10
  },
  containerFailed:{
    flex:1,
    backgroundColor: '#fc7777',
    justifyContent:'center',
    alignItems:'center',
    borderBottomRightRadius: 75,
    borderBottomLeftRadius: 75, 
    borderRadius: 10
  },
  containerAksi:{
    flex:0.5,
    borderRadius: 10,
    padding:20,
    // justifyContent:'center',
    // alignItems:'center'
  },
  containerButton:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:35
  },
  loginButton:{
    backgroundColor:'#49a472',
    padding: 10,
    borderRadius:10
  },
  anotherEmailButton:{
    backgroundColor: '#ef5757',
    padding: 10,
    borderRadius:10
  },
  text:{
    color: 'white',
    fontWeight:'bold'
  }
});
