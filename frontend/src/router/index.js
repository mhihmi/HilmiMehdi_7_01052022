import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Signup from "../views/SignupView.vue";
import Feeds from "../views/FeedsView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/feeds",
    name: "feeds",
    component: Feeds,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
