import '@fontsource/palanquin/latin-700.css'
import '@fontsource/oxygen/latin-400.css'
import '@fontsource/fira-mono/400.css'

import './assets/main.scss'

import HighchartsVue from 'highcharts-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import * as en from './locales/en.json'
import * as nl from './locales/nl.json'
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import App from './App.vue'

const messages = { en, nl }
const fallbackLocale = 'en'
const browserLanguage = navigator.language.split('-')[0]
const locale = Object.keys(messages).includes(browserLanguage) ? browserLanguage : fallbackLocale

createApp(App)
  .use(HighchartsVue)
  .use(VueQueryPlugin)
  .use(
    createI18n({
      legacy: false,
      locale,
      fallbackLocale: 'en',
      messages,
    }),
  )
  .mount('#app')
