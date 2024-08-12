import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Ground = () => {
  return (
    <View style={styles.ground}>
      <Image
        source={require('../../pictures/grass.jpg')} // Replace with the actual image path for the ground
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
  },
  image: {
    width: '100%',
    height: '100%',
   // resizeMode: 'contain',
  },
});

export default Ground;
