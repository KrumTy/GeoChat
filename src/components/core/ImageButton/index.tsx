import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>,
  source: ImageSourcePropType;
  aspectRatio?: number;
  onPress: () => void;
}

export default ({ style, source, aspectRatio, onPress }: Props) => (
  <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
    <View style={styles.buttonView}>
      <Image 
        style={[styles.buttonImage, { aspectRatio }]}
        source={source} 
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonView:  {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  buttonImage: {
    // width: 70,
    resizeMode: "contain"
  }
});
