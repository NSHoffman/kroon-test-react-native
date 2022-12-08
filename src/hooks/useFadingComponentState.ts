import { useEffect } from 'react';
import { Animated } from 'react-native';

import { useFadeAnim } from './useFadeAnim';

type UseFadingComponentStateInput = {
  shouldShow: boolean;
  displayTime: number;

  handleHide: () => void;
};

type UseFadingComponentStateOutput = {
  shouldRender: boolean;
  opacity: Animated.Value;
};

export const useFadingComponentState = ({
  shouldShow,
  displayTime,
  handleHide,
}: UseFadingComponentStateInput): UseFadingComponentStateOutput => {
  const { state: fadeState, fadeIn, fadeOut, opacity } = useFadeAnim();

  const shouldRender = shouldShow || !fadeState.fadedOut;

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleHide();
    }, displayTime);

    return () => clearTimeout(timerId);
  }, [handleHide, displayTime]);

  useEffect(() => {
    if (shouldShow && !fadeState.fadedIn && !fadeState.fadingIn) {
      fadeIn();
    } else if (
      !shouldShow &&
      !fadeState.fadedOut &&
      !fadeState.fadingOut
    ) {
      fadeOut();
    }
  }, [
    fadeIn,
    fadeOut,
    fadeState.fadedIn,
    fadeState.fadedOut,
    fadeState.fadingIn,
    fadeState.fadingOut,
    shouldShow,
  ]);

  return {
    shouldRender,
    opacity,
  };
};
