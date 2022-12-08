import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type GistErrorProps = {
  message?: string;
};

export const GistsError: React.FC<GistErrorProps> = ({
  message = 'Failed to fetch gists from Github API',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Oops! :(</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff2626',
  },

  message: {
    fontSize: 14,
    color: '#3D3D3D',
  },
});
