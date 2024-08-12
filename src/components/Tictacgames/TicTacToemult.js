import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';

const TicTacToemult = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle hardware back button press
  const handleBackPress = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
      return true; // Prevent default behavior (app exit) when the modal is open
    }
    return false; // Allow default behavior (app exit) when the modal is closed
  };

  // Add event listener for hardware back button press
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up the event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [isModalVisible]);

  const handlePress = index => {
    if (board[index] !== '' || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    checkWinner(newBoard, currentPlayer);
    togglePlayer();
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        setIsModalVisible(true); // Display the modal when there's a winner
        break;
      }
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const playAgain = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setIsModalVisible(false);
  };

  const renderCell = index => {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handlePress(index)}
        disabled={!!(board[index] !== '' || winner)}>
        <Text style={[styles.cellText, { color: board[index] === 'X' ? 'red' : 'blue', fontWeight: 'bold' }]}>
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStatus = () => {
    return (
      <Text style={[styles.statusText, { color: currentPlayer === 'X' ? 'red' : 'blue' }]}>
        {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {winner ? (
        <View style={styles.winnerContainer}>
          <Text style={[styles.winnerText, { color: winner === 'X' ? 'red' : 'blue' }]}>
            Winner: {winner}
          </Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={playAgain}>
            <Text style={styles.playAgainButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.board}>
            <View style={styles.row}>
              {renderCell(0)}
              {renderCell(1)}
              {renderCell(2)}
            </View>
            <View style={styles.row}>
              {renderCell(3)}
              {renderCell(4)}
              {renderCell(5)}
            </View>
            <View style={styles.row}>
              {renderCell(6)}
              {renderCell(7)}
              {renderCell(8)}
            </View>
          </View>
          <View style={styles.status}>{renderStatus()}</View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 130,
    height: 130,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 50,
    lineHeight: 48,
  },
  status: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
    marginBottom: 10,
  },
  winnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  playAgainButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});

export default TicTacToemult;
