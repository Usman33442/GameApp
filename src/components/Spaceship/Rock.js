import React from 'react';
import { Image, StyleSheet } from 'react-native';

function Rock({ x, y }) {
  return <Image source={require('../../pictures/Space4.png')} style={[styles.rock, { top: y, left: x }]} />;
}

const styles = StyleSheet.create({
  rock: {
    width: 30,
    height: 30,
    position: 'absolute',
  },
});

export default Rock;
