<template>
  <button class="modal__btn" @click="isModalOpen = true">
    <img :src="storeProfile.photo" :alt="storeProfile.pseudo" />
  </button>
  <teleport to="#modal">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="isModalOpen"
        @click.self="isModalOpen = false"
      >
        <div class="modal" ref="modal">
          <button class="close-btn" @click="isModalOpen = false">X</button>
          <div class="modal__profileCard">
            <h2 class="modal__profileCardTitle">Modifier votre Profil</h2>
            <img
              :src="storeProfile.photo"
              :alt="storeProfile.pseudo"
              class="modal__profileCardPhoto"
            />
            <h3 class="modal__profileCardName">
              {{ storeProfile.firstname }}
              {{ storeProfile.lastname }}
            </h3>
            <p class="modal__profileCardMemberSince">
              Membre depuis le : <br />
              {{ storeProfile.createdAt }}
            </p>
          </div>
          <div class="modal__profileForm">
            <h2 class="modal__profileFormTitle">Modifier votre Profil</h2>
            <label for="pseudo" class="loginForm__label">Pseudo :</label>
            <input
              type="text"
              placeholder="Votre pseudo"
              name="pseudo"
              class="modal__profileFormInput"
            />
            <label for="lastname" class="loginForm__label"
              >Nom de famille</label
            >
            <input
              type="text"
              placeholder="Votre nom de famille"
              name="lastname"
              class="modal__profileFormInput"
            />
            <label for="firstname" class="loginForm__label">Prénom</label>
            <input
              type="text"
              placeholder="Votre prénom"
              name="firstname"
              class="modal__profileFormInput"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useProfileStore } from "@/store/useProfile";

export default {
  name: "ProfileModal",

  setup() {
    let storeProfile = useProfileStore();
    storeProfile.getUserProfile();

    return {
      isModalOpen: ref(false),
      modal: ref(null),
      storeProfile,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/components/profileModal";
</style>
