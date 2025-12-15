// Mock response helpers for jest-fetch-mock
// Use these in your tests to mock API responses

// Mock response data
export const mockUsers = {
  results: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ],
  total: 2,
};

export const mockPosts = {
  results: [
    { id: 1, title: 'First Post', body: 'Hello world!' },
    { id: 2, title: 'Second Post', body: 'Another post' },
  ],
  total: 2,
};

export const mockProducts = {
  results: [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 49.99 },
  ],
  total: 2,
};

// Helper to create mock responses based on URL
export function createMockResponse(url: string): string | null {
  if (url.includes('/api/users')) {
    return JSON.stringify(mockUsers);
  }
  if (url.includes('/api/posts')) {
    return JSON.stringify(mockPosts);
  }
  if (url.includes('/api/products')) {
    return JSON.stringify(mockProducts);
  }
  return null;
}
