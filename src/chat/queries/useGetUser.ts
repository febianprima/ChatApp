import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '../../global/constants';
import { useGlobalStore } from '../../global/store';

import { useChatStore } from '../store/useChatStore';

const fetchUser = async ({ userId }: { userId: number | null }) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const userData: chat.User = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const useGetUser = ({ isAuthenticatedUser = false }: { isAuthenticatedUser?: boolean } = {}) => {
  const { userId: authenticatedUserId } = useGlobalStore();
  const { selectedContactUser } = useChatStore();

  const userId = isAuthenticatedUser ? authenticatedUserId : (selectedContactUser?.id ?? null);

  // Only use initialData for contact users, not authenticated user
  const initialData = isAuthenticatedUser ? undefined : (selectedContactUser ?? undefined);

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
    initialData,
  });

  return { data, isLoading, error };
};

export default useGetUser;
