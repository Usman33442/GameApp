import React from 'react';
import { Image, StyleSheet } from 'react-native';

function Spaceship({ y }) {
  return <Image source={require('../../pictures/Space1.png')} style={[styles.spaceship, { top: y }]} />;
}

const styles = StyleSheet.create({
  spaceship: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
});

export default Spaceship;
