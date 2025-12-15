/**
 * @format
 */
import { render } from '@testing-library/react-native';
import React from 'react';

import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    // App renders with mocked navigation, so we just verify it doesn't throw
    expect(() => render(<App />)).not.toThrow();
  });
});
