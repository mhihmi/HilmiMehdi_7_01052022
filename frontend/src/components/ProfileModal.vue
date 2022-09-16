<template>
  <button class="modal__btn" @click="isModalOpen = true">
    <img
      :src="storeProfile.photo"
      :alt="storeProfile.pseudo"
      class="modal__btnPhoto"
    />
  </button>
  <teleport to="#modal">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="isModalOpen"
        @click.self="isModalOpen = false"
      >
        <form
          @submit.prevent="updateProfile"
          autocomplete="off"
          class="modal"
          ref="modal"
        >
          <button class="close-btn" @click.prevent="isModalOpen = false">
            X
          </button>
          <div class="modal__profileCard">
            <h2 class="modal__profileCardTitle">Modifier votre Profil</h2>
            <div class="modal__profileCardBox">
              <div class="modal__profileCardAvatar">
                <img
                  :src="storeProfile.photo"
                  :alt="storeProfile.pseudo"
                  class="modal__profileCardPhoto"
                />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  @change="onFileSelected"
                  class="modal__profileCardFileInput"
                  ref="fileInput"
                  aria-label="Modifier votre avatar"
                />
                <button
                  @click.prevent="$refs.fileInput.click()"
                  class="modal__profileCardFileButton"
                >
                  Choisir un fichier
                </button>
              </div>
              <div class="modal__profileCardText">
                <h3 class="modal__profileCardName">
                  {{ storeProfile.firstname }}
                  {{ storeProfile.lastname }}
                </h3>
                <p v-if="storeProfile.isAdmin">Vous êtes modérateur !</p>
                <p class="modal__profileCardMemberSince">
                  <span>Membre depuis le :</span> <br />
                  {{ storeProfile.createdAt }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal__profileForm">
            <h2 class="modal__profileFormTitle">Modifier votre Profil</h2>
            <div class="modal__profileFormBox">
              <label for="pseudo" class="modal__profileFormLabel"
                >Pseudo :</label
              >
              <input
                type="text"
                placeholder="Votre pseudo"
                name="pseudo"
                class="modal__profileFormInput"
                v-model="form.pseudo"
              />
              <label for="lastname" class="modal__profileFormLabel"
                >Nom de famille :</label
              >
              <input
                type="text"
                placeholder="Votre nom de famille"
                name="lastname"
                class="modal__profileFormInput"
                v-model="form.lastname"
              />
              <label for="firstname" class="modal__profileFormLabel"
                >Prénom :</label
              >
              <input
                type="text"
                placeholder="Votre prénom"
                name="firstname"
                class="modal__profileFormInput"
                v-model="form.firstname"
              />
              <div class="modal__profileFormBtnContainer">
                <button class="btn danger" @click.prevent="deleteProfile">
                  Supprimer mon compte
                  <span
                    ><svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.6"
                        d="M11 6V16H3V6H11ZM9.5 0H4.5L3.5 1H0V3H14V1H10.5L9.5 0ZM13 4H1V16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4Z"
                        fill="$color-dark"
                      />
                    </svg>
                  </span>
                </button>
                <button class="btn success" type="submit">
                  Enregistrer
                  <span
                    ><svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.6"
                        d="M19.77 2.9301L21.17 4.3301L8.43 17.0701L2.83 11.4701L4.23 10.0701L8.43 14.2701L19.77 2.9301ZM19.77 0.100098L8.43 11.4401L4.23 7.2401L0 11.4701L8.43 19.9001L24 4.3301L19.77 0.100098Z"
                        fill="$color-dark"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useProfileStore } from "@/store/useProfile";
import { useAuthStore } from "@/store/useAuth";

export default {
  name: "ProfileModal",

  setup() {
    let storeProfile = useProfileStore();
    storeProfile.getUserProfile();
    let storeAuth = useAuthStore();

    return {
      isModalOpen: ref(false),
      modal: ref(null),
      storeProfile,
      storeAuth,
      selectedFile: "",
      form: {
        pseudo: storeProfile.pseudo,
        lastname: storeProfile.lastname,
        firstname: storeProfile.firstname,
      },
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    updateProfile() {
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("pseudo", this.form.pseudo);
      formData.append("firstname", this.form.firstname);
      formData.append("lastname", this.form.lastname);

      fetch(
        `${process.env.VUE_APP_API_URL}/api/auth/profile/${this.storeProfile.userId}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + useAuthStore().token },
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((formData) => {
          console.log(formData);
          formData.userObject.photo =
            `${process.env.VUE_APP_API_URL}/images/` +
            formData.userObject.photo;
          console.log(formData.userObject);
          this.storeProfile.$patch(formData.userObject);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteProfile() {
      fetch(
        `${process.env.VUE_APP_API_URL}/api/auth/profile/${this.storeProfile.userId}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + useAuthStore().token },
        }
      )
        .then(() => {
          localStorage.clear();
          this.storeProfile.clearProfile();
          this.storeAuth.clearAuth();
        })
        .then(this.$router.push({ name: "login" }))
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/components/profileModal";
@import "@/styles/components/buttons";
</style>
