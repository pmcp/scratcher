// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content',  '@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt',],
  extends: ['@nuxt/ui-pro']
})