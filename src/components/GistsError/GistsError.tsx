import React from 'react';
import { Text, Animated, View, TouchableOpacity } from 'react-native';

import { useShowHideTransition } from '@kroon-test/hooks';

import styles from './GistsError.styles';

type GistErrorProps = {
  hasError: boolean;
  message: string;
  discard: () => void;
};

export const GistsError: React.FC<GistErrorProps> = ({
  hasError,
  message = 'Failed to fetch gists from Github API',

  discard,
}) => {
  const { shouldRender, value: translateY } = useShowHideTransition({
    from: 32,
    to: 0,
    duration: 150,
    shouldShow: hasError,
    handleHide: () => {},
  });

  return shouldRender ? (
    <Animated.View
      style={[styles.container, { transform: [{ translateY }] }]}
    >
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={discard}>
          <Text style={styles.buttonText}>✖</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  ) : null;
};
