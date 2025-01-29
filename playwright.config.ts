import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

export default defineConfig<ConfigOptions>({
  fullyParallel: true,
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
  testDir: 'tests/e2e',
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    }, {
      name: 'Desktop Edge',
      use: {
        ...devices['Desktop Edge'],
      },
    }, {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    }, {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
      },
    }, {
      name: 'iPhone Safari',
      use: {
        ...devices['iPhone 11'],
      },
    }, {
      name: 'iPad Safari',
      use: {
        ...devices['iPad (gen 6)'],
      },
    }, {
      name: 'Galaxy S5',
      use: {
        ...devices['Galaxy S5'],
      },
    },
    {
      name: 'Pixel 7',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],
  use: {
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: ['geolocation'],
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
