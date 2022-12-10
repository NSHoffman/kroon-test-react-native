import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { TouchableHighlight } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { GistItem, GistsError, ITEM_HEIGHT } from '@kroon-test/components';
import { useModal } from '@kroon-test/hooks';
import { BaseGistDTO } from '@kroon-test/api/Github';
import { MODALS } from '@kroon-test/constants';

type GistsListProps = {
  data: Array<BaseGistDTO>;
  error: unknown;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const GistsList: React.FC<GistsListProps> = ({
  data,
  error,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const { open } = useModal();

  const renderListHeader = useMemo(
    () => (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Gists</Text>
      </View>
    ),
    [],
  );

  const renderGistItem = useCallback(
    ({ item }: { item: BaseGistDTO }) => (
      <TouchableHighlight
        activeOpacity={0.25}
        underlayColor="#DDD"
        onPress={() =>
          open(MODALS.IMAGE_TEMPORARY_OVERLAY, {
            src: item.owner.avatar_url,
          })
        }
      >
        <GistItem
          id={item.id}
          avatarUrl={item.owner.avatar_url}
          filename={Object.keys(item.files)[0]}
        />
      </TouchableHighlight>
    ),
    [open],
  );

  const renderListLoadingFooter = useMemo(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return (
      <View style={styles.listFooter}>
        <ActivityIndicator size="large" />
      </View>
    );
  }, [isFetchingNextPage]);

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage && !error) {
      fetchNextPage();
    }
  }, [error, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) {
    return <GistsError message={(error as Error)?.message} />;
  }

  return (
    <SafeAreaView style={styles.listContainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={renderGistItem}
          estimatedItemSize={ITEM_HEIGHT}
          keyExtractor={gistKeyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListLoadingFooter}
          ListEmptyComponent={GistsListEmpty}
        />
      )}
    </SafeAreaView>
  );
};

const gistKeyExtractor = (gist: BaseGistDTO) => gist.id;

const GistsListEmpty: React.FC = () => (
  <View style={styles.listEmptyContainer}>
    <Text style={styles.listEmptyText}>
      No gists to display at the moment.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContainer: {
    height: Dimensions.get('window').height,
  },

  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

  listEmptyText: {
    fontSize: 14,
    color: '#939393',
  },

  listHeader: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },

  listHeaderText: {
    fontSize: 16,
    fontWeight: '800',
  },

  listFooter: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
