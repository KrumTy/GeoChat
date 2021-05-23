import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default ({children, style}: Props) => (
  <BlurView
    style={[styles.absolute, style]}
    blurType="light"
    blurAmount={5}
    reducedTransparencyFallbackColor="white"
    children={children}
  />
);

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
