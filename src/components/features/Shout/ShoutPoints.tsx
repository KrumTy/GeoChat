import React from "react";
import { StyleSheet, Text } from "react-native";
import { BlurView } from "@react-native-community/blur";

import { useAppSelector } from "../../../state";
import { selectShoutPoints } from "../../../state/reducers/shoutsSlice";

export default () => {
  const shoutPoints = useAppSelector(selectShoutPoints);

  return (
    <BlurView 
      style={styles.container}
      blurType="light"
      blurAmount={5}
      reducedTransparencyFallbackColor="white"
    >
      <Text style={styles.text}>{shoutPoints}</Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 4,
    borderColor: "white",
  },
  text: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 30
  }
});