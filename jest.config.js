module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'],
};
