import { render } from '@testing-library/react-native';
import React from 'react';

import { useChatStore } from '../../store';

import { UserProfile } from '../UserProfile';

// Reset store before each test
beforeEach(() => {
  useChatStore.setState({
    selectedContactUser: null,
    blockedUsers: [],
    sentMessagesByUser: {},
  });
});

describe('UserProfile', () => {
  const defaultProps = {
    id: 1,
    avatar: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    username: 'johndoe',
  };

  it('should render name and username', () => {
    const { getByText } = render(<UserProfile {...defaultProps} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('@johndoe')).toBeTruthy();
  });

  it('should render last seen date when provided', () => {
    const { getByText } = render(<UserProfile {...defaultProps} lastSeenDate="10:30" />);

    expect(getByText('10:30')).toBeTruthy();
  });

  it('should render with small size', () => {
    const { toJSON } = render(<UserProfile {...defaultProps} size="small" />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render with medium size (default)', () => {
    const { toJSON } = render(<UserProfile {...defaultProps} size="medium" />);

    expect(toJSON()).toBeTruthy();
  });

  it('should show blocked text when user is blocked', () => {
    useChatStore.setState({ blockedUsers: [1] });

    const { getByText } = render(<UserProfile {...defaultProps} />);

    expect(getByText('Blocked')).toBeTruthy();
  });

  it('should not show blocked text when user is not blocked', () => {
    const { queryByText } = render(<UserProfile {...defaultProps} />);

    expect(queryByText('Blocked')).toBeNull();
  });
});
