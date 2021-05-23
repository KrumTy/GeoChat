import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import shoutFrames, {ShoutFrame} from '../../../static/shoutFrames';
import {
  useAppDispatch,
  useAppSelector,
  addShout,
  selectCoordinates,
  selectUser,
} from '../../../state';
import CONFIG from '../../../config';
import {Buttons} from '../../../images';

import LightBlurView from '../../core/LightBlurView';
import ImageButton from '../../core/ImageButton';

const {ButtonX, ButtonThunder} = Buttons;

type ListItemProps = {
  item: ShoutFrame;
  index: number;
};

type ShoutCarouselProps = {
  onClose: () => void;
};

export default ({onClose}: ShoutCarouselProps) => {
  const user = useAppSelector(selectUser);
  const coordinates = useAppSelector(selectCoordinates);
  const [slideIndex, setSlideIndex] = useState(0);
  const [shoutText, setShoutText] = useState(CONFIG.DEFAULT_SHOUT);
  const dispatch = useAppDispatch();

  const resetShout = () => {
    setShoutText(CONFIG.DEFAULT_SHOUT);
    setSlideIndex(0);
    onClose();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LightBlurView />
      <Carousel
        data={shoutFrames}
        renderItem={({item, index}: ListItemProps) => (
          <View style={styles.slide}>
            <ImageBackground
              resizeMode="contain"
              style={styles.sliderImage}
              source={item.source}>
              <TextInput
                style={[styles.shoutInput, item.textStyle]}
                maxLength={10}
                value={shoutText}
                onChangeText={t => setShoutText(t.toUpperCase())}
                autoFocus={index === 0}
              />
            </ImageBackground>
          </View>
        )}
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
          // const centerCoords = await mapElementRef.current?.getCenter();
          dispatch(
            addShout({
              id: Date.now(),
              frameId: shoutFrames[slideIndex].id,
              authorId: user.id,
              text: shoutText,
              coordinates,
            }),
          );
          Keyboard.dismiss();
          resetShout();
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  sliderImage: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
  },
  thunderButton: {
    bottom: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    alignItems: 'flex-end',
  },
  shoutInput: {
    fontSize: 16,
    height: 40,
    fontWeight: 'bold',
    backgroundColor: 'blue',
  },
});
