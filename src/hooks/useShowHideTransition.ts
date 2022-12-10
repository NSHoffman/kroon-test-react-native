import { useEffect } from 'react';
import { Animated } from 'react-native';

import { useTransition } from './useTransition';

type UseShowHideTransitionInput = {
  from: number;
  to: number;
  duration?: number;
  shouldShow: boolean;
  handleHide: () => void;
};

type UseShowHideTransitionOutput = {
  shouldRender: boolean;
  value: Animated.Value;
};

export const useShowHideTransition = ({
  from,
  to,
  duration = 500,
  shouldShow,
  handleHide,
}: UseShowHideTransitionInput): UseShowHideTransitionOutput => {
  const {
    state: transitionState,
    transitionIn,
    transitionOut,
    value,
  } = useTransition({ from, to, duration });

  const shouldRender = shouldShow || !transitionState.isOut;

  useEffect(() => handleHide(), [handleHide]);

  useEffect(() => {
    if (
      shouldShow &&
      !transitionState.isIn &&
      !transitionState.isTransitionIn
    ) {
      transitionIn();
    } else if (
      !shouldShow &&
      !transitionState.isOut &&
      !transitionState.isTransitionOut
    ) {
      transitionOut();
    }
  }, [
    shouldShow,
    transitionIn,
    transitionOut,
    transitionState.isIn,
    transitionState.isOut,
    transitionState.isTransitionIn,
    transitionState.isTransitionOut,
  ]);

  return {
    shouldRender,
    value,
  };
};
