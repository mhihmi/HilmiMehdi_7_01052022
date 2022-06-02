<template>
  <home-header msg="Groupomania" />
  <feeds-main msg="Le futur forum deLaMortQuiTueTout"></feeds-main>
  <main-footer />
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

<style scoped>
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
