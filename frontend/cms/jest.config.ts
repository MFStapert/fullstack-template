import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/frontend/common/$1',
  },
};

export default config;
