<template>
  <svg
    v-if="editMode"
    @click="isModalOpen = true"
    v-bind="$attrs"
    class="postCard__editBtn"
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.60416 19.4365C1.31195 19.436 1.0334 19.3127 0.836452 19.0969C0.635874 18.8828 0.536206 18.5932 0.562493 18.301L0.817701 15.4948L12.6073 3.70938L16.2917 7.39271L4.5052 19.1771L1.69895 19.4323C1.66666 19.4354 1.63437 19.4365 1.60416 19.4365ZM17.0271 6.65625L13.3437 2.97292L15.5531 0.763545C15.7485 0.567944 16.0136 0.458038 16.2901 0.458038C16.5666 0.458038 16.8317 0.567944 17.0271 0.763545L19.2365 2.97292C19.4321 3.1683 19.542 3.43343 19.542 3.7099C19.542 3.98637 19.4321 4.2515 19.2365 4.44688L17.0281 6.65521L17.0271 6.65625Z"
      fill="var(--color-text)"
    />
  </svg>
  <div v-else class="newPost" @click="isModalOpen = true">
    <img
      :src="storeProfile.photo"
      :alt="storeProfile.pseudo"
      class="newPost__Profile"
    />
    <input
      type="text"
      placeholder="Créez un nouveau post..."
      class="newPost__Input"
      aria-label="Créer un nouveau post"
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
          v-if="editMode"
          @submit.prevent="editPost"
          autocomplete="off"
          class="modal"
          ref="modal"
        >
          <button class="close-btn" @click.prevent="isModalOpen = false">
            X
          </button>
          <h2 class="modal__title">Modifier une publication</h2>
          <div class="modal__user">
            <img
              :src="baseUrl + '/images/' + post.User.photo"
              :alt="post.User.pseudo"
              class="modal__userAvatar"
            />
            <div class="modal__userInfo">
              <h3 class="modal__userName">
                {{ post.User.pseudo }}
              </h3>
              <p class="modal__userPostInfo">
                Posté le {{ formatDate(post.createdAt) }}
              </p>
              <p
                class="modal__userPostInfo"
                v-if="post.createdAt !== post.updatedAt"
              >
                Édité le {{ formatDate(post.updatedAt) }}
              </p>
            </div>
          </div>
          <div class="modal__form">
            <div class="modal__formLeft">
              <label for="title" class="modal__formTitle">Titre</label>
              <input
                type="text"
                :value="title"
                name="title"
                id="title"
                class="modal__formTitleInput"
                @input="$emit('update:title', $event.target.value)"
              />
              <label for="content" class="modal__formTitle">Contenu</label>
              <textarea
                id="content"
                :value="content"
                name="content"
                class="modal__formField"
                @input="
                  resize($event), $emit('update:content', $event.target.value)
                "
              ></textarea>
            </div>
            <div class="modal__formRight">
              <button
                v-if="
                  post.userId === storeProfile.userId || storeProfile.isAdmin
                "
                @click.prevent="deletePostMedia()"
                class="modal__uploadButton"
                aria-labelledby="supprimer le media de la publication"
              >
                Supprimer le Media
              </button>
              <span class="textOr">OU</span>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                @change="onFileSelected"
                class="modal__uploadFileInput"
                ref="fileInput"
                aria-label="Ajouter une image"
              />
              <div class="modal__ButtonGroup">
                <button
                  @click.prevent="$refs.fileInput.click()"
                  class="modal__uploadButton"
                >
                  Choisir un fichier
                </button>
                <p class="modal__fileInfo">{{ form.selectedFile.name }}</p>
              </div>
            </div>
          </div>
          <div class="modal__btnContainer">
            <button
              class="btn danger"
              @click.prevent="deletePost"
              aria-labelledby="supprimer la publication"
            >
              Supprimer
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
            <button
              class="btn success"
              type="submit"
              aria-labelledby="Modifier la publication"
            >
              Modifier
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
          <p class="modal__formError">{{ errorContent }}</p>
        </form>
        <form
          v-else
          @submit.prevent="createPost"
          autocomplete="off"
          class="modal"
          ref="modal"
        >
          <button
            class="close-btn"
            @click.prevent="isModalOpen = false"
            aria-label="fermer la création de publication"
          >
            X
          </button>
          <h2 class="modal__title">Créer une publication</h2>
          <div class="modal__user">
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
          <div class="modal__form">
            <div class="modal__formLeft">
              <label for="title" class="modal__formTitle">Titre</label>
              <input
                type="text"
                placeholder="Indiquez un titre (requis)"
                name="title"
                id="title"
                class="modal__formTitleInput"
                v-model="form.title"
              />
              <label for="content" class="modal__formTitle">Contenu</label>
              <textarea
                v-model="form.content"
                id="content"
                name="content"
                class="modal__formField"
                placeholder="Descriptif du post... (requis)"
                @input="resize($event)"
              ></textarea>
            </div>
            <div
              class="modal__formRight"
              :class="{ 'active-dropzone': active }"
              @dragenter.prevent="toggleActive"
              @dragleave.prevent="toggleActive"
              @dragover.prevent
              @drop.prevent="toggleActive"
              @drop="drop"
            >
              <div class="modal__uploadIcon">
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.2276 38.2814C43.1651 38.2016 43.0854 38.1372 42.9944 38.0928C42.9033 38.0484 42.8034 38.0254 42.7021 38.0254C42.6009 38.0254 42.5009 38.0484 42.4099 38.0928C42.3188 38.1372 42.2391 38.2016 42.1767 38.2814L32.8356 50.0995C32.7586 50.1978 32.7109 50.3159 32.6978 50.4401C32.6847 50.5643 32.7068 50.6897 32.7616 50.8019C32.8164 50.9141 32.9017 51.0087 33.0077 51.0747C33.1137 51.1408 33.2362 51.1756 33.3611 51.1754H39.5245V71.3921C39.5245 71.759 39.8247 72.0593 40.1917 72.0593H45.1958C45.5628 72.0593 45.8631 71.759 45.8631 71.3921V51.1837H52.0432C52.602 51.1837 52.9105 50.5415 52.5686 50.1078L43.2276 38.2814Z"
                    fill="var(--color-text)"
                  />
                  <path
                    d="M67.6725 30.5835C63.8527 20.5085 54.1196 13.3442 42.7185 13.3442C31.3174 13.3442 21.5844 20.5002 17.7646 30.5751C10.617 32.4517 5.33765 38.9654 5.33765 46.7051C5.33765 55.9211 12.8021 63.3856 22.0098 63.3856H25.3542C25.7212 63.3856 26.0214 63.0853 26.0214 62.7184V57.7142C26.0214 57.3473 25.7212 57.047 25.3542 57.047H22.0098C19.1991 57.047 16.5552 55.9294 14.587 53.9027C12.627 51.8844 11.5845 49.1655 11.6762 46.3465C11.7513 44.1447 12.5019 42.0763 13.8614 40.3332C15.2542 38.5567 17.2058 37.264 19.3742 36.6885L22.5352 35.8628L23.6945 32.8103C24.4117 30.9087 25.4126 29.1323 26.6719 27.5226C27.9152 25.9272 29.388 24.5247 31.0422 23.3608C34.47 20.9505 38.5067 19.6745 42.7185 19.6745C46.9303 19.6745 50.967 20.9505 54.3948 23.3608C56.0545 24.5285 57.5224 25.9296 58.7651 27.5226C60.0245 29.1323 61.0253 30.9171 61.7426 32.8103L62.8935 35.8545L66.0461 36.6885C70.5665 37.9062 73.7275 42.0179 73.7275 46.7051C73.7275 49.4657 72.6516 52.0679 70.7 54.0195C69.7429 54.9822 68.6043 55.7455 67.3502 56.2651C66.0961 56.7848 64.7514 57.0506 63.3939 57.047H60.0495C59.6825 57.047 59.3823 57.3473 59.3823 57.7142V62.7184C59.3823 63.0853 59.6825 63.3856 60.0495 63.3856H63.3939C72.6015 63.3856 80.066 55.9211 80.066 46.7051C80.066 38.9737 74.8034 32.4684 67.6725 30.5835Z"
                    fill="var(--color-text)"
                  />
                </svg>
                <span>Glisser / Déposer</span>
              </div>
              <span class="textOr">OU</span>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                @change="onFileSelected"
                class="modal__uploadFileInput"
                ref="fileInput"
                aria-label="Ajouter une image"
              />
              <div class="modal__ButtonGroup">
                <button
                  @click.prevent="$refs.fileInput.click()"
                  class="modal__uploadButton"
                >
                  Choisir un fichier
                </button>
                <p class="modal__fileInfo">{{ form.selectedFile.name }}</p>
              </div>
            </div>
          </div>
          <div class="modal__btnContainer">
            <button
              class="btn danger"
              @click.prevent="
                (isModalOpen = false), (this.form.selectedFile = '')
              "
              aria-labelledby="annuler la création de publication"
            >
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
            </button>
            <button
              class="btn success"
              type="submit"
              aria-labelledby="publier cette publication"
            >
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
          <p class="modal__formError">{{ errorContent }}</p>
        </form>
      </div>
    </transition>
  </teleport>
  <transition-group name="fading">
    <notificationMessage
      v-if="editMode"
      message="Publication modifiée avec succès !"
      v-show="notifModal"
    ></notificationMessage>
    <notificationMessage
      v-else
      message="Publication créée avec succès !"
      v-show="notifModal"
    ></notificationMessage>
  </transition-group>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import { useAuthStore } from "@/store/useAuth";
import notificationMessage from "@/components/NotificationBox";
import formatDateMixin from "@/mixins/formatDateMixin.js";

export default {
  name: "PostModal",
  emits: ["reloadIt", "update:title", "update:content"],
  components: { notificationMessage },
  props: {
    editMode: Boolean,
    post: Object,
    title: String,
    content: String,
  },
  data() {
    let storeProfile = useProfileStore();
    // storeProfile.getUserProfile();
    let storeAuth = useAuthStore();

    return {
      isModalOpen: false,
      notifModal: false,
      modal: null,
      baseUrl: process.env.VUE_APP_API_URL,
      storeProfile,
      storeAuth,
      errorContent: null,
      active: false,
      form: {
        title: null,
        content: null,
        selectedFile: "",
      },
    };
  },
  mixins: [formatDateMixin],
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
    drop(e) {
      this.form.selectedFile = e.dataTransfer.files[0];
    },
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    onFileSelected(event) {
      this.form.selectedFile = event.target.files[0];
    },
    createPost() {
      // console.log(this.form.content);
      /* Create Post without file is authorized but not without content or title */
      if (!this.form.content || !this.form.title) {
        this.errorContent =
          "Merci d'indiquer au moins un titre et un contenu !";
        return;
      }
      const formData = new FormData();
      formData.append("image", this.form.selectedFile);
      formData.append("title", this.form.title);
      formData.append("content", this.form.content);

      fetch(`${process.env.VUE_APP_API_URL}/api/post/create`, {
        method: "POST",
        headers: { Authorization: "Bearer " + useAuthStore().token },
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          this.isModalOpen = false;
          this.$emit("reloadIt");
          //Opening Success Notif
          this.notifModal = true;
          setTimeout(() => {
            this.notifModal = !this.notifModal;
          }, 1500);
        })
        // .then((response) => {
        //   console.log(JSON.stringify(response));
        // })
        .catch((error) => {
          console.log(error);
        });
    },
    editPost() {
      // console.log(this.form.content);
      /* Create Post without file is authorized but not without content or title */
      if (!this.content || !this.title) {
        this.errorContent =
          "Merci d'indiquer au moins un titre et un contenu !";
        return;
      }
      const formData = new FormData();
      formData.append("image", this.form.selectedFile);
      formData.append("title", this.title);
      formData.append("content", this.content);

      fetch(`${process.env.VUE_APP_API_URL}/api/post/${this.post.id}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + useAuthStore().token },
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          this.isModalOpen = false;
          this.$emit("reloadIt");
          //Opening Success Notif
          this.notifModal = true;
          setTimeout(() => {
            this.notifModal = !this.notifModal;
          }, 1500);
        })
        // .then((response) => {
        //   console.log(JSON.stringify(response));
        // })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost() {
      if (confirm("Voulez vraiment supprimer ce post ?")) {
        fetch(`${process.env.VUE_APP_API_URL}/api/post/${this.post.id}`, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + useAuthStore().token },
        })
          .then((res) => res.json())
          .then(() => {
            this.isModalOpen = false;
            this.$emit("reloadIt");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deletePostMedia() {
      // if (confirm("Voulez vraiment supprimer ce media ?")) {
      const formData = new FormData();
      fetch(`${process.env.VUE_APP_API_URL}/api/post/${this.post.id}/image`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + useAuthStore().token },
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          this.$emit("reloadIt");
          this.notifModal = true;
          setTimeout(() => {
            this.notifModal = !this.notifModal;
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/newPostInput";
@import "@/styles/components/postModal";
@import "@/styles/components/buttons";

.fading-enter-active,
.fading-leave-active {
  transition: opacity 0.3s ease-in;
}
.fading-enter,
.fading-leave-to {
  opacity: 0;
}
.postCard__editBtn {
  position: absolute;
  top: calculateRem(20px);
  right: calculateRem(26px);
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    transition: transform 0.3s ease-in;
  }

  &:hover path {
    fill: var(--color-text-hover);
  }

  @include breakpoint-down(medium) {
    top: calculateRem(15px);
    right: calculateRem(24px);
  }

  @include breakpoint-down(small) {
    width: 16px;
    height: 16px;
    top: calculateRem(13px);
    right: calculateRem(18px);

    &:hover {
      transform: scale(1.2);
      transition: transform 0.3s ease-in;
    }
  }
}
.active-dropzone {
  border-color: var(--color-placeholder);
  background-color: $color-dark-btn-success;
}
</style>
