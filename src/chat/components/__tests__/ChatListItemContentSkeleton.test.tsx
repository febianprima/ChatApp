import { render } from '@testing-library/react-native';
import React from 'react';

import { ChatListItemContentSkeleton } from '../ChatListItemContentSkeleton';

describe('ChatListItemContentSkeleton', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<ChatListItemContentSkeleton />);

    expect(toJSON()).toBeTruthy();
  });
});
