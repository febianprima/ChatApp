import { render } from '@testing-library/react-native';
import React from 'react';

import { useSnackbarStore } from '../../store/snackbarStore';

import { Snackbar } from '../Snackbar';

// Mock safe area insets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

describe('Snackbar', () => {
  beforeEach(() => {
    useSnackbarStore.setState({
      visible: false,
      message: '',
      type: 'info',
    });
  });

  it('should not render when not visible', () => {
    const { toJSON } = render(<Snackbar />);

    expect(toJSON()).toBeNull();
  });

  it('should render when visible', () => {
    useSnackbarStore.setState({
      visible: true,
      message: 'Test message',
      type: 'info',
    });

    const { getByText } = render(<Snackbar />);

    expect(getByText('Test message')).toBeTruthy();
  });

  it('should render success message', () => {
    useSnackbarStore.setState({
      visible: true,
      message: 'Success!',
      type: 'success',
    });

    const { getByText } = render(<Snackbar />);

    expect(getByText('Success!')).toBeTruthy();
  });

  it('should render error message', () => {
    useSnackbarStore.setState({
      visible: true,
      message: 'Error occurred',
      type: 'error',
    });

    const { getByText } = render(<Snackbar />);

    expect(getByText('Error occurred')).toBeTruthy();
  });
});
