import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      outputFile: { html: 'vitest-report/index.html' },
      reporters: ['html'],
      coverage: {
        extension: ['.vue'],
        provider: 'v8',
        reporter: ['text', 'html'],
      },
      environment: 'happy-dom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
