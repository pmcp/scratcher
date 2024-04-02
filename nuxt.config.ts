// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content',  '@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt',],
  extends: ['@nuxt/ui-pro'],
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      testUser: process.env.TEST_USER, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      testPass: process.env.TEST_PASS, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
})