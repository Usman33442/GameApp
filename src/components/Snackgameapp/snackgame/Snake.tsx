import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Colors } from "../styles/colors";
import { Coordinate } from "../types/types";

interface SnakeProps {
  snake: Coordinate[];
}

const Snake: React.FC<SnakeProps> = ({ snake }) => {
  const [segments, setSegments] = useState<Coordinate[]>(snake);

  useEffect(() => {
    setSegments(snake);
  }, [snake]);

  return (
    <Fragment>
      {segments.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 10, // adjust for the size of each segment
          top: segment.y * 10,
          zIndex: snake.length - index, // To arrange segments from head to tail in the right order
        };

        const isHead = index === 0;
        const imageSize = isHead ? 20 : 14; // Adjust the size of the snake head and body

        const imageSource = isHead
          ? require("../../../pictures/cobra.png") // Replace with the actual path to your snake head image
          : require("../../../pictures/cobra.png"); // Replace with the actual path to your snake body image

        return (
          <View key={index} style={[styles.snakeSegment, segmentStyle]}>
            <Image
              source={imageSource}
              style={{ width: imageSize, height: imageSize }}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  snakeSegment: {
    position: "absolute",
  },
});

export default Snake;
