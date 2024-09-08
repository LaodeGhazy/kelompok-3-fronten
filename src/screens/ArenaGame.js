import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import GameOver from '../components/GameOver'; // Import the GameOver component
import PausePopup from '../components/PausePopup'; // Import the PausePopup component

const ArenaGame = () => {
  const [isPlayButtonPressed, setIsPlayButtonPressed] = useState(false);
  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const [leftImage, setLeftImage] = useState(require('../assets/img_batu_kiri.png'));
  const [rightImage, setRightImage] = useState(require('../assets/img_batu_kanan.png'));
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlayerWin, setIsPlayerWin] = useState(false);
  const [isPausePopupVisible, setIsPausePopupVisible] = useState(false); // PausePopup state

  // Handle Play button press
  const handlePlayButtonPress = () => {
    setIsPlayButtonPressed(true);
    setIsScoreVisible(true);
  };

  // Handle Pause button press
  const handlePauseButtonPress = () => {
    setIsPausePopupVisible(true);
  };

  // Determine the winner based on player and computer choices
  const determineWinner = (leftImage, rightImage) => {
    if (
      (leftImage === require('../assets/img_batu_kiri.png') && rightImage === require('../assets/img_gunting_kanan.png')) ||
      (leftImage === require('../assets/img_kertas_kiri.png') && rightImage === require('../assets/img_batu_kanan.png')) ||
      (leftImage === require('../assets/img_gunting_kiri.png') && rightImage === require('../assets/img_kertas_kanan.png'))
    ) {
      setPlayerScore((prevScore) => prevScore + 1);
    } else if (
      (rightImage === require('../assets/img_batu_kanan.png') && leftImage === require('../assets/img_gunting_kiri.png')) ||
      (rightImage === require('../assets/img_kertas_kanan.png') && leftImage === require('../assets/img_batu_kiri.png')) ||
      (rightImage === require('../assets/img_gunting_kanan.png') && leftImage === require('../assets/img_kertas_kiri.png'))
    ) {
      setComputerScore((prevScore) => prevScore + 1);
    }
  };

  // Handle the end of the game when someone reaches 3 points
  useEffect(() => {
    if (playerScore === 3) {
      setIsPlayerWin(true);
      setIsModalVisible(true);
    } else if (computerScore === 3) {
      setIsPlayerWin(false);
      setIsModalVisible(true);
    }
  }, [playerScore, computerScore]);

  // Handle touchable item press
  const handleTouchablePress = (leftImage) => {
    setLeftImage(leftImage);
    const rightImageOptions = [
      require('../assets/img_batu_kanan.png'),
      require('../assets/img_gunting_kanan.png'),
      require('../assets/img_kertas_kanan.png'),
    ];
    const randomIndex = Math.floor(Math.random() * rightImageOptions.length);
    const selectedRightImage = rightImageOptions[randomIndex];
    setRightImage(selectedRightImage);

    determineWinner(leftImage, selectedRightImage);
  };

  // Play again handler
  const handlePlayAgain = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setIsModalVisible(false);
    setIsPausePopupVisible(false); // Hide the PausePopup when playing again
  };

  // Navigate to history
  const handleHistory = () => {
    console.log('Navigate to history');
  };

  // Exit the game
  const handleExit = () => {
    console.log('Exit the game');
  };

  // Close PausePopup
  const handleClosePausePopup = () => {
    setIsPausePopupVisible(false);
  };

  return (
    <ImageBackground
      source={isPlayButtonPressed ? require('../assets/img_background_start.png') : require('../assets/img_bg_ready.png')}
      style={styles.background}
    >
      {/* Container for the images */}
      <View style={styles.imageContainer}>
        <Image source={leftImage} style={styles.leftImage} />
        <Image source={rightImage} style={styles.rightImage} />
      </View>

      {/* Play button and score container */}
      <View style={styles.buttonContainer}>
        {!isPlayButtonPressed && (
          <TouchableOpacity style={styles.playButton} onPress={handlePlayButtonPress}>
            <Image source={require('../assets/img_play.png')} style={styles.playIcon} />
          </TouchableOpacity>
        )}
        {isScoreVisible && (
          <View style={styles.scoreContainer}>
            <View style={styles.scoreLabelContainer}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>Player 1</Text>
              </View>
              <Text style={styles.scoreNumber}>{playerScore}</Text>
            </View>
            <View style={styles.scoreLabelContainer}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>Computer</Text>
              </View>
              <Text style={styles.scoreNumber}>{computerScore}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Touchable items */}
      <View style={styles.touchableContainer}>
        <TouchableOpacity
          style={[styles.touchableItem, { opacity: isPlayButtonPressed ? 1 : 0.3 }]}
          onPress={() => handleTouchablePress(require('../assets/img_batu_kiri.png'))}
        >
          <Image source={require('../assets/img_batu_kiri.png')} style={styles.touchableImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableItem, { opacity: isPlayButtonPressed ? 1 : 0.3 }]}
          onPress={() => handleTouchablePress(require('../assets/img_gunting_kiri.png'))}
        >
          <Image source={require('../assets/img_gunting_kiri.png')} style={styles.touchableImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableItem, { opacity: isPlayButtonPressed ? 1 : 0.3 }]}
          onPress={() => handleTouchablePress(require('../assets/img_kertas_kiri.png'))}
        >
          <Image source={require('../assets/img_kertas_kiri.png')} style={styles.touchableImage} />
        </TouchableOpacity>
      </View>

      {/* Top-right corner touchable items */}
      <View style={styles.topRightContainer}>
        {!isPlayButtonPressed && (
          <TouchableOpacity
            style={styles.topRightButton}
            onPress={handleHistory}
          >
            <Image source={require('../assets/img_leaderboard.png')} style={styles.topRightIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.topRightButton}
          onPress={isPlayButtonPressed ? handlePauseButtonPress : handleExit}
        >
          <Image
            source={isPlayButtonPressed ? require('../assets/img_pause.png') : require('../assets/img_exit.png')}
            style={styles.topRightIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for game over */}
      <GameOver
        visible={isModalVisible}
        onPlayAgain={handlePlayAgain}
        onHistory={handleHistory}
        onExit={handleExit}
        isPlayerWin={isPlayerWin}
      />

      {/* PausePopup */}
      <PausePopup
        visible={isPausePopupVisible}
        onResume={() => setIsPausePopupVisible(false)}
        onRestart={handlePlayAgain}
        onExit={handleExit}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftImage: {
    width: 175,
    height: 200,
    resizeMode: 'contain',
    marginTop: 275,
  },
  rightImage: {
    width: 175,
    height: 200,
    resizeMode: 'contain',
    marginTop: 275,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  playButton: {
    backgroundColor: '#75B4AC',
    width: 85,
    height: 85, // Adjusted to make it a circle
    borderRadius: 42.5, // Circular border radius
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  playIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 10,
  },
  scoreLabelContainer: {
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scoreText: {
    color: 'white',
    fontSize: 14,
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
  touchableItem: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  topRightContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Space between buttons
  },
  topRightIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default ArenaGame;
