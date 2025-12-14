module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-device-info)/)',
  ],
  moduleNameMapper: {
    '^react-native-device-info$': '<rootDir>/__mocks__/react-native-device-info.js',
  },
};
