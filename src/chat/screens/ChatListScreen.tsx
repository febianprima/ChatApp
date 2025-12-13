import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { colors } from '../../global/constants';

import ChatListItem from '../components/ChatListItem';
import { ChatListSkeleton } from '../components/ChatListSkeleton';
import useGetUsers from '../queries/useGetUsers';

export function ChatListScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUsers();

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (isLoading || isFetchingNextPage) {
      return <ChatListSkeleton />;
    }
    return <View style={styles.footer} />;
  }, [isLoading, isFetchingNextPage]);

  return (
    <FlatList
      data={data?.results}
      showsVerticalScrollIndicator={false}
      bounces={false}
      renderItem={({ item }) => <ChatListItem data={item} />}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 100,
    backgroundColor: colors.surface,
  },
});
