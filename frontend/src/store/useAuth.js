import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: null,
    token: null,
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
      this.token = !!data.token;
      this.userId = data.profile.userId;
    },
    clearAuth() {
      this.$reset();
    },
  },
});
