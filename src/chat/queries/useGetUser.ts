import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '../../global/constants';

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

const useGetUser = () => {
  const { selectedContactUser } = useChatStore();

  const userId = selectedContactUser?.id ?? null;

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
    initialData: selectedContactUser,
  });

  return { data, isLoading, error };
};

export default useGetUser;
