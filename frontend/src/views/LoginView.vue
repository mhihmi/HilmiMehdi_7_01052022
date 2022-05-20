<template>
  <home-header msg="Groupomania" />
  <home-main />
  <main-footer />
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import HomeMain from "@/components/HomeMain.vue";
import MainFooter from "@/components/Footer.vue";

export default {
  name: "LoginView",
  components: {
    HomeHeader,
    HomeMain,
    MainFooter,
  },
};
</script>
