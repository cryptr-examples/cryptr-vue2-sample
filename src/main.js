import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 1. Import yor plugin
import CryptrPlugin from "./CryptrPlugin";

Vue.config.productionTip = false;

// 2. Prepare a clean import of your var envs from your .env
const cryptrConfig = {
  audience: process.env.VUE_APP_AUDIENCE,
  client_id: process.env.VUE_APP_CLIENT_ID,
  cryptr_base_url: process.env.VUE_APP_CRYPTR_BASE_URL,
  default_locale: process.env.VUE_APP_DEFAULT_LOCALE,
  default_redirect_uri: process.env.VUE_APP_DEFAULT_REDIRECT_URI,
  region: process.env.VUE_APP_CRYPTR_REGION,
  telemetry: process.env.VUE_APP_CRYPTR_TELEMETRY,
  tenant_domain: process.env.VUE_APP_TENANT_DOMAIN,
};

// 3. Add the plugin to Vue with your Cryptr config
Vue.use(CryptrPlugin, cryptrConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
