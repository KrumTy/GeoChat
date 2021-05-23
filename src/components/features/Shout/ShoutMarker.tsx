import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableHighlight,
  Animated,
} from 'react-native';

import shoutFrames from '../../../static/shoutFrames';
import useScaleMarkerAnimations from './hooks/useScaleMarkerAnimations';

type ItemProps = {
  frameId: number;
  text: string;
  zoomLevel?: number;
  onPress: () => void;
};

export default ({frameId, text, zoomLevel = 14, onPress}: ItemProps) => {
  const {zoomAnim, fadeAnim} = useScaleMarkerAnimations(zoomLevel);

  return (
    <Animated.View
      style={[{opacity: fadeAnim, transform: [{scale: zoomAnim}]}]}>
      <ImageBackground
        resizeMode={'contain'}
        style={[styles.backgroundImage]}
        source={shoutFrames[frameId].source}>
        <TouchableHighlight
          onPress={onPress}
          activeOpacity={0.5}
          underlayColor="transparent">
          <Text style={[styles.text, shoutFrames[frameId].textStyle]}>
            {text}
          </Text>
        </TouchableHighlight>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: 200,
    height: 100,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    height: 40,
    fontWeight: 'bold',
  },
});
