import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { UserDetailsCard } from '../UserDetailsCard';

describe('UserDetailsCard', () => {
  const defaultProps = {
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('renders name correctly', () => {
    render(<UserDetailsCard {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('renders username with @ prefix', () => {
    render(<UserDetailsCard {...defaultProps} />);

    expect(screen.getByText('@johndoe')).toBeTruthy();
  });

  it('renders avatar image', () => {
    const { UNSAFE_getByType } = render(<UserDetailsCard {...defaultProps} />);
    const { Image } = require('react-native');

    const image = UNSAFE_getByType(Image);
    expect(image.props.source.uri).toBe('https://example.com/avatar.jpg');
  });

  it('renders contact items when provided', () => {
    const contactItems = [
      { icon: '📞', value: '123456789', onPress: jest.fn() },
      { icon: '✉️', value: 'test@example.com', onPress: jest.fn() },
    ];

    render(<UserDetailsCard {...defaultProps} contactItems={contactItems} />);

    expect(screen.getByText('📞')).toBeTruthy();
    expect(screen.getByText('123456789')).toBeTruthy();
    expect(screen.getByText('✉️')).toBeTruthy();
    expect(screen.getByText('test@example.com')).toBeTruthy();
  });

  it('does not render contact section when contactItems is empty', () => {
    render(<UserDetailsCard {...defaultProps} contactItems={[]} />);

    // Should only have name and username, no contact items
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('@johndoe')).toBeTruthy();
  });
});
