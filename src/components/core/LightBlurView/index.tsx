import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  blurType?: 'dark' | 'light';
};

export default ({children, style, blurType = 'dark'}: Props) => (
  <BlurView
    style={[styles.absolute, style]}
    blurType={blurType}
    blurAmount={5}
    reducedTransparencyFallbackColor="white"
    children={children}
  />
);

const styles = StyleSheet.create({
  absolute: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
