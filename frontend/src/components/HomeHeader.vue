<template>
  <header class="home-header">
    <a href="#" title="vers l'accueil">
      <img
        alt="Groupomania logo"
        src="../assets/logo.svg"
        class="home-header__logo"
      />
    </a>
    <h1>{{ msg }}</h1>
  </header>
</template>

<script>
export default {
  name: "HomeHeader",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/homeHeader";
</style>
