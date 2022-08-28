import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/useAuth";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
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
      path: "/",
      name: "feeds",
      component: () => import("../views/FeedsView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;

// navigation guard
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const storeAuth = useAuthStore();

  if (to.meta.requiresAuth && !storeAuth.loggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});
