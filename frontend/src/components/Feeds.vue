<template>
  <main class="feeds">
    <!-- Futur input -->
    <div class="btn" @click="toggleModal">Ouvre la modale</div>
    <post-modal :reveal="reveal" :toggleModal="toggleModal"></post-modal>
  </main>
</template>

<script>
import PostModal from "@/components/PostModal";
import { useAuthStore } from "@/store/useAuth";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
  },
  data() {
    return {
      Authenticated: useAuthStore().loggedIn,
      reveal: false,
    };
  },
  methods: {
    toggleModal: function () {
      this.reveal = !this.reveal;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/feedsMain";
</style>
