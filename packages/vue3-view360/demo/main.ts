import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import View360 from "../src/index";

import App from "./App.vue";
import routes from "./router";

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes
});

const app = createApp(App);

app.use(router);
app.use(View360);
app.mount("#app");
