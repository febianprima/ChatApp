// Import built-in Jest matchers from React Native Testing Library
import '@testing-library/react-native/matchers';
// Setup fetch mocking
import fetchMock from 'jest-fetch-mock';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: {
      insets: inset,
      frame: frame,
    },
  };
});

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(() => true),
      popToTop: jest.fn(),
      replace: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});

// Mock @react-navigation/elements
jest.mock('@react-navigation/elements', () => ({
  HeaderBackButton: () => null,
}));

// Mock @react-navigation/bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  return {
    createBottomTabNavigator: () => ({
      Navigator: ({ children }) => React.createElement(React.Fragment, null, children),
      Screen: () => null,
    }),
  };
});

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});
