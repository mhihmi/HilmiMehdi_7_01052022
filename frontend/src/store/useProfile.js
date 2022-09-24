import { defineStore } from "pinia";
import { useAuthStore } from "@/store/useAuth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    // loaded: false,
    userId: null,
    pseudo: null,
    firstname: null,
    lastname: null,
    photo: null,
    isAdmin: null,
    createdAt: null,
    updatedAt: null,
  }),
  // Update/Modify state
  actions: {
    getUserProfile() {
      this.userId = useAuthStore().userId;
      if (useAuthStore().token !== null) {
        //&& this.loaded
        fetch(
          `${process.env.VUE_APP_API_URL}/api/auth/profile/${this.userId}`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + useAuthStore().token },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.$patch(data.profile);
            // this.createdAt = new Date(
            //   data.profile.createdAt
            // ).toLocaleDateString();
            // this.updatedAt = new Date(
            //   data.profile.updatedAt
            // ).toLocaleDateString();
            this.photo =
              `${process.env.VUE_APP_API_URL}/images/` + data.profile.photo;
          })
          .catch((error) => {
            console.log(error);
          });
        // this.loaded = true;
      }
    },
    clearProfile() {
      this.$reset();
    },
  },
});
