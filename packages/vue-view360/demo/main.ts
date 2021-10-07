import Vue from "vue";
import VueRouter from "vue-router";

import View360 from "../src/index";

import App from "./Demo.vue";
import routerOption from "./router";

Vue.use(View360);
Vue.use(VueRouter);

const router = new VueRouter(routerOption);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
