import { render } from '@testing-library/react-native';
import React from 'react';

import { ChatListItemSkeleton } from '../ChatListItemSkeleton';

describe('ChatListItemSkeleton', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<ChatListItemSkeleton />);

    expect(toJSON()).toBeTruthy();
  });
});
