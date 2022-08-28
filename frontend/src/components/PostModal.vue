<template>
  <div class="newPost" @click="isModalOpen = true">
    <img
      :src="storeProfile.photo"
      :alt="storeProfile.pseudo"
      class="newPost__Profile"
    />
    <input
      type="text"
      placeholder="Créez un nouveau post..."
      class="newPost__Input"
      disabled
    />
    <svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      xmlns="http://www.w3.org/2000/svg"
      class="newPost__Icon1"
    >
      <path
        d="M2.00976 3.03L9.51976 6.25L1.99976 5.25L2.00976 3.03ZM9.50976 11.75L1.99976 14.97V12.75L9.50976 11.75ZM0.00975585 0L-0.000244141 7L14.9998 9L-0.000244141 11L0.00975585 18L20.9998 9L0.00975585 0Z"
        fill="#091F43"
      />
    </svg>
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      xmlns="http://www.w3.org/2000/svg"
      class="newPost__Icon2"
    >
      <path
        d="M9.257 17.4075L17.3286 9.21614C18.8798 7.64196 18.8611 5.11059 17.2869 3.55944C15.7128 2.00829 13.1814 2.02693 11.6302 3.60111L2.85675 12.5048C1.88816 13.4878 1.89982 15.0717 2.88279 16.0403C3.86576 17.0088 5.44964 16.9972 6.41823 16.0142L13.788 8.5351C14.174 8.14333 14.1693 7.50695 13.7775 7.12092C13.3858 6.73489 12.7494 6.73958 12.3634 7.13134L5.69552 13.8982L4.62707 12.8453L11.2949 6.07852C12.2635 5.09555 13.8474 5.08388 14.8304 6.05248C15.8133 7.02107 15.825 8.60494 14.8564 9.58791L7.48668 17.067C5.93552 18.6412 3.40415 18.6599 1.82997 17.1087C0.255799 15.5575 0.237152 13.0262 1.7883 11.452L10.5618 2.54829C12.6955 0.38291 16.1744 0.357283 18.3397 2.49099C20.5051 4.6247 20.5308 8.10358 18.397 10.269L10.3254 18.4604L9.257 17.4075Z"
        fill="#091F43"
      />
    </svg>
  </div>
  <teleport to="#modal">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="isModalOpen"
        @click.self="isModalOpen = false"
      >
        <form
          @submit.prevent="createPost"
          autocomplete="off"
          class="modal"
          ref="modal"
        >
          <button class="close-btn" @click="isModalOpen = false">X</button>
          <h2 class="modal__title">Créer une publication</h2>
          <div class="modal_user">
            <img
              :src="storeProfile.photo"
              :alt="storeProfile.pseudo"
              class="modal__userAvatar"
            />
            <div class="modal__userInfo">
              <h3 class="modal__userName">
                {{ storeProfile.firstname }}
                {{ storeProfile.lastname }}
              </h3>
              <p class="modal__userPseudo">alias {{ storeProfile.pseudo }}</p>
            </div>
          </div>
          <div class="modal_form">
            <div class="modal__form">
              <label for="title" class="modal__formTitle">Titre</label>
              <input
                type="text"
                placeholder="Indiquez un titre (facultatif)"
                name="title"
                class="modal__formTitleInput"
                v-model="form.title"
              />
              <label for="content">Contenu</label>
              <textarea
                v-model="form.content"
                id="content"
                name="content"
                rows="5"
                cols="50"
                minlength="20"
                maxlength="400"
                placeholder="Laissez libre cours à votre imagination ici..."
              ></textarea>
              <p>{{ form.errorContent }}</p>
            </div>
            <div class="modal__dropzone">
              <input type="file" @change="onFileSelected" />
            </div>
          </div>
          <div class="modal__btnContainer">
            <!-- <button class="btn danger">
              Annuler
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
            </button> -->
            <button class="btn success" type="submit">
              Publier
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
        </form>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import { apiManager } from "@/services/api";

export default {
  name: "PostModal",

  data() {
    let storeProfile = useProfileStore();
    storeProfile.getUserProfile();

    return {
      storeProfile,
      isModalOpen: false,
      modal: null,
      form: {
        title: null,
        content: null,
        file: "",
        errorContent: null,
      },
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      // console.log(event);
    },
    // updateProfile() {
    //   this.storeProfile.updateUserProfile();
    // },

    createPost() {
      console.log("blablabonjour");
      console.log(this.form.content);
      /* Create Post without file is authorized but not without content */
      if (!this.form.content) {
        this.form.errorContent =
          "Vous devez remplir le champ <contenu> pour créer une nouvelle publication !";
        return;
      }
      /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
      // let fd = new FormData();
      // fd.append("content", this.form.content);
      // fd.append("title", this.form.title);
      // fd.append("file", this.form.file);
      let obj = {
        title: this.form.title,
        content: this.form.content,
      };
      apiManager
        .post("/auth/post", obj)
        .then((res) => {
          res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/newPostInput";
@import "@/styles/components/postModal";
@import "@/styles/components/buttons";
</style>
