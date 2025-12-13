import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '../../global/constants';

const fetchUser = async ({ userId }: { userId: number }) => {
  try {
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

const useGetUser = ({ userId }: { userId: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
  });

  return { data, isLoading, error };
};

export default useGetUser;
