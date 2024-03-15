import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    "@ui/(.*)": "<rootDir>/frontend/ui/$1"
  }
};

export default config;
