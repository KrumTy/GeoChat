import React from "react";
import { Alert, StyleSheet, Text, View, Image, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from "react-native";

import ImageButton from "../../core/ImageButton";

import { Buttons } from "../../../images";
import { useAppSelector } from "../../../state";
import { selectShoutPoints } from "../../../state/reducers/shoutsSlice";

const  { ButtonSpeaker } = Buttons;

type Props = {
  onPress: () => void;
}

export default ({ onPress }: Props) => {
  const shoutPoints = useAppSelector(selectShoutPoints);
  const disabled = shoutPoints < 1;
  
  return (
    <ImageButton 
      style={disabled ? styles.speakerButtonDisabled : styles.speakerButton}
      source={ButtonSpeaker} 
      aspectRatio={0.2}
      onPress={() => !disabled && onPress()} 
    />
  );
}

const styles = StyleSheet.create({
  speakerButton: {
    bottom: 50,
  },
  speakerButtonDisabled: {
    opacity: 0.5,
    bottom: 50,
  }
});
