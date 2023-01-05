/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import { createPinia } from 'pinia'

// window.vm = createApp(App).use(createPinia()).use(router).mount("#app");
createApp(App).use(createPinia()).use(createPinia()).use(router).mount("#app");