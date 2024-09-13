import React from 'react';
import { View, Modal, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const GameOver = ({ visible, onPlayAgain, onExit, isPlayerWin }) => {
  const navigation = useNavigation(); // Initialize navigation

const GameOver = ({ visible, onPlayAgain, onHistory, onExit, isPlayerWin, onClose }) => {
  const navigation = useNavigation()
  const closeModal = () => {
    if(onClose){
      onClose()
      navigation.navigate('History')
    }
  }
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          {/* Result Image */}
          <Image
            source={isPlayerWin ? require('../assets/img_win_p1.png') : require('../assets/img_lose_p1.png')}
            style={styles.resultImage}
          />
          {/* Action Card */}
          <View style={styles.actionCard}>
            {/* Action Buttons in a Row */}
            <View style={styles.actionsRow}>
              {/* History Button */}
              <TouchableOpacity style={styles.actionButton} onPress={onClose}>
                <Image source={require('../assets/img_leaderboard.png')} style={styles.actionIcon} />
                <Text style={styles.actionText}>History</Text>
              </TouchableOpacity>
              {/* Play Again Button */}
              <TouchableOpacity style={styles.actionButton} onPress={onPlayAgain}>
                <Image source={require('../assets/img_restart.png')} style={styles.actionIcon} />
                <Text style={styles.actionText}>Play Again</Text>
              </TouchableOpacity>
              {/* Exit Button */}
              <TouchableOpacity style={styles.actionButton} onPress={onExit}>
                <Image source={require('../assets/img_exit.png')} style={styles.actionIcon} />
                <Text style={styles.actionText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: 300,
    backgroundColor: 'transparent', // Make the background fully transparent
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  resultImage: {
    width: 350,
    height: 275,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  actionCard: {
    width: '100%',
    backgroundColor: 'white', // White background for the action card
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  actionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameOver;
