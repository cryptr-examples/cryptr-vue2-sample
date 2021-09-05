import Vue from "vue";
import VueRouter from "vue-router";
// 1. Import your CryptrGuard
import { cryptrGuard } from "../CryptrGuard";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    // 2. Add the cryptrGuard here to protect the "/profile route"
    beforeEnter: cryptrGuard,
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
