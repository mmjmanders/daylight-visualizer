import '@fontsource/palanquin/latin-600.css'
import '@fontsource/palanquin/latin-700.css'
import '@fontsource/oxygen/latin-400.css'
import '@fontsource/oxygen/latin-700.css'
import '@fontsource/fira-mono/400.css'

import './assets/main.css'

import HighchartsVue from 'highcharts-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import * as en from './locales/en.json'
import * as nl from './locales/nl.json'
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(HighchartsVue)
  .use(VueQueryPlugin)
  .use(
    createI18n({
      legacy: false,
      fallbackLocale: 'en',
      messages: {
        en,
        nl,
      },
    }),
  )
  .mount('#app')
