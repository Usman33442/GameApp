import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function ObstacleManager({ position, onCollision }) {
  const [obstacles, setObstacles] = useState([]);

  const obstacleWidth = 60; // Adjust as needed
  const obstacleHeight = 60; // Adjust as needed

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const spawnObstacle = () => {
    const newY = Math.random() * (screenHeight - obstacleHeight);
    const newObstacle = {
      x: screenWidth,
      y: newY,
      id: Date.now(),
    };
    setObstacles([...obstacles, newObstacle]);
  };

  useEffect(() => {
    const obstacleSpawnInterval = setInterval(spawnObstacle, 3000); // Adjust spawn interval as needed

    return () => {
      clearInterval(obstacleSpawnInterval);
    };
  }, []);

  useEffect(() => {
    const obstacleMoveInterval = setInterval(() => {
      setObstacles((prevObstacles) =>
        prevObstacles.map((obstacle) => ({
          ...obstacle,
          x: obstacle.x - 3, // Adjust obstacle speed
        }))
      );
    }, 100); // Adjust move interval as needed

    return () => {
      clearInterval(obstacleMoveInterval);
    };
  }, []);

  useEffect(() => {
    // Check for collisions with obstacles
    obstacles.forEach((obstacle) => {
      const obstacleHitbox = {
        x: obstacle.x,
        y: obstacle.y,
        width: obstacleWidth,
        height: obstacleHeight,
      };

      // Calculate spaceship's hitbox
      const spaceshipHitbox = {
        x: position.x,
        y: position.y,
        width: spaceshipWidth, // Replace with your spaceship width
        height: spaceshipHeight, // Replace with your spaceship height
      };

      if (
        spaceshipHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
        spaceshipHitbox.x + spaceshipHitbox.width > obstacleHitbox.x &&
        spaceshipHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
        spaceshipHitbox.y + spaceshipHitbox.height > obstacleHitbox.y
      ) {
        onCollision('obstacle'); // Notify GameScreen of obstacle collision
      }
    });
  }, [obstacles, position]);

  return (
    <View style={styles.obstacleManager}>
      {obstacles.map((obstacle) => (
        <Image
          key={obstacle.id}
          source={require('../../pictures/Space (3).png')} // Replace with actual image path
          style={[styles.obstacle, { top: obstacle.y, left: obstacle.x }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  obstacleManager: {
    position: 'absolute',
  },
  obstacle: {
    width: 60,
    height: 60,
    position: 'absolute',
  },
});
