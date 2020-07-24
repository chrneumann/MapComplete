/**
 * Application entrypoint, loads Vue 'App' component
 */

import { createApp } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'

// @ts-ignore
import App from './ui/App.vue'
import old2vueI18n from './i18n/old2vue-i18n'
import Translations from '../UI/i18n/Translations'

import messages from '@/l10n/messages.json';

const i18n = createI18n({
  locale: 'ja',
  messages
})

const appOuter = createApp(App)
appOuter.use(i18n)
appOuter.mount('#app')

console.log(old2vueI18n(Translations.t))

// const app = createApp(App)
// app.use(i18n)
// app.mount('#app')
