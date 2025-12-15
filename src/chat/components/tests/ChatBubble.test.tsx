import { render } from '@testing-library/react-native';
import React from 'react';

import { ChatBubble } from '../ChatBubble';

// Mock useFormatDate hook
jest.mock('../../../global/hooks', () => ({
  useFormatDate: () => (date: string) => {
    if (!date) return '';
    return '10:30';
  },
}));

const mockPost: chat.Post = {
  id: 1,
  userId: 1,
  title: 'Test Title',
  body: 'This is a test message',
  tags: [],
  category: 'test',
  createdAt: '2024-01-15T10:30:00Z',
};

describe('ChatBubble', () => {
  it('should render message body', () => {
    const { getByText } = render(<ChatBubble post={mockPost} isOwn={false} />);

    expect(getByText('This is a test message')).toBeTruthy();
  });

  it('should render formatted time', () => {
    const { getByText } = render(<ChatBubble post={mockPost} isOwn={false} />);

    expect(getByText('10:30')).toBeTruthy();
  });

  it('should render for own messages', () => {
    const { getByText } = render(<ChatBubble post={mockPost} isOwn={true} />);

    expect(getByText('This is a test message')).toBeTruthy();
  });

  it('should render for contact messages', () => {
    const { getByText } = render(<ChatBubble post={mockPost} isOwn={false} />);

    expect(getByText('This is a test message')).toBeTruthy();
  });

  it('should handle isNew prop', () => {
    const { getByText } = render(<ChatBubble post={mockPost} isOwn={true} isNew={true} />);

    expect(getByText('This is a test message')).toBeTruthy();
  });
});
