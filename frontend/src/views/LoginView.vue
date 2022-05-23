<template>
  <home-header msg="Groupomania" />
  <login-form msg="Bienvenue sur le réseau social de votre entreprise !" />
  <main-footer />
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import LoginForm from "@/components/LoginForm.vue";
import MainFooter from "@/components/Footer.vue";

export default {
  name: "LoginView",
  components: {
    HomeHeader,
    LoginForm,
    MainFooter,
  },
};
</script>
