import { render } from '@testing-library/react-native';
import React from 'react';

import { DateSeparator } from '../DateSeparator';

describe('DateSeparator', () => {
  it('should render the label text', () => {
    const { getByText } = render(<DateSeparator label="Today" />);

    expect(getByText('Today')).toBeTruthy();
  });

  it('should render different labels correctly', () => {
    const { getByText, rerender } = render(<DateSeparator label="Yesterday" />);
    expect(getByText('Yesterday')).toBeTruthy();

    rerender(<DateSeparator label="15/01/2024" />);
    expect(getByText('15/01/2024')).toBeTruthy();
  });
});
