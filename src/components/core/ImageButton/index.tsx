import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
  aspectRatio?: number;
  onPress: () => void;
};

export default ({style, source, aspectRatio = 1, onPress}: Props) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity
      style={[styles.touchableArea, {transform: [{scale: aspectRatio}]}]}
      onPress={() => onPress()}>
      <Image source={source} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  touchableArea: {
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
  },
});
