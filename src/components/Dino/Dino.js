import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Dino = ({ position }) => {
  return (
    <View style={[styles.dino, { bottom: position }]}>
      <Image
        source={require('../../pictures/editdino.png')} // Replace with the actual image path for the dino
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dino: {
    //position: 'absolute',
    bottom: -20, // Adjust this value to position the dino on the ground
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Dino;
