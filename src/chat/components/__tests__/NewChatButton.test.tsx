import { render } from '@testing-library/react-native';
import React from 'react';

import { NewChatButton } from '../NewChatButton';

describe('NewChatButton', () => {
  it('should render the button text', () => {
    const { getByText } = render(<NewChatButton />);

    expect(getByText('💬 Start new chat now!')).toBeTruthy();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<NewChatButton />);

    expect(toJSON()).toBeTruthy();
  });
});
