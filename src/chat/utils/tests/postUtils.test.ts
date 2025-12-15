import { getLastPost } from '../postUtils';

const createMockPost = (id: number, createdAt: string): chat.Post => ({
  id,
  userId: 1,
  title: `Post ${id}`,
  body: `Body of post ${id}`,
  tags: [],
  category: 'test',
  createdAt,
});

describe('postUtils', () => {
  describe('getLastPost', () => {
    it('should return undefined for empty array', () => {
      expect(getLastPost([])).toBeUndefined();
    });

    it('should return undefined for null/undefined input', () => {
      expect(getLastPost(null as unknown as chat.Post[])).toBeUndefined();
      expect(getLastPost(undefined as unknown as chat.Post[])).toBeUndefined();
    });

    it('should return the only post when array has one item', () => {
      const post = createMockPost(1, '2024-01-15T10:00:00Z');
      expect(getLastPost([post])).toEqual(post);
    });

    it('should return the most recent post', () => {
      const oldPost = createMockPost(1, '2024-01-10T10:00:00Z');
      const newestPost = createMockPost(2, '2024-01-15T10:00:00Z');
      const middlePost = createMockPost(3, '2024-01-12T10:00:00Z');

      expect(getLastPost([oldPost, newestPost, middlePost])).toEqual(newestPost);
    });

    it('should handle posts with same timestamp', () => {
      const post1 = createMockPost(1, '2024-01-15T10:00:00Z');
      const post2 = createMockPost(2, '2024-01-15T10:00:00Z');

      const result = getLastPost([post1, post2]);
      // Should return one of them (first one in this case due to reduce behavior)
      expect(result).toBeDefined();
      expect(result?.createdAt).toBe('2024-01-15T10:00:00Z');
    });
  });
});
