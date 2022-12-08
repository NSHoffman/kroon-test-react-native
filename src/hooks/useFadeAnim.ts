import { useRef, useCallback, useState } from 'react';
import { Animated } from 'react-native';

type FadeState = {
  fadingIn: boolean;
  fadingOut: boolean;
  fadedIn: boolean;
  fadedOut: boolean;
};

type UseFadeAnimOutput = {
  opacity: Animated.Value;
  duration: number;
  state: FadeState;

  fadeIn: () => void;
  fadeOut: () => void;
};

const INITIAL_FADE_STATE = {
  fadingIn: false,
  fadingOut: false,
  fadedIn: false,
  fadedOut: false,
};

export const useFadeAnim = (duration: number = 500): UseFadeAnimOutput => {
  const { current: opacity } = useRef(new Animated.Value(0));
  const [state, setState] = useState<FadeState>(INITIAL_FADE_STATE);

  const fadeIn = useCallback(() => {
    setState(() => ({
      ...INITIAL_FADE_STATE,
      fadingIn: true,
    }));

    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setState(() => ({
        ...INITIAL_FADE_STATE,
        fadedOut: !finished,
        fadedIn: finished,
      }));
    });
  }, [duration, opacity]);

  const fadeOut = useCallback(() => {
    setState(() => ({
      ...INITIAL_FADE_STATE,
      fadingOut: true,
    }));

    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setState(() => ({
        ...INITIAL_FADE_STATE,
        fadedOut: finished,
        fadedIn: !finished,
      }));
    });
  }, [duration, opacity]);

  return {
    opacity,
    duration,
    state,
    fadeIn,
    fadeOut,
  };
};
