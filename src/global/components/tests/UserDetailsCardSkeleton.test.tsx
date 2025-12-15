import { render } from '@testing-library/react-native';
import React from 'react';

import { UserDetailsCardSkeleton } from '../UserDetailsCardSkeleton';

describe('UserDetailsCardSkeleton', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<UserDetailsCardSkeleton />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render with contact items', () => {
    const { toJSON } = render(<UserDetailsCardSkeleton showContactItems contactItemsCount={3} />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render without contact items', () => {
    const { toJSON } = render(<UserDetailsCardSkeleton showContactItems={false} />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render with custom contact items count', () => {
    const { toJSON } = render(<UserDetailsCardSkeleton showContactItems contactItemsCount={5} />);

    expect(toJSON()).toBeTruthy();
  });
});
