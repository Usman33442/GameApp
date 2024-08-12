import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function EnemyManager({ position, onCollision }) {
  const [enemies, setEnemies] = useState([]);

  const enemyWidth = 50; // Adjust as needed
  const enemyHeight = 50; // Adjust as needed

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const spawnEnemy = () => {
    const newY = Math.random() * (screenHeight - enemyHeight);
    const newEnemy = {
      x: screenWidth,
      y: newY,
      id: Date.now(),
    };
    setEnemies([...enemies, newEnemy]);
  };

  useEffect(() => {
    const enemySpawnInterval = setInterval(spawnEnemy, 2000); // Adjust spawn interval as needed

    return () => {
      clearInterval(enemySpawnInterval);
    };
  }, []);

  useEffect(() => {
    const enemyMoveInterval = setInterval(() => {
      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) => ({
          ...enemy,
          x: enemy.x - 5, // Adjust enemy speed
        }))
      );
    }, 100); // Adjust move interval as needed

    return () => {
      clearInterval(enemyMoveInterval);
    };
  }, []);

  useEffect(() => {
    // Check for collisions with enemies
    enemies.forEach((enemy) => {
      const enemyHitbox = {
        x: enemy.x,
        y: enemy.y,
        width: enemyWidth,
        height: enemyHeight,
      };

      // Calculate spaceship's hitbox
      const spaceshipHitbox = {
        x: position.x,
        y: position.y,
        width: spaceshipWidth, // Replace with your spaceship width
        height: spaceshipHeight, // Replace with your spaceship height
      };

      if (
        spaceshipHitbox.x < enemyHitbox.x + enemyHitbox.width &&
        spaceshipHitbox.x + spaceshipHitbox.width > enemyHitbox.x &&
        spaceshipHitbox.y < enemyHitbox.y + enemyHitbox.height &&
        spaceshipHitbox.y + spaceshipHitbox.height > enemyHitbox.y
      ) {
        onCollision('enemy'); // Notify GameScreen of enemy collision
      }
    });
  }, [enemies, position]);

  return (
    <View style={styles.enemyManager}>
      {enemies.map((enemy) => (
        <Image
          key={enemy.id}
          source={require('../../pictures/Space (4).png')} // Replace with actual image path
          style={[styles.enemy, { top: enemy.y, left: enemy.x }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  enemyManager: {
    position: 'absolute',
  },
  enemy: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
});
