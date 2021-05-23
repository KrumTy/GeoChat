import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

const getScale = (zoomLevel: number) => 1 + Math.max(0, (zoomLevel - 14) / 5);

export default (zoomLevel = 14) => {
  const scale = getScale(zoomLevel);
  const zoomAnim = useRef(new Animated.Value(scale)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1500,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(zoomAnim, {
      useNativeDriver: true,
      toValue: scale,
      duration: 500,
    }).start();
  }, [scale]);

  return {
    zoomAnim,
    fadeAnim,
  };
};
