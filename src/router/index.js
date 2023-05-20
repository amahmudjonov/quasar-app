import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      {
        path: "",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          { path: "/dashboard", component: () => import("pages/Index.vue") },
          {
            path: "/products",
            component: () => import("pages/Products/index.vue"),
          },
        ],
      },
      {
        path: "*",
        component: () => import("pages/Error404.vue"),
      },
    ],
    mode: "history",
    base: process.env.VUE_ROUTER_BASE,
  });

  return Router;
}
