import '@fontsource/reddit-sans/latin-500.css';
import '@fontsource/reddit-sans/latin-700.css';
import '@fontsource/sora/latin-400.css';
import '@fontsource/sora/latin-700.css';
import '@fontsource/fira-mono/latin-400.css';
import '@fontsource/fira-mono/latin-500.css';
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

const messages = { en, nl };
const fallbackLocale = 'en';
const language =
  new URLSearchParams(location.search).get('lang') ?? navigator.language.split('-')[0];
const locale = Object.keys(messages).includes(language) ? language : fallbackLocale;

createApp(App)
  .use(HighchartsVue)
  .use(VueQueryPlugin)
  .use(
    createI18n({
      legacy: false,
      locale,
      fallbackLocale,
      messages,
    }),
  )
  .mount('#app');
