module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/migrations/*.ts',
    '!src/@types/*.ts',
    '!src/routes/*.ts',
    '!src/core/config/*.ts',
    '!src/index.ts',
    '!src/server.ts',
  ],
};
