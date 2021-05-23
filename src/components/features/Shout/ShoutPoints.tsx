import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {useAppSelector} from '../../../state';
import {selectShoutPoints} from '../../../state/reducers/shoutsSlice';
import LightBlurView from '../../core/LightBlurView';

export default () => {
  const shoutPoints = useAppSelector(selectShoutPoints);

  if (shoutPoints < 0) {
    return null;
  }

  return (
    <LightBlurView style={styles.container}>
      <Text style={styles.text}>{shoutPoints}</Text>
    </LightBlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    bottom: undefined,
    left: undefined,
    alignItems: 'center',
    justifyContent: 'center',
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
