import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@vesp/nuxt-fontawesome',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon-96x96.png`,
      }, {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.svg`,
      }, {
        rel: 'shortcut icon',
        href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.ico`,
      }, {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${process.env.NUXT_APP_BASE_URL || '/'}apple-touch-icon.png`,
      }, ...(process.env.NUXT_APP_BASE_URL
        ? [{
            rel: 'manifest',
            href: `${process.env.NUXT_APP_BASE_URL}site.webmanifest`,
          }]
        : [])],
      meta: [{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      }, {
        name: 'apple-mobile-web-app-title',
        content: 'Daylight Visualizer',
      }, {
        charset: 'utf-8',
      }],
      title: 'Daylight Visualizer',
    },
  },
  css: ['~/assets/main.scss'],
  runtimeConfig: {
    public: {
      geoapifyApiBaseUrl: 'https://api.geoapify.com/v1/geocode/search',
      geoapifyApiKey: undefined,
      sunsetApiBaseUrl: 'https://api.sunrisesunset.io/json',
      buildSha: undefined,
      version: '1.4',
    },
  },
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
  i18n: {
    defaultLocale: 'en',
    lazy: true,
    locales: [
      { code: 'en', file: 'en.ts' },
      { code: 'nl', file: 'nl.ts' },
    ],
  },
});
