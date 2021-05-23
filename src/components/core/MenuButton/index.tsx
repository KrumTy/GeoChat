import React from 'react';

import {StyleSheet} from 'react-native';
import {Buttons} from '../../../images';
import {TestMenu} from '../../../state';

import ImageButton from '../ImageButton';

export default () => (
  <ImageButton
    style={styles.hamburgerButton}
    source={Buttons.ButtonHamburgerMenu}
    aspectRatio={0.4}
    onPress={TestMenu.launch}
  />
);

const styles = StyleSheet.create({
  hamburgerButton: {
    position: 'absolute',
    top: 65,
    left: 30,
  },
});
