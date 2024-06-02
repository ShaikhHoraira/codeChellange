module.exports = {
  testEnvironment: 'node',
  preset : 'ts-jest',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
