import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsPopup = ({ visible, onResume, onRestart, onExit }) => {
  const navigation = useNavigation();

  const handleExitGame = () => {
    BackHandler.exitApp(); // Close the app
  };

  const handleLogout = () => {
    // Reset the navigation stack to the Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onExit}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.card} onPress={onResume}>
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={handleExitGame}>
            <Text style={styles.buttonText}>ExitGame</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitCard} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFBD60',
    borderRadius: 10,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5, // Space between Resume and Restart
    alignItems: 'center',
  },
  exitCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#EF5757',
    borderRadius: 10,
    marginTop: 10, // Space between Restart and Exit
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default SettingsPopup;
