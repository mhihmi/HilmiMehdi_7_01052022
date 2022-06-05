import { defineStore } from "pinia";
import { useAuthStore } from "@/store/useAuth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    userId: null,
    pseudo: null,
    firstname: null,
    lastname: null,
    photo: null,
    isAdmin: null,
    createdAt: null,
  }),
  // Access our state
  getters: {
    isAdmin(state) {
      return !!state.isAdmin;
    },
  },
  // Update/Modify state
  actions: {
    async getUserProfile() {
      this.userId = useAuthStore().userId;
      let api = `${process.env.VUE_APP_API_URL}/api/auth/profile/${this.userId}`;
      if (useAuthStore().token !== null) {
        try {
          const token = useAuthStore().token;
          const result = await fetch(api, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + `${token}`,
            },
          });
          const data = await result.json();
          // console.log(data);
          // this.pseudo = data.profile.pseudo;
          // this.firstname = data.profile.firstname;
          // this.lastname = data.profile.lastname;
          // this.photo = data.profile.photo;
          // this.isAdmin = data.profile.isAdmin;
          // this.createdAt = data.profile.createdAt;
          this.$patch(data.profile);
          this.photo =
            `${process.env.VUE_APP_API_URL}/images/` + data.profile.photo;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});
