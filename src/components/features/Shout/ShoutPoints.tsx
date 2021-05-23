import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useAppSelector, selectShoutPoints} from '../../../state';
import LightBlurView from '../../core/LightBlurView';

export default () => {
  const shoutPoints = useAppSelector(selectShoutPoints);

  if (shoutPoints < 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LightBlurView blurType="light"></LightBlurView>
      <Text style={styles.text}>{shoutPoints}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 10,
    bottom: undefined,
    left: undefined,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 4,
    borderColor: 'white',
  },
  text: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
