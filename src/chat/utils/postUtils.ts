/**
 * Get the most recent post from an array of posts based on createdAt timestamp
 * @param posts - Array of posts to search
 * @returns The most recent post, or undefined if array is empty
 */
export const getLastPost = (posts: chat.Post[]): chat.Post | undefined => {
  if (!posts || posts.length === 0) {
    return undefined;
  }

  return posts.reduce((latest, current) => {
    const latestDate = new Date(latest.createdAt).getTime();
    const currentDate = new Date(current.createdAt).getTime();
    return currentDate > latestDate ? current : latest;
  });
};
