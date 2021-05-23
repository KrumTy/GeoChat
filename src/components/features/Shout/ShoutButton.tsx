import React from 'react';
import {StyleSheet} from 'react-native';

import ImageButton from '../../core/ImageButton';

import {Buttons} from '../../../images';
import {useAppSelector} from '../../../state';
import {selectShoutPoints} from '../../../state/reducers/shoutsSlice';

type Props = {
  onPress: () => void;
};

export default ({onPress}: Props) => {
  const shoutPoints = useAppSelector(selectShoutPoints);
  const disabled = shoutPoints < 1;

  return (
    <ImageButton
      style={disabled ? styles.speakerButtonDisabled : styles.speakerButton}
      source={Buttons.ButtonSpeaker}
      aspectRatio={0.2}
      onPress={() => !disabled && onPress()}
    />
  );
};

const styles = StyleSheet.create({
  speakerButton: {
    bottom: 50,
  },
  speakerButtonDisabled: {
    bottom: 50,
    opacity: 0.25,
  },
});
