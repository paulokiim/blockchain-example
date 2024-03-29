module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'node'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/@types/*.ts',
    '!src/routes/*.ts',
    '!src/core/config/*.ts',
    '!src/index.ts',
    '!src/server.ts',
  ],
};
