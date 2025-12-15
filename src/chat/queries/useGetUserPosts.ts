import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '../../global/constants/api';

import { getLastPost } from '../utils';

const fetchUserPosts = async ({ userId }: { userId: number }) => {
  try {
    const response: Response = await fetch(`${BASE_URL}/users/${userId}/posts`);

    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }

    const postsData: chat.FetchPostsResponse = await response.json();

    return postsData;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
};

export function useGetUserPosts({ userId }: { userId: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchUserPosts({ userId }),
  });

  const posts = data?.results ?? [];
  const lastPost = getLastPost(posts);

  return { data, lastPost, isLoading, error };
}
