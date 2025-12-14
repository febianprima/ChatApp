export default {
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '1'),
  getApplicationName: jest.fn(() => 'ChatApp'),
  getBundleId: jest.fn(() => 'com.chatapp'),
  getDeviceId: jest.fn(() => 'test-device-id'),
  getUniqueId: jest.fn(() => Promise.resolve('test-unique-id')),
  getSystemName: jest.fn(() => 'iOS'),
  getSystemVersion: jest.fn(() => '17.0'),
  getModel: jest.fn(() => 'iPhone 15'),
  getBrand: jest.fn(() => 'Apple'),
  isEmulator: jest.fn(() => Promise.resolve(true)),
};
