import { constants } from "./public/const/index";
var boostrapCss = "/css/bootstrap.min.css";

export default defineNuxtConfig({
  css: ["@/assets/scss/app.scss"],
  ssr:false,
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content:
            "Buy VOXO - eCommerce VueJs Nuxt + Admin + Email  + Invoice Template by PixelStrap on ThemeForest.  VOXO - Multi-Purpose Responsive Ecommerce VueJs Nuxt Theme VOXO Ecommerce Theme with Multipurpose demos. ",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
      ],
      script: [
        {
          src: "https://checkout.stripe.com/checkout.js",
        },
        {src: 'https://www.paypal.com/sdk/js?client-id=test&currency=USD'},
        {
          src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/3.0.3/js-cloudimage-360-view.min.js",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.png",
        },

        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap",
        },

        {
          rel: "stylesheet",
          id: "bootstrap-link",
          href: boostrapCss,
        },
      ],
    },
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },
  modules: [    
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  plugins: [
    { src: "~/plugins/plugins.js", mode: "client" },
    { src: "~/plugins/liff.js", mode: "client" }
  ],
  runtimeConfig: {
    public: {
      const: constants,
      liffId:process.env.NUXT_ENV === 'qa' ? "2005743132-OyAMwJGW" : "2005595080-kRrvbdeB",
      apiUrl: process.env.NUXT_ENV === 'qa' ? 'https://qa-cloudymall-ec.azurewebsites.net/api' : 'https://localhost:7279/api' // 預設為開發環境
    },
  },
});
