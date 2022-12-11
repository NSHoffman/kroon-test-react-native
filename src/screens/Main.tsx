import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { GistsList } from '@kroon-test/components';
import { ImageTemporaryOverlay } from '@kroon-test/components/modals';
import { useGists } from '@kroon-test/hooks';

export const Main = () => {
  const {
    data: gists,
    error,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    discardError,
  } = useGists();

  return (
    <SafeAreaView>
      <StatusBar animated />
      <GistsList
        data={gists}
        error={error}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        discardError={discardError}
      />

      <ImageTemporaryOverlay displayTime={1000} />
    </SafeAreaView>
  );
};
