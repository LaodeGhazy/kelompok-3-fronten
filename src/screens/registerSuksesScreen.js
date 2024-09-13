import React from 'react';
import { View, Pressable, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function RegisterSukses() {
  const navigation = useNavigation(); // Initialize the navigation
  return (
    <View style={styles.container}>
      <ImageBackground  
        source={require('../../assets/berhasilBackground.png')} 
        style={styles.imageBg}
        resizeMode='cover'
      >
        <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/berhasilRegisLogo.png')}
              style={styles.image}
            />
        </View>
      </ImageBackground>
      <View style={styles.pesanContainer}>
        <Text style={styles.congrats}>CONGRATULATION!!!</Text>
        <Text style={styles.noteSukses}>Your account has been successfully created</Text>
        <Pressable 
          onPress={() => navigation.navigate('ArenaGame')} // Navigate to ArenaGame screen
          style={styles.continueBtn}>
          <Text style={styles.continue}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 45,
    paddingTop: 100,
  },
  imageBg: {
    height: 400
  },
  image: {
    width: 200,
    height: 150
  },
  pesanContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    padding: 20
  },
  continueBtn: {
    backgroundColor: '#75b4ac',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 170,
    shadowOffset: {
      width: 2, 
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  continue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  congrats: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#75b4ac',
    shadowOffset: {
      width: 2, 
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  noteSukses: {
    fontSize: 18,
    fontWeight: 'medium',
    color: '#75b4ac',
  },
});
