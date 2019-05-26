module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test-db-setup.js'],
  collectCoverage: true,
  coverageDirectory: './test-results',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  reporters: ['default', 'jest-junit'],
};
