import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

import { MODALS } from '../../constants';
import { useFadingComponentState, useModal } from '../../hooks';

type ImageTemporaryOverlayProps = {
  displayTime: number;
};

type ImageTemporaryOverlayModalArgs = {
  src?: string;
};

export const ImageTemporaryOverlay: React.FC<
  ImageTemporaryOverlayProps
> = ({ displayTime }) => {
  const { close, getState } = useModal();

  const modalState = getState(MODALS.IMAGE_TEMPORARY_OVERLAY);
  const modalArgs = modalState.args as ImageTemporaryOverlayModalArgs;
  const uri = modalArgs.src;

  const { opacity, shouldRender } = useFadingComponentState({
    displayTime,
    shouldShow: modalState.isOpen,
    handleHide: () => close(MODALS.IMAGE_TEMPORARY_OVERLAY),
  });

  if (!shouldRender || !uri) {
    return null;
  }

  return (
    <Animated.View style={[styles.overlayContainer, { opacity }]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri }} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 350,
    height: 350,
  },
});
