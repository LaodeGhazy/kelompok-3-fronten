import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background geometris */}
      <View style={styles.backgroundShape} />

      {/* Bagian Atas dengan judul Rock Paper Scissors */}
      <Image
          source={require('../assets/img_rps.png')} // Gambar judul
          style={styles.titleImage}
        />
      {/* Gambar anak laki-laki dan perempuan */}
      <Image
        source={require('../assets/img_dashboard.png')} // Letakkan gambar di folder assets dan pastikan namanya benar
        style={styles.imageHuman}
      />

      {/* Tombol Login dan Register */}
      <View style={styles.card}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')} // Asumsi ada halaman Login
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('RegisterScreen')} // Asumsi ada halaman Register
          >
            <Text style={styles.registerButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF', // Warna dasar
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.4,
    backgroundColor: '#FFD59E',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius:185, // Ini membuat efek bentuk geometris melengkung
    zIndex: -1, // Membuat background di belakang konten
  },
  card: {
    backgroundColor: '#FCE9CF', // Warna card
    padding: 20, // Memberikan jarak antara konten dan tepi card
    borderRadius: 15, // Membuat sudut card melengkung
    width: '80%', // Menyesuaikan lebar card
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    
    elevation: 5, // Memberikan bayangan di Android
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D', // Warna judul sesuai gambar
    textAlign: 'center',
  },
  titleImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginTop:-175,
    marginBottom: -55,
  },
  imageHuman: {
    width: 500,
    height: 325,
    resizeMode: 'contain',
    marginTop: 15,
    marginBottom: -22,
    
  },
  loginButton: {
    backgroundColor: '#FF914D',
    paddingVertical: 15,
    width: '100%', // Membuat tombol memiliki panjang yang sama
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center', // Untuk menjaga teks di tengah
  },
  registerButton: {
    backgroundColor: '#fff', // Warna background putih untuk tombol register
    borderColor: '#FF914D', // Warna border oranye
    borderWidth: 2,
    paddingVertical: 15,
    width: '100%', // Membuat tombol memiliki panjang yang sama
    borderRadius: 10,
    alignItems: 'center', // Untuk menjaga teks di tengah
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButtonText: {
    color: '#FF914D', // Teks register berwarna oranye
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LandingPage;
