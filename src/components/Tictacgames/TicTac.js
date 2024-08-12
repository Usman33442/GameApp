import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleBackPress = () => {
    if (winner) {
      setWinner(null);
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [winner]);

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
        return true;
      }
    }

    return false;
  };

  const checkTie = () => {
    return board.every(cell => cell !== '');
  };

  const handlePress = index => {
    if (board[index] !== '' || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    if (checkWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
      return;
    } else if (checkTie()) {
      setWinner('Tie');
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const makeAIMove = board => {
    // AI move logic (minimax algorithm)
    const bestMove = minimax(board, 'O').index;
    const newBoard = [...board];
    newBoard[bestMove] = 'O';
    setBoard(newBoard);

    if (checkWinner(newBoard, 'O')) {
      setWinner('AI');
      return;
    } else if (checkTie()) {
      setWinner('Tie');
      return;
    }

    setCurrentPlayer('X');
  };

  const emptyIndices = board =>
    board.reduce((acc, cell, index) => {
      if (cell === '') {
        acc.push(index);
      }
      return acc;
    }, []);

  const minimax = (board, player) => {
    const availSpots = emptyIndices(board);

    if (checkWinner(board, 'O')) {
      return {score: 10};
    } else if (checkWinner(board, 'X')) {
      return {score: -10};
    } else if (availSpots.length === 0) {
      return {score: 0};
    }

    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      board[availSpots[i]] = player;

      if (player === 'O') {
        const result = minimax(board, 'X');
        move.score = result.score;
      } else {
        const result = minimax(board, 'O');
        move.score = result.score;
      }

      board[availSpots[i]] = ''; // Undo the move
      moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  const playAgain = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = index => {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handlePress(index)}
        disabled={!!(board[index] !== '' || winner)}>
        <Text
          style={[
            styles.cellText,
            board[index] === 'X' ? styles.cellTextX : styles.cellTextO,
          ]}>
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return (
        <Text
          style={[
            styles.statusText,
            {
              color:
                winner === 'Tie' ? 'black' : winner === 'AI' ? 'blue' : 'red',
            },
          ]}>
          {winner === 'Tie'
            ? "It's a Tie!"
            : winner === 'AI'
            ? 'AI Wins!'
            : `Winner: ${winner}`}
        </Text>
      );
    } else {
      return (
        <Text
          style={[
            styles.statusText,
            {color: currentPlayer === 'X' ? 'red' : 'blue'},
          ]}>
          Current Player: {currentPlayer}
        </Text>
      );
    }
  };

  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      // Make AI move after a delay to simulate thinking time
      setTimeout(() => {
        makeAIMove(board);
      }, 800);
    }
  }, [currentPlayer, winner]);

  return (
    <View style={styles.container}>
      {winner ? (
        <View style={styles.winnerContainer}>
          <Text
            style={[
              styles.winnerText,
              {
                color:
                  winner === 'Tie' ? 'black' : winner === 'AI' ? 'blue' : 'red',
              },
            ]}>
            {winner === 'Tie'
              ? "It's a Tie!"
              : winner === 'AI'
              ? 'AI Wins!'
              : `Winner: ${winner}`}
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
    fontWeight: '700',
    lineHeight: 48,
  },
  cellTextX: {
    color: 'red',
  },
  cellTextO: {
    color: 'blue',
  },
  status: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
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

export default TicTacToeGame;
