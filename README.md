# Cryptr with Vue2

## 05 Protect your routes

Now is the time to **protect your private pages** with a **guard**. Thanks to this little helper, we will easily take advantage of the Vue router.

Create the file:

```bash
touch src/CryptrGuard.js
```

Copy and paste:

```javascript
// src/CryptrGuard.js

import { getCryptrClient } from "./CryptrPlugin";

export const cryptrGuard = (to, from, next) => {
  const cryptr = getCryptrClient();

  // 1. Check if user is authenticated
  const signinUnlessAuthenticated = () => {
    if (cryptr.isAuthenticated) {
      return next();
    }

    cryptr.signInWithRedirect();
  };

  // 2. Handle loading as a guard clause
  if (!cryptr.loading) {
    return signinUnlessAuthenticated();
  }

  // 3. Watch the loading to call again
  // the signinUnlessAuthenticated() function
  cryptr.$watch("loading", loading => {
    if (!loading) {
      return signinUnlessAuthenticated();
    }
  });
};
```

**Import the CryptrGuard in your router**. Then, rename `views/About.vue` to `views/Profile.vue`, it will be the page we want to **make unavailable from a user without session**, then replace the about part with profile in the router.
On **each route to protect you need to add a guard clause** to check the user before to enter.

```javascript
  // src/routes/index.Js

  // ..
  import VueRouter from "vue-router";
  // 1. Import your CryptrGuard
  import { cryptrGuard } from "../CryptrGuard";
  import Home from "../views/Home.vue";
  //...

  //...
   component: Home
  },
  // 2. Import your CryptrGuard
  {
    path: "/profile",
    name: "Profile",
    // 3. Add the cryptrGuard here to protect the "/profile route"
    beforeEnter: cryptrGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
  },
  //...

```

The Cryptr plugin will provide you all functions you need directly to your templates, for a good demonstration, copy and paste the following code in your `src/App.vue`:

```javascript
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" style="margin-right: 5px;">Home</router-link>
      <span v-if="!$cryptr.isLoading && !$cryptr.isAuthenticated">
        <button
          v-on:click="$cryptr.signInWithRedirect"
          to="#"
          style="margin-right: 5px;"
        >
          Login
        </button>
        <button
          v-on:click="$cryptr.signUpWithRedirect"
          to="#"
          style="margin-right: 5px;"
        >
          Signup
        </button>
      </span>

      <router-link to="/profile">Protected route</router-link>

      <button
        v-if="$cryptr.isAuthenticated"
        v-on:click="$cryptr.logout"
        to="#"
        style="margin-left: 5px;"
      >
        Logout
      </button>
    </div>
    <router-view />
  </div>
</template>
/// ...

```

[Next](https://github.com/cryptr-examples/cryptr-vue2-sample/tree/06-decode-your-user-data)
