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
      if (useAuthStore().token !== null) {
        try {
          await apiManager.get(`/auth/profile/${this.userId}`).then((data) => {
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
  },
});
