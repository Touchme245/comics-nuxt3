// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  imports: {
    dirs: ["stores"],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  app: {
    head: {
      title: "Comics reader",
      meta: [{ name: "description", content: "Everything about comics" }],
    },
  },
});
