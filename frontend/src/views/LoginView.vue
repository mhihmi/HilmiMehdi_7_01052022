<template>
  <home-header msg="Groupomania" />
  <Transition name="fromLeft" mode="out-in" appear>
    <login-form
      msg="Bienvenue sur le réseau social de votre entreprise !"
    ></login-form>
  </Transition>
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

<style scoped lang="scss">
.fromLeft-enter-active,
.fromLeft-leave-active {
  transition: all 0.4s ease-out;
}

.fromLeft-enter-from,
.fromLeft-leave-to {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
</style>
