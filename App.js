// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mycomponent from './src/components/Mycomponent';
import TicTacToemult from './src/components/Tictacgames/TicTacToemult'; // Correctly imported TicTacToeGame
import GameOptions from './src/components/Tictacgames/GameOptions'; // Import GameOptions
import TicTacToeGame1 from './src/components/Tictacgames/TicTac';
import GameScreen from './src/components/Dino/GameScreen';
//import GAME from './src/components/snack/Snackgame';
//import Game from './src/components/snack/Snackgame';
import Game from './src/components/Snackgameapp/snackgame/Game';
import World from './src/components/CarRacing/World'; 
import Flappy from './src/components/FlappyBird/FlappyBird';
import Space from './src/components/Spaceship/Space';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Game App"
          component={Mycomponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Single-Player"
          component={TicTacToeGame1}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
        />
        <Stack.Screen
          name="MultiPlayer"
          component={TicTacToemult}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
        />
        <Stack.Screen
          name="Game-Options"
          component={GameOptions}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
        />
         <Stack.Screen
          name="Dino Run"
          component={GameScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
        />
         <Stack.Screen
          name="Snack"
          component={Game}
          options={{ headerShown: false }}
         /* options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}*/
        />
         <Stack.Screen
          name="Car Racing"
          component={World}
          options={{ headerShown: false }}
         /* options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}*/
        />
        <Stack.Screen
          name="Flappy Bird"
          component={Flappy}
          options={{ headerShown: false }}
         /* options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}*/
        />
         <Stack.Screen
          name="Space Ship"
          component={Space}
          options={{ headerShown: false }}
         /* options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
            },
          }}*/
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
