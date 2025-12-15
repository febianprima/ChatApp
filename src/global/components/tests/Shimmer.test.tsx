import { render } from '@testing-library/react-native';
import React from 'react';

import { Shimmer } from '../Shimmer';

describe('Shimmer', () => {
  it('should render with specified width and height', () => {
    const { toJSON } = render(<Shimmer width={100} height={20} />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render with circle shape', () => {
    const { toJSON } = render(<Shimmer width={50} height={50} shape="circle" />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render with rounded shape', () => {
    const { toJSON } = render(<Shimmer width={100} height={20} shape="rounded" />);

    expect(toJSON()).toBeTruthy();
  });

  it('should render with rectangle shape (default)', () => {
    const { toJSON } = render(<Shimmer width={100} height={20} shape="rectangle" />);

    expect(toJSON()).toBeTruthy();
  });

  it('should accept custom borderRadius', () => {
    const { toJSON } = render(<Shimmer width={100} height={20} borderRadius={16} />);

    expect(toJSON()).toBeTruthy();
  });

  it('should accept percentage dimensions', () => {
    const { toJSON } = render(<Shimmer width="100%" height={20} />);

    expect(toJSON()).toBeTruthy();
  });
});
