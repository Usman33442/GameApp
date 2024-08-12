import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Obstacle = ({ left, width, height }) => {
  return (
    <View style={[styles.obstacle, { left, width, height }]}>
      <Image
        source={require('../../pictures/prickly.jpg')} // Replace with the actual image path for the obstacle
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    bottom: -20,
  },
  image: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Obstacle;
