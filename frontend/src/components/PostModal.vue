<template>
  <transition name="modal">
    <div class="modal" v-if="reveal">
      <div class="modal__overlay" @click="toggleModal"></div>
      <div class="modal__card">
        <button class="modal__closeBtn" @click="toggleModal">X</button>
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
          <form class="modal__form">
            <label for="title" class="modal__formTitle">Titre</label>
            <input
              type="text"
              placeholder="Indiquez un titre (facultatif)"
              name="title"
              class="modal__formTitleInput"
            />
            <label for="content">Tell us your story:</label>
            <textarea
              id="content"
              name="content"
              rows="5"
              cols="50"
              minlength="20"
              maxlength="400"
              placeholder="Laissez libre cours à votre imagination ici..."
            ></textarea>
          </form>
          <div class="modal__dropzone"></div>
        </div>
        <div class="modal__buttons"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";

export default {
  name: "PostModal",
  props: ["reveal", "toggleModal"],
  setup() {
    let storeProfile = useProfileStore();
    storeProfile.getUserProfile();

    return {
      storeProfile,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/postModal";
</style>
