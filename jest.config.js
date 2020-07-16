module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // convert Enzyme wrappers for Jest snapshot matcher
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // compile TSX to JavaScript using ts-jest preset
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  // Matches patrent folder `__test__` and file name shold contain `test`
  testRegex: '/__tests__/.*\\.test.(ts|tsx)$',
  // Module file extension for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Path to setupTest.ts file for testing environment to be run immediately before running the test code.
  setupFiles: ['<rootDir>/__tests__/setupTest.ts']
};