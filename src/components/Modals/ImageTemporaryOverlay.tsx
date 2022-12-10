import React from 'react';
import { View, Image, Animated } from 'react-native';

import { useShowHideTransition, useModal } from '@kroon-test/hooks';
import { MODALS } from '@kroon-test/constants';

import styles from './ImageTemporaryOverlay.styles';

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

  const { value: opacity, shouldRender } = useShowHideTransition({
    from: 0,
    to: 1,
    shouldShow: modalState.isOpen,
    handleHide: () => {
      const timerId = setTimeout(
        () => close(MODALS.IMAGE_TEMPORARY_OVERLAY),
        displayTime,
      );

      return () => clearTimeout(timerId);
    },
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
