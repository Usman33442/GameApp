import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Dino from '../Dino/Dino';
import Obstacle from '../Dino/Obstacle';
import Ground from '../Dino/Ground';
import * as Animatable from 'react-native-animatable';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const GROUND_HEIGHT = 30;
const GameScreen = () => {
  // State variables for game logic
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  // Dino position and jump logic
  const [dinoPosition, setDinoPosition] = useState(SCREEN_HEIGHT - 1100); // Adjust the initial position
  const DINO_WIDTH = 100; // Adjust the dino width
  const DINO_HEIGHT = 170; // Adjust the dino height
  const JUMP_FORCE = 300; // Adjust the jump force to make it smooth (experiment with values)

  // Obstacle logic
  const [obstacleLeft, setObstacleLeft] = useState(SCREEN_WIDTH);
  const OBSTACLE_WIDTH = 50; // Adjust the obstacle width
  const OBSTACLE_HEIGHT = 100; // Adjust the obstacle height
  let obstacleSpeed = 4; // Define obstacleSpeed as a variable
  const OBSTACLE_SPEED_INCREMENT = 0.4; // Speed increment after each score increase

  // State variable for game pause
  const [isPaused, setIsPaused] = useState(false);

  // Function to start a new game
  const startNewGame = () => {
    setGameOver(false);
    setScore(0);
    setObstacleLeft(SCREEN_WIDTH);
    setDinoPosition(SCREEN_HEIGHT - 1200); // Set the initial position on the ground
    obstacleSpeed = 4; // Reset obstacle speed
  };

  // Function to handle jump
  const handleJump = () => {
    if (!isJumping && !gameOver && !isPaused) {
      setIsJumping(true);
      setDinoPosition((prevPosition) => prevPosition + JUMP_FORCE); // Update the position for jumping upward
      setTimeout(() => {
        setIsJumping(false);
        setDinoPosition((prevPosition) => Math.max(prevPosition - JUMP_FORCE, SCREEN_HEIGHT - 200)); // Bring the Dino back to the ground
      }, 1400); // Adjust the timeout value for smoothness (experiment with values)
    }
  };

  // Helper function to check if two rectangles intersect
  const checkCollision = (rect1, rect2) => {
    return (
      rect1.left < rect2.left + rect2.width &&
      rect1.left + rect1.width > rect2.left &&
      rect1.top < rect2.top + rect2.height &&
      rect1.top + rect1.height > rect2.top
    );
  };

  // Function to handle game over
  const handleGameOver = () => {
    setGameOver(true);
    setIsJumping(false);
    clearInterval(gameLoop);

    // Save highest score
    if (score > highestScore) {
      setHighestScore(score);
    }
  };

  // Game loop logic
  useEffect(() => {
    let gameLoop;
    if (!gameOver && !isPaused) {
      gameLoop = setInterval(() => {
        // Move obstacles to the left with the current obstacle speed
        setObstacleLeft((prev) => prev - obstacleSpeed);

        // Check if obstacle reached left edge
        if (obstacleLeft + OBSTACLE_WIDTH < 0) {
          setObstacleLeft(SCREEN_WIDTH);
          setScore((prev) => prev + 1);

          // Increase obstacle speed with the score
          obstacleSpeed += OBSTACLE_SPEED_INCREMENT;
        }

        // Check for collision
        const dinoRect = {
          left: 50, // Assuming dino's left position is 50 since it's absolutely positioned within the TouchableOpacity
          top: dinoPosition,
          width: DINO_WIDTH, // Use the actual dino width
          height: DINO_HEIGHT, // Use the actual dino height
        };

        const obstacleRect = {
          left: obstacleLeft,
          top: SCREEN_HEIGHT - Ground.GROUND_HEIGHT - OBSTACLE_HEIGHT,
          width: OBSTACLE_WIDTH, // Use the actual obstacle width
          height: OBSTACLE_HEIGHT, // Use the actual obstacle height
        };

        if (checkCollision(dinoRect, obstacleRect) || dinoPosition >= SCREEN_HEIGHT - Ground.GROUND_HEIGHT) {
          handleGameOver();
        }
      }, 1000 / 60); // 60 FPS
    }
    return () => clearInterval(gameLoop);
  }, [gameOver, dinoPosition, obstacleLeft, score, highestScore, isPaused]); // Add isPaused as a dependency

  // Function to handle "Play Again" button press
  const handlePlayAgain = () => {
    startNewGame();
  };

  // Function to toggle game pause
  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <ImageBackground
      source={require('../../pictures/back.jpg')} // Replace with the actual image path
      style={styles.container}
    >
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={handleJump}>
        <Animatable.View animation={isJumping ? 'bounceIn' : null}>
          <Dino position={dinoPosition} />
        </Animatable.View>
        <Obstacle left={obstacleLeft} width={OBSTACLE_WIDTH} height={OBSTACLE_HEIGHT} />
        <Ground />
      </TouchableOpacity>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
        <Text style={styles.pauseButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
      </TouchableOpacity>
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.highestScoreText}>Highest Score: {highestScore}</Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
            <Text style={styles.playAgainButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: 'red',
    backgroundColor: 'black',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highestScoreText: {
    fontSize: 20,
    marginBottom: 10,
  },
  playAgainButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  playAgainButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  pauseButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameScreen;
