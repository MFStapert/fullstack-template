import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'e2e/cms-e2e/support/e2e.ts',
    specPattern: 'e2e/cms-e2e/tests/**/*.cy.ts',
  },
});
