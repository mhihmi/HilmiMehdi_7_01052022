import { defineStore } from "pinia";

export const useUserStore = defineStore("profile", {
  state: () => ({
    id: null,
    pseudo: null,
    firstname: null,
    lastname: null,
    photo: null,
    isAdmin: null,
    createdAt: null,
  }),
  // Access our state
  getters: {
    isAdmin: (state) => {
      return !!state.isAdmin;
    },
  },
  // Update/Modify state
  actions: {},
});
