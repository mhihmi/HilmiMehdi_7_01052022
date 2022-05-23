<template>
  <home-header msg="Groupomania" />
  <signup-form msg="S'inscrire sur le réseau social de votre entreprise !" />
  <main-footer />
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import SignupForm from "@/components/SignupForm.vue";
import MainFooter from "@/components/Footer.vue";

export default {
  name: "SignupView",
  components: {
    HomeHeader,
    SignupForm,
    MainFooter,
  },
};
</script>
