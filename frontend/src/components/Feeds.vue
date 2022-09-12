<template>
  <main class="feeds">
    <post-modal />
    <!-- Filter Dropdown TODO -->
    <div class="feeds__filterMenu">
      <Dropdown />
      <input
        type="search"
        placeholder="Rechercher un post..."
        v-model="search"
      />
    </div>
    <!-- <posts-template /> -->
  </main>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import PostModal from "@/components/PostModal";
import Dropdown from "@/components/Dropdown";
// import PostsTemplate from "@/components/PostsTemplate";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
    Dropdown,
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
