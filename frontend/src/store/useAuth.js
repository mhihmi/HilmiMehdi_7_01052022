import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // userId: localStorage.getItem("id"),
    userId: useStorage("userId", ""),
    token: useStorage("token", ""),
    // token: localStorage.getItem("token"),
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
