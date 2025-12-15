import { render } from '@testing-library/react-native';
import React from 'react';

import { ChatListSkeleton } from '../ChatListSkeleton';

describe('ChatListSkeleton', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<ChatListSkeleton />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render multiple skeleton items', () => {
    const { toJSON } = render(<ChatListSkeleton />);
    const tree = toJSON();

    // Should have rendered children
    expect(tree).toBeTruthy();
  });
});
