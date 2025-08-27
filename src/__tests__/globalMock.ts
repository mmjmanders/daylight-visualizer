import { VueQueryPlugin } from '@tanstack/vue-query';
import { createI18n } from 'vue-i18n';
import * as en from '../locales/en.json';
import * as nl from '../locales/nl.json';
import 'highcharts';
import 'highcharts/highcharts-more';

export const global = {
  plugins: [
    createI18n({ legacy: false, locale: 'en', fallbackLocale: 'en', messages: { en, nl } }),
    VueQueryPlugin,
  ],
};
