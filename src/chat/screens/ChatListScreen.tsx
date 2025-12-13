import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { colors } from '../../global/constants';

import ChatListItem from '../components/ChatListItem';
import { ChatListSkeleton } from '../components/ChatListSkeleton';
import useGetUsers from '../queries/useGetUsers';

const ITEM_HEIGHT = 140; // Approximate height for getItemLayout

export function ChatListScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUsers();

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: chat.User }) => <ChatListItem data={item} />,
    [],
  );

  const keyExtractor = useCallback((item: chat.User) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderFooter = useCallback(() => {
    if (isLoading || isFetchingNextPage) {
      return <ChatListSkeleton />;
    }
    return <View style={styles.footer} />;
  }, [isLoading, isFetchingNextPage]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        // Performance optimizations
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 100,
    backgroundColor: colors.surface,
  },
});
