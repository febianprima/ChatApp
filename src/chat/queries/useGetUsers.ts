import { useInfiniteQuery } from '@tanstack/react-query';

import { BASE_URL } from '../../global/constants/api';
import { useGlobalStore } from '../../global/store/globalStore';

const fetchUsers = async ({ pageParam = 0 }: { pageParam?: number }) => {
  try {
    const response: Response = await fetch(`${BASE_URL}/users?offset=${pageParam}&limit=10`);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const usersData: chat.FetchUsersResponse = await response.json();

    return usersData;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export function useGetUsers({ includeCurrentUser = false }: { includeCurrentUser?: boolean } = {}) {
  const { userId: currentUserId } = useGlobalStore();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        const nextOffset = lastPage.offset + lastPage.limit;
        if (nextOffset < lastPage.total) {
          return nextOffset;
        }
        return undefined;
      },
    });

  // Flatten all pages into a single array of users
  const allUsers = data?.pages.flatMap(page => page.results) ?? [];

  // Optionally filter out current user
  const users = includeCurrentUser ? allUsers : allUsers.filter(user => user.id !== currentUserId);

  return {
    data: { results: users, total: data?.pages[0]?.total ?? 0 },
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
