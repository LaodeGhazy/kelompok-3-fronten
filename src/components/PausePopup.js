import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const PausePopup = ({ visible, onResume, onRestart, onExit }) => {
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
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={onRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitCard} onPress={onExit}>
            <Text style={styles.buttonText}>Home</Text>
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
    backgroundColor: '#49A472',
    borderRadius: 10,
    marginTop: 10, // Space between Restart and Exit
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default PausePopup;
