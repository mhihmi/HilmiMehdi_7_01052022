import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "/feeds",
    name: "feeds",
    component: () => import("../views/FeedsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
