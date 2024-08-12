// GameOptions.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Box from '../Box';

const GameOptions = ({ navigation }) => {
  const handleSinglePlayerPress = () => {
    navigation.navigate('Single-Player');
  };

  const handleMultiplayerPress = () => {
    navigation.navigate('MultiPlayer'); // Corrected the navigation name here
  };

  return (
    <View style={styles.container}>
      <Box
        name="Single Player"
        picture={require('../../pictures/tac.png')}
        onPress={handleSinglePlayerPress}
      />
      <View style={{ marginLeft: 30 }}>
        <Box
          name="Multiplayer"
          picture={require('../../pictures/tic.png')}
          onPress={handleMultiplayerPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    margin: 40,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOptions;
