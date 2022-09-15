<template>
  <main class="feeds">
    <post-modal />
    <div class="feeds__filterMenu">
      <Dropdown />
      <SearchPost />
    </div>
    <!-- <posts-template /> -->
  </main>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import PostModal from "@/components/PostModal";
import Dropdown from "@/components/Dropdown";
import SearchPost from "@/components/SearchPost";
// import PostsTemplate from "@/components/PostsTemplate";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
    Dropdown,
    SearchPost,
  },
  data() {
    return {
      storeProfile: useProfileStore(),
      // PostsTemplate: [],
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/feedsMain";
</style>
