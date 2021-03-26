# Cryptr with Vue2

## 04 Add your Cryptr credentials

Now, we do the necessary to make able Cryptr to identify your app & perform well the authentication.

Add a **.env file** to your environment using the shell.

```bash
touch .env.local
```

Then **fill the .env** file with the following variables. Don't forget to replace `YOUR_CLIENT_ID` & `YOUR_DOMAIN`

```bash
VUE_APP_AUDIENCE=http://localhost:8080
VUE_APP_CLIENT_ID=YOUR_CLIENT_ID
VUE_APP_DEFAULT_LOCALE=en
VUE_APP_DEFAULT_REDIRECT_URI=http://localhost:8080
VUE_APP_TENANT_DOMAIN=YOUR_DOMAIN
VUE_APP_CRYPTR_TELEMETRY=FALSE
```

Integrate your CryptrPLugin with your credentials to Vue.

```javascript
// src/main.js

// ...
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
  telemetry: process.env.VUE_APP_CRYPTR_TELEMETRY,
  tenant_domain: process.env.VUE_APP_TENANT_DOMAIN
};

// 3. Add the plugin to Vue with your Cryptr config
Vue.use(CryptrPlugin, cryptrConfig);

new Vue({
// ...
```

[Next](https://github.com/cryptr-examples/cryptr-vue2-sample/tree/05-protect-your-routes)
