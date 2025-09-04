import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/roboto-mono/latin-400.css';
import '@fontsource/roboto-mono/latin-500.css';
import 'highcharts/css/highcharts.css';

import './assets/main.scss';

import HighchartsVue from 'highcharts-vue';
import 'highcharts/highcharts-more';
import 'highcharts/modules/boost-canvas';
import 'highcharts/modules/boost';
import { VueQueryPlugin } from '@tanstack/vue-query';
import * as en from './locales/en.json';
import * as nl from './locales/nl.json';
import { createI18n } from 'vue-i18n';
import { createApp } from 'vue';
import App from './App.vue';
import { parseQuery } from 'vue-router';

const query = parseQuery(location.search);
const messages = { en, nl };
const fallbackLocale = 'en';
const language = query['lang'] ?? navigator.language.split('-')[0];
const locale = Object.keys(messages).includes(language as string) ? language : fallbackLocale;

createApp(App)
  .use(HighchartsVue)
  .use(VueQueryPlugin)
  .use(
    createI18n({
      legacy: false,
      locale: locale as string,
      fallbackLocale,
      messages,
    }),
  )
  .mount('#app');
