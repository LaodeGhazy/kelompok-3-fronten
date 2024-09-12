import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, BackHandler, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsPopup = ({ visible, onClose, onExit }) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false)

  const closeModal = () =>{
    setIsModalVisible(false)
  }
  // go to screen history dan close modal
  const handleHistory = () => {
    navigation.navigate('History')
    if(onClose){
      onClose()
    }
  }

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
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <TouchableOpacity style={styles.card} onPress={handleHistory}>
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
      </TouchableWithoutFeedback>
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
