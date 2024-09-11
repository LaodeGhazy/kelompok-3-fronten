import React, {useState} from 'react';
import { TextInput, View, Pressable, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../firebase";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";



export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [ loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigation = useNavigation();
  const FbAuth = FIREBASE_AUTH;
  const handleSubmit = () => {
    if (emailRegex.test(email)) {
      navigation.navigate('RegisterSukses')
    } else {
        setError('Invalid email address');
    }
  }
  const ErrorText = ({error}) => {
    if(!error) return null
    return (
      <Text style={styles.errorText}>{error}</Text>
    )
  }
  
  const SignUp = async () => {
    setLoading(true);
    try{
        const response = await createUserWithEmailAndPassword( FbAuth, email, password);
        navigation.navigate('RegisterSukses');
        console.log("resp: ", response);
    }catch(error){
        console.log(error, email, password);
        alert("signup error: " +error.message);
    }finally {
        setLoading(false);
    }
};
const handleBackButtonPress = () => {
  navigation.navigate('LandingPage'); // Navigate to the LandingPage screen
};

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <View style={styles.screen}>
          <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
        <Image source={require('../assets/img_back_login.png')} style={styles.backIcon} />
      </TouchableOpacity>
            <Text style={styles.navbarTitle}>Join With Us!</Text>
          </View>
          <View style={styles.containerAtas}>
            <Image
              source={require('../../assets/signUp3.png')}
              style={styles.image}
            ></Image>
          </View>
        </View> 
        <ScrollView style={{paddingTop:50, flex:1}}>
          <View style={styles.containerRegister}>
              <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(text) => setUsername(text)}
                // onChangeText={onChangeText}
                // value={text}
              />
              <View>
                <TextInput
                  style={styles.inputEmail}
                  placeholder='Enter your email'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <ErrorText error={error} />
              </View> 
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                secureTextEntry={true}
                onChangeText ={(text) => setPassword(text)}
              />
              <Pressable 
                style={styles.wrapperCustom}>
                <Text style={styles.text} onPress={() => SignUp()}>Register</Text>
              </Pressable>
          </View>  
        </ScrollView>    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ede8e8',
    // justifyContent:'center',
    // alignItems: 'center',
  },
  screen:{
    flex: 0.6,
    backgroundColor: '#75b4ac',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 75,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  navbar:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40
  },
  navbarTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    color:'white'
  },
  containerAtas:{
    justifyContent:'center',
    alignItems: 'center',
  },
  image:{
    alignItems: 'center',
    shadowOffset: {
      width: 2, 
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    marginBottom: -45,
  },
  containerRegister:{
    backgroundColor: '#ede8e8',
    // flex: 2,
    justifyContent:'center',
    alignItems: 'center',
    // gap: 20,
  },
  input: {
    height: 40,
    width: 180,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  inputEmail: {
    height: 40,
    width: 180,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 3
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 10,
    backgroundColor:'#75b4ac',
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowOffset: {
      width: 2, 
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.3
  },
});
