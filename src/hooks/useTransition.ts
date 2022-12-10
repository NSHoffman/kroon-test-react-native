import { useRef, useCallback, useState } from 'react';
import { Animated } from 'react-native';

type TransitionState = {
  isTransitionIn: boolean;
  isTransitionOut: boolean;
  isIn: boolean;
  isOut: boolean;
};

type UseTransitionInput = {
  from: number;
  to: number;
  duration?: number;
};

type UseTransitionOutput = {
  value: Animated.Value;
  duration: number;
  state: TransitionState;

  transitionIn: () => void;
  transitionOut: () => void;
};

const INITIAL_TRANSITION_STATE: TransitionState = {
  isTransitionIn: false,
  isTransitionOut: false,
  isIn: false,
  isOut: false,
};

export const useTransition = ({
  from,
  to,
  duration = 500,
}: UseTransitionInput): UseTransitionOutput => {
  const { current: value } = useRef(new Animated.Value(0));
  const [state, setState] = useState<TransitionState>(
    INITIAL_TRANSITION_STATE,
  );

  const transitionIn = useCallback(() => {
    setState(() => ({
      ...INITIAL_TRANSITION_STATE,
      isTransitionIn: true,
    }));

    Animated.timing(value, {
      toValue: to,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setState(() => ({
        ...INITIAL_TRANSITION_STATE,
        isOut: !finished,
        isIn: finished,
      }));
    });
  }, [duration, to, value]);

  const transitionOut = useCallback(() => {
    setState(() => ({
      ...INITIAL_TRANSITION_STATE,
      isTransitionOut: true,
    }));

    Animated.timing(value, {
      toValue: from,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setState(() => ({
        ...INITIAL_TRANSITION_STATE,
        isOut: finished,
        isIn: !finished,
      }));
    });
  }, [duration, from, value]);

  return {
    value,
    duration,
    state,
    transitionIn,
    transitionOut,
  };
};
