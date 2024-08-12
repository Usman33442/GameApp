import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../styles/colors";

interface ModalProps {
  score: number;
  isVisible: boolean;
  onPlayAgain: () => void;
}

const Modal: React.FC<ModalProps> = ({ score, isVisible, onPlayAgain }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Game Over</Text>
        <Text style={styles.modalText}>Score: {score}</Text>
        <TouchableOpacity onPress={onPlayAgain}>
          <Text style={styles.playAgainButton}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  playAgainButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    padding: 10,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});

export default Modal;
