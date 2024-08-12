import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, PanResponder } from 'react-native';
import Spaceship from './Spaceship';
import Rock from './Rock';

const { width, height } = Dimensions.get('window');

function GameScreen() {
  const [spaceshipPosition, setSpaceshipPosition] = useState({ x: width / 2 - 25, y: height - 100 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [rocks, setRocks] = useState([]);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const gameInterval = setInterval(updateGame, 50);

    return () => {
      clearInterval(gameInterval);
    };
  }, [rocks, spaceshipPosition, score, gameOver]);

  const updateGame = () => {
    // Move existing rocks and add new rocks from the top
    const updatedRocks = rocks.map(rock => ({ ...rock, y: rock.y + 5 }));
    if (Math.random() < 0.05) {
      updatedRocks.push({ x: Math.random() * width, y: 0 });
    }
    setRocks(updatedRocks);

    // Check for collision with screen edges and rocks
    const collision = updatedRocks.some(rock =>
      rock.y + 30 > height ||
      (spaceshipPosition.x + 50 > rock.x && spaceshipPosition.x < rock.x + 30 &&
        spaceshipPosition.y + 50 > rock.y && spaceshipPosition.y < rock.y + 30)
    );

    if (collision || spaceshipPosition.x <= 0 || spaceshipPosition.x >= width - 50) {
      setGameOver(true);
    }

    // Check for passing rocks and increase score
    const passedRocks = updatedRocks.filter(rock => rock.y > spaceshipPosition.y + 50);
    setScore(score + passedRocks.length);
  };

  const handlePanResponderMove = (_, gestureState) => {
    const newX = gestureState.moveX - 25;
    const boundedX = Math.max(0, Math.min(width - 50, newX));
    setSpaceshipPosition({ ...spaceshipPosition, x: boundedX });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <ImageBackground source={require('../../pictures/Space7.png')} style={styles.container}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <Spaceship x={spaceshipPosition.x} />
        {rocks.map((rock, index) => (
          <Rock key={index} x={rock.x} y={rock.y} />
        ))}
        <Text style={styles.scoreText}>Score: {score}</Text>
        {gameOver && <Text style={styles.gameOverText}>Game Over</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 24,
  },
  scoreText: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default GameScreen;
