import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    user: null,
    token: null,
  }),
  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setAuth(boolean) {
      this.isAuth = boolean;
    },
  },
});
