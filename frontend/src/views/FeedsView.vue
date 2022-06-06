<template>
  <home-header msg="Groupomania" />
  <feeds-main />
  <main-footer />
  <div class="shape-1"></div>
  <div class="shape-2"></div>
  <div class="shape-3"></div>
  <div class="shape-4"></div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import FeedsMain from "@/components/Feeds.vue";
import MainFooter from "@/components/Footer.vue";

export default {
  name: "LoginView",
  components: {
    HomeHeader,
    FeedsMain,
    MainFooter,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/themes/shapesBackgroundFeeds";
/* .fromLeft-enter-active,
.fromLeft-leave-active {
  transition: all 0.4s ease-out;
}

.fromLeft-enter-from,
.fromLeft-leave-to {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
} */
</style>
