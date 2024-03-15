import type {Config} from 'jest';

const config: Config = {
  moduleNameMapper: {
    "@ui/(.*)": "<rootDir>/frontend/ui/$1"
  }
};

export default config;
