import { render } from '@testing-library/react-native';
import React from 'react';

import { useGlobalStore } from '../../../global/store';

import { SettingsScreen } from '../SettingsScreen';

// Mock DeviceInfo
jest.mock('react-native-device-info', () => ({
  getVersion: () => '1.0.0',
  getBuildNumber: () => '1',
}));

// Mock queries
jest.mock('../../../chat/queries', () => ({
  useGetUser: jest.fn(() => ({
    data: {
      id: 1,
      name: 'Test User',
      username: 'testuser',
      avatar: 'https://example.com/avatar.jpg',
      email: 'test@example.com',
      phone: '1234567890',
      website: 'https://testuser.com',
    },
    isLoading: false,
  })),
  useGetUsers: jest.fn(() => ({
    data: {
      results: [
        {
          id: 1,
          name: 'Test User',
          username: 'testuser',
          avatar: 'https://example.com/avatar1.jpg',
        },
        { id: 2, name: 'User Two', username: 'user2', avatar: 'https://example.com/avatar2.jpg' },
      ],
      total: 2,
    },
    isLoading: false,
  })),
}));

describe('SettingsScreen', () => {
  beforeEach(() => {
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
  });

  it('should render user information', () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('@testuser')).toBeTruthy();
  });

  it('should render switch user button', () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText('Switch User')).toBeTruthy();
  });

  it('should render app version', () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText('Version 1.0.0 (1)')).toBeTruthy();
  });

  it('should render skeleton when loading', () => {
    const { useGetUser } = require('../../../chat/queries');
    useGetUser.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    });

    const { toJSON } = render(<SettingsScreen />);

    expect(toJSON()).toBeTruthy();
  });

  it('should return null when no userData and not loading', () => {
    const { useGetUser } = require('../../../chat/queries');
    useGetUser.mockReturnValueOnce({
      data: null,
      isLoading: false,
    });

    const { toJSON } = render(<SettingsScreen />);

    expect(toJSON()).toBeNull();
  });
});
