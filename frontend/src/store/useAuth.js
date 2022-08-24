import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // userId: localStorage.getItem("id"),
    userId: null,
    // token: useLocalStorage("pinia/auth/", "token"),
    token: localStorage.getItem("token"),
  }),
  // Access our state
  getters: {
    loggedIn: (state) => {
      return !!state.token; // state.token as a Boolean
    },
  },
  // Update/Modify state
  actions: {
    updateAuth(data) {
      this.userId = data.profile.userId;
      this.token = data.token;
    },
    clearAuth() {
      this.$reset();
    },
  },
});
