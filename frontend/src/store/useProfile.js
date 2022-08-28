import { defineStore } from "pinia";
import { useAuthStore } from "@/store/useAuth";
import { apiManager } from "@/services/api";

export const useProfileStore = defineStore("profile", {
  state: () => ({
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
        try {
          apiManager.get(`/auth/profile/${this.userId}`).then((data) => {
            this.$patch(data.profile);
            this.createdAt = new Date(
              data.profile.createdAt
            ).toLocaleDateString();
            this.updatedAt = new Date(
              data.profile.updatedAt
            ).toLocaleDateString();
            this.photo =
              `${process.env.VUE_APP_API_URL}/images/` + data.profile.photo;
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    // updateUserProfile(data) {
    //   this.userId = data.profile.userId;
    //   this.token = data.token;
    //   // this.userId = useAuthStore().userId;
    //   // if (useAuthStore().token !== null) {
    //   //   try {
    //   //     await apiManager.put(`/auth/profile/${this.userId}`).then((data) => {
    //   //       this.$patch(data.profile);
    //   //     });
    //   //   } catch (error) {
    //   //     console.log(error);
    //   //   }
    //   // }
    // },
  },
});
