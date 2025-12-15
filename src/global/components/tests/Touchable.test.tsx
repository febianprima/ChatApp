import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Touchable } from '../Touchable';

describe('Touchable', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Touchable onPress={() => {}}>
        <Text>Press me</Text>
      </Touchable>,
    );

    expect(getByText('Press me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Touchable onPress={onPress}>
        <Text>Press me</Text>
      </Touchable>,
    );

    fireEvent.press(getByText('Press me'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Touchable onPress={onPress} disabled>
        <Text>Press me</Text>
      </Touchable>,
    );

    fireEvent.press(getByText('Press me'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('should render with circle type', () => {
    const { toJSON } = render(
      <Touchable onPress={() => {}} type="circle">
        <Text>Circle</Text>
      </Touchable>,
    );

    expect(toJSON()).toBeTruthy();
  });

  it('should render with rounded type', () => {
    const { toJSON } = render(
      <Touchable onPress={() => {}} type="rounded">
        <Text>Rounded</Text>
      </Touchable>,
    );

    expect(toJSON()).toBeTruthy();
  });

  it('should apply custom style', () => {
    const { toJSON } = render(
      <Touchable onPress={() => {}} style={{ padding: 16 }}>
        <Text>Styled</Text>
      </Touchable>,
    );

    expect(toJSON()).toBeTruthy();
  });
});
