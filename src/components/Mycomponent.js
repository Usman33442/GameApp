// Mycomponent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Box from './Box';

const Mycomponent = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Game-Options'); // Navigating to GameOptions screen
  };
  const handlePresssnack = () => {
    navigation.navigate('Dino Run'); // Navigating to GameOptions screen
  };
  const handlePresssnacks = () => {
    navigation.navigate('Snack'); // Navigating to GameOptions screen
  };
  const handlePressCar = () => {
    navigation.navigate('Car Racing'); // Navigating to GameOptions screen
  };
  const handlePressCFlappyBird = () => {
    navigation.navigate('Flappy Bird'); // Navigating to GameOptions screen
  };
  const handlePressSpaceship = () => {
    navigation.navigate('Space Ship'); // Navigating to GameOptions screen
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: 20,
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 8,
          borderWidth: 4,
          borderColor: 'rgba(0.4, 0, 0.3, 0.5)', 
        }}
      >
        <Text style={{ color: 'red', fontSize: 40, fontWeight: '800',paddingLeft: 20, }}>
          Game
        </Text>
        <Text style={{ color: 'green', fontSize: 40 }}> App  </Text>
      </View>
      <View style={{ marginTop: '4%', marginLeft: 20 , flexDirection: 'row'}}>
        <Box
          name="Tic Tac Toe"
          picture={require('../pictures/tictac.png')}
          onPress={handlePress}
        />
        <View style={{ marginLeft: 20}}>
        <Box
          name="Dino Run"
          picture={require('../pictures/sor.jpg')}
          onPress={handlePresssnack}
        />
        <Box
        name="Snack"
        picture={require('../pictures/sor.jpg')}
        onPress={handlePresssnacks}
        />
         <Box
        name="CAR Racing"
        picture={require('../pictures/sor.jpg')}
        onPress={handlePressCar}
        />
         <Box
        name="Flappy Bird"
        picture={require('../pictures/sor.jpg')}
        onPress={handlePressCFlappyBird}
        />
         <Box
        name="SpaceShip"
        picture={require('../pictures/sor.jpg')}
        onPress={handlePressSpaceship}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    //  justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Mycomponent;
