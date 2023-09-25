// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  routeRules: {
    "/login": { ssr: false },
    "/portfolio": { ssr: false },
    "/funds/**": { ssr: false },
  },
  devtools: { enabled: false },
  runtimeConfig: {
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
  },
  modules: [
    [
      "unplugin-icons/nuxt",
      {
        /* options */
      },
    ],
  ],
  css: [
    "@/public/css/main.scss",
    "vue-toast-notification/dist/theme-default.css",
  ],
  vite: {
    plugins: [svgLoader()],
  },
  components: {
    global: true,
    dirs: ["~/components/global"],
  },
});
