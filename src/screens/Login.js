import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { FIREBASE_AUTH, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Mitr_200ExtraLight,
  Mitr_300Light,
  Mitr_400Regular,
  Mitr_500Medium,
  Mitr_600SemiBold,
  Mitr_700Bold,
} from '@expo-google-fonts/mitr';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const { width, height } = Dimensions.get('window');

const Login = () => {
  //font 
  let [fontsLoaded] = useFonts({
    Mitr_200ExtraLight,
    Mitr_300Light,
    Mitr_400Regular,
    Mitr_500Medium,
    Mitr_600SemiBold,
    Mitr_700Bold,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  })
  
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [ loading, setLoading] = useState(false);
  const FbAuth = FIREBASE_AUTH;


  const SignIn = async () => {
    setLoading(true);
    try{
        const response = await signInWithEmailAndPassword( FbAuth, email, password);
        console.log(response);
        navigation.navigate('ArenaGame');
    }catch(error){
        console.log(error, typeof email, typeof password);
        alert("login error: " +error.message);
    }finally {
        setLoading(false);
    }
  };


  const googleSignin = async () => {
    try {
        if(user) {
            await signOut(FbAuth)
        }else {
            await signInWithPopup(FbAuth, googleProvider);
        } 
    }catch(error) {
        console.error(error);
    }
  };

  const navigation = useNavigation(); // Initialize useNavigation

  const validateEmail = (text) => {
    // Regular expression for validating if the email ends with @gmail.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setEmail(text);
    setIsEmailValid(emailPattern.test(text));
  };

  const handleBackButtonPress = () => {
    navigation.navigate('LandingPage'); // Navigate to the LandingPage screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.navbar}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
            <Ionicons 
              name='arrow-back-circle-outline'
              size={40}
              color={'white'}
            />
          </TouchableOpacity>
          {/* Title and Image */}
          <Text style={styles.title}>Play with Us!</Text>
        </View>
        <View style={styles.containerAtas}>
            <Image
              source={require('../assets/img_login_char.png')}
              style={styles.image}
            ></Image>
          </View>
      </View>   
      <View style={styles.containerLogin}>
        {/* Email and Password Inputs */}
        {/* Display error message if email is invalid */}
        {!isEmailValid && (
          <Text style={styles.errorText}>Invalid Email Address</Text>
        )}
        <TextInput
          placeholder="Enter Your email"
          placeholderTextColor="#C4C4C4"
          keyboardType="email-address"
          style={[styles.input, !isEmailValid && styles.invalidInput]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor="#C4C4C4"
          secureTextEntry
          style={styles.input}
          onChangeText ={(text) => setPassword(text)}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => SignIn()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* OR divider */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity style={styles.googleButton} onPress={() => googleSignin()}>
          <Image source={require('../assets/img_google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ede8e8',

  },
  screen:{
    flex: 0.6,
    backgroundColor: '#75b4ac',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 75,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  navbar:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40
  },
  containerAtas:{
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color:'white',
    fontFamily: 'Mitr_500Medium',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  avatar: {
    marginBottom: -50,
  },
  containerLogin:{
    backgroundColor: '#ede8e8',
    paddingHorizontal: 30,
    paddingTop: 35,
    justifyContent:'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  invalidInput: {
    backgroundColor: '#FDCFCF', // Warna background saat email tidak valid
    borderColor: '#E52727', // Warna border saat email tidak valid
  },
  errorText: {
    color: '#E52727', // Warna teks error
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Inter_600SemiBold',
    alignSelf: 'flex-start', // Agar teks berada di atas input field
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#75B4AC',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C4C4C4',
  },
  orText: {
    marginHorizontal: 10,
    color: '#C4C4C4',
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#75B4AC',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  googleButtonText: {
    color: '#75B4AC',
    fontSize: 15,
    fontFamily: 'Mitr_300Light',
  },
});

export default Login;
