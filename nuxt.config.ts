import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      }],
      meta: [{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      }, {
        charset: 'utf-8',
      }],
      title: 'Daylight Visualizer',
    },
  },
  css: ['@/assets/styles.scss'],
  compatibilityDate: '2024-11-01',
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
        commaDangle: 'always-multiline',
      },
    },
  },
});
