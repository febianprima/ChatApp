// Import built-in Jest matchers from React Native Testing Library
import '@testing-library/react-native/matchers';

// Setup fetch mocking
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});
