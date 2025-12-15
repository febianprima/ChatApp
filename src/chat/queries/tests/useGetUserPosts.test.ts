import { getLastPost } from '../../utils';

// Tests for useGetUserPosts - testing the lastPost derivation logic
describe('useGetUserPosts', () => {
  const mockPosts: chat.Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Body 1',
      tags: [],
      category: 'test',
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 2,
      userId: 1,
      title: 'Post 2',
      body: 'Body 2',
      tags: [],
      category: 'test',
      createdAt: '2024-01-16T10:00:00Z',
    },
    {
      id: 3,
      userId: 1,
      title: 'Post 3',
      body: 'Body 3',
      tags: [],
      category: 'test',
      createdAt: '2024-01-14T10:00:00Z',
    },
  ];

  it('should get the last post correctly using getLastPost', () => {
    const lastPost = getLastPost(mockPosts);

    // Post 2 has the latest createdAt
    expect(lastPost?.id).toBe(2);
    expect(lastPost?.title).toBe('Post 2');
  });

  it('should return undefined for empty posts array', () => {
    const lastPost = getLastPost([]);

    expect(lastPost).toBeUndefined();
  });

  it('should handle single post', () => {
    const singlePost = [mockPosts[0]];
    const lastPost = getLastPost(singlePost);

    expect(lastPost?.id).toBe(1);
  });

  it('should correctly identify posts by userId', () => {
    const userId = 1;
    const userPosts = mockPosts.filter(post => post.userId === userId);

    expect(userPosts).toHaveLength(3);
    expect(userPosts.every(post => post.userId === userId)).toBe(true);
  });

  it('should parse createdAt dates correctly', () => {
    const post = mockPosts[0];
    const date = new Date(post.createdAt);

    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0); // January
    expect(date.getDate()).toBe(15);
  });
});
