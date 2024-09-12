import React, {useState} from 'react';
import { TextInput, View, Pressable, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { FIREBASE_AUTH, googleProvider } from "../../firebase";
import {
  useFonts,
  Mitr_400Regular,
  Mitr_500Medium,
} from '@expo-google-fonts/mitr';
import {
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';


export default function RegisterScreen() {
  let [fontsLoaded] = useFonts({
    Mitr_400Regular,
    Mitr_500Medium,
    Inter_500Medium, 
    Inter_600SemiBold,
  })
  

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const FbAuth = FIREBASE_AUTH;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const navigation = useNavigation()
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
      if (emailRegex.test(email)) {
        const response = await createUserWithEmailAndPassword( FbAuth,email, password);
        console.log("resp: ", response);
        navigation.navigate('RegisterSukses')
      } else {
          setError('Invalid email address');
      }
    }catch(error){
        console.log(error, email, password);
        alert("signup error: " + error.message);
    }finally {
        setLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <View style={styles.screen}>
          <View style={styles.navbar}>
            <Pressable
              onPress={() => navigation.navigate('LandingPage')} 
            >
              <Ionicons 
                name='arrow-back-circle-outline'
                size={40}
                color={'white'}
              />
            </Pressable>
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
                // onChangeText={onChangeText}
                // value={text}
              />
              <View style={styles.errorContainer}>
                <TextInput
                  style={styles.inputEmail}
                  placeholder='Enter your email'
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <ErrorText error={error} />
              </View> 
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable 
                onPress={SignUp}
                style={styles.wrapperCustom}>
                <Text style={styles.textBtn}>Register</Text>
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
    color:'white',
    fontFamily: 'Mitr_500Medium',
    shadowOffset: {
      width: 2, 
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
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
    paddingHorizontal: 30,
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
  errorContainer:{
    width: '100%',
    marginBottom: 15,
  },
  inputEmail: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#333',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  errorText: {
    color: 'red',
    marginTop: 3,
    fontFamily: 'Inter_600SemiBold'
  },
  textBtn: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Mitr_400Regular',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 5,
    backgroundColor:'#75b4ac',
    width: '100%',
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
