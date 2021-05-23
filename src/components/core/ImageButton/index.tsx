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
    <TouchableOpacity style={[styles.touchableArea]} onPress={onPress}>
      <Image style={{transform: [{scale: aspectRatio}]}} source={source} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  touchableArea: {
    width: 0,
    position: 'absolute',
    alignItems: 'center',
  },
});
