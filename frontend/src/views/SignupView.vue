<template>
  <home-header msg="Groupomania" />
  <Transition name="fromRight" mode="out-in" appear>
    <signup-form
      msg="S'inscrire sur le réseau social de votre entreprise !"
    ></signup-form>
  </Transition>
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

<style scoped>
.fromRight-enter-active,
.fromRight-leave-active {
  transition: all 0.4s ease-out;
}

.fromRight-enter-from,
.fromRight-leave-to {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
</style>
