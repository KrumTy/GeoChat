import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

import shoutFrames from "../../../static/shoutFrames";

type ItemProps = {
  frameId: number;
  text: string;
  zoomLevel?: number;
}

const zoomResize = (zoomLevel: number) => {
  const scale = 1 + (Math.max(0, (zoomLevel - 14) / 5));
  return {
    transform: [{ scale: scale }]
  };
}

export default ({ frameId, text, zoomLevel = 14 }: ItemProps) => (
  <ImageBackground 
    resizeMode={"contain"}
    style={[styles.backgroundImage, zoomResize(zoomLevel)]}
    source={shoutFrames[frameId].source}
  >
    <Text style={[styles.text, shoutFrames[frameId].textStyle]} >
      {text}
    </Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  backgroundImage: {
    transform: [],
    width: 200,
    height: 100,
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    height: 40,
    fontWeight: "bold",
  },
});
