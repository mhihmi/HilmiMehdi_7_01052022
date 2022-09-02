<template>
  <main class="feeds">
    <post-modal />
    <!-- Filter Dropdown TODO -->
    <input type="search" placeholder="Rechercher un post..." v-model="search" />
    <!-- <posts-template /> -->
  </main>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import PostModal from "@/components/PostModal";
// import PostsTemplate from "@/components/PostsTemplate";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
    // PostsTemplate,
  },
  data() {
    return {
      storeProfile: useProfileStore(),
      search: "",
      // PostsTemplate: [],
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/feedsMain";
</style>
