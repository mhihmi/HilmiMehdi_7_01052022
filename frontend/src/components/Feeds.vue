<template>
  <main class="feeds">
    <div class="newPost" @click="toggleModal">
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
    <post-modal :reveal="reveal" :toggleModal="toggleModal"></post-modal>
  </main>
</template>

<script>
import PostModal from "@/components/PostModal";
import { useProfileStore } from "@/store/useProfile";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
  },
  data() {
    return {
      reveal: false,
      storeProfile: useProfileStore(),
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
@import "@/styles/components/newPostInput";
</style>
