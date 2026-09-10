import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: { RUN_DB_TESTS: 'true' },
    fileParallelism: false,
    hookTimeout: 30000,
    testTimeout: 30000,
  },
});
