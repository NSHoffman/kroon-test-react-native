import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { GistsList } from '../components';
import { GistsError } from '../components/GistsError';
import { ImageTemporaryOverlay } from '../components/Modals';
import { useGists } from '../hooks';

export const Main = () => {
  const {
    data: gists,
    error,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useGists();

  if (error) {
    return <GistsError message={(error as Error)?.message} />;
  }

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar animated />
      <GistsList
        data={gists}
        hasNextPage={hasNextPage || false}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />

      <ImageTemporaryOverlay displayTime={1000} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
