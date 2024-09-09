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

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

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
      <View style={styles.backgroundShape} />
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
        <Image source={require('../assets/img_back_login.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title and Image */}
      <Text style={styles.title}>Play with Us!</Text>
      <Image source={require('../assets/img_login_char.png')} style={styles.avatar} />

      {/* Email and Password Inputs */}
      {/* Display error message if email is invalid */}
      {!isEmailValid && (
        <Text style={styles.errorText}>Invalid Email Address</Text>
      )}
      <TextInput
        placeholder="Enter Your email"
        placeholderTextColor="#C4C4C4"
        style={[styles.input, !isEmailValid && styles.invalidInput]}
        value={email}
        onChangeText={validateEmail}
      />
      <TextInput
        placeholder="Enter Your Password"
        placeholderTextColor="#C4C4C4"
        secureTextEntry
        style={styles.input}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* OR divider */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../assets/img_google.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  backgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.44,
    backgroundColor: '#75B4AC',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: -1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 15,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },

  avatar: {
    width: 450,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
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
    alignSelf: 'flex-start', // Agar teks berada di atas input field
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#75B4AC',
    paddingVertical: 12,
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
    fontWeight: 'bold',
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
    fontSize: 16,
  },
});

export default Login;
