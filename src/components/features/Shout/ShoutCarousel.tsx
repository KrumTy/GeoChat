import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { BlurView } from "@react-native-community/blur";
// @ts-ignore
import InsetShadow from 'react-native-inset-shadow';
import MapboxGL from "@react-native-mapbox-gl/maps";

import { useAppSelector, useAppDispatch } from "../../../state";
import { addShout, selectShoutPoints } from "../../../state/reducers/shoutsSlice";

import ImageButton from "../../core/ImageButton";

import shoutFrames, { ShoutFrame } from "../../../static/shoutFrames";

import { Buttons } from "../../../images";

const  { ButtonX, ButtonThunder, ButtonSpeaker } = Buttons;

type Props = {
  text: string;
  setText: (t: string) => void;
}
type ItemProps = {
  item: ShoutFrame, 
  index: number
}
const renderShoutItem = ({ text, setText }: Props) => ({ item, index }: ItemProps) => (
  <View style={styles.slide}>
      <ImageBackground 
        resizeMode="contain"
        style={styles.sliderImage}
        source={item.source}>
          <TextInput 
              style={[styles.shoutInput2, item.textStyle]}        
              maxLength={10}
              value={text}
              onChangeText={t => setText(t.toUpperCase())}
              autoFocus={index === 0}
          />
      </ImageBackground>
  </View>
)

const DEFAULT_SHOUT = "WAARGH!!";

type ShoutCarouselProps = {
  mapElementRef: React.RefObject<MapboxGL.MapView>;
  onClose: () => void
}

export default ({ mapElementRef, onClose }: ShoutCarouselProps) => {
  // const shoutPoints = useAppSelector(selectShoutPoints);
  const [slideIndex, setSlideIndex] = useState(0);
  const [shoutText, setShoutText] = useState(DEFAULT_SHOUT);
  const dispatch = useAppDispatch();

  const resetShout = () => {
    setShoutText(DEFAULT_SHOUT);
    setSlideIndex(0);
    onClose();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* <InsetShadow shadowRadius={20} shadowOpacity={1}> */}
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          data={shoutFrames}
          renderItem={renderShoutItem({ text: shoutText, setText: setShoutText })}
          onSnapToItem={setSlideIndex}
          sliderWidth={400}
          itemWidth={250}
          layout="default"
        />
        <ImageButton 
          style={styles.closeButton}
          source={ButtonX} 
          aspectRatio={0.33}
          onPress={resetShout} 
        />
        <ImageButton 
          style={styles.thunderButton}
          source={ButtonThunder} 
          aspectRatio={0.27}
          onPress={async () => {
            const centerCoords = await mapElementRef.current?.getCenter();
            // TODO: use user coords: https://github.com/react-native-mapbox-gl/maps/blob/master/example/src/examples/UserLocationChange.js

            if (centerCoords) {
              dispatch(addShout({
                id: Date.now(),
                frameId: slideIndex,
                authorId: 0,
                text: shoutText,
                coordinates: centerCoords,
                // comments: []
              }));
            }

            resetShout();
          }} 
        />
      {/* </InsetShadow> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  sliderImage: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: 'contain'
  },
  carousel: {
  },
  slide :{
    flex: 1
  },
  thunderButton: {
    bottom: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    alignItems:"flex-end",
  },
  shoutInput2: {
    fontSize: 16,
    height: 40,
    fontWeight: "bold",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});
