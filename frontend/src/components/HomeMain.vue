<template>
  <main class="home-main">
    <div class="signupContainer">
      <h2 class="signupContainer__title">
        Bienvenue sur le réseau social de votre entreprise !
      </h2>
      <form action="" class="signupContainer__form">
        <label for="uname"><b>Email ou Pseudo</b></label>
        <input type="mail" placeholder="test@gmail.com" name="uname" required />
        <label for="psw"><b>Mot de Passe</b></label>
        <input type="mail" placeholder="********" name="psw" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeMain",
};
</script>

<style scoped lang="scss">
// @import "@/styles/layout/homeMain";
.home-main {
  @extend %flex-ai-c;
  flex-direction: column;
  padding: $padding-top-bot;
}

.signupContainer {
  text-align: center;
  width: 60vw;
  min-width: calculateRem(300px);
  max-width: calculateRem(850px);
  padding: $layout-padding $layout-padding;
  background-color: $color-light-overlay;
  @include box_shadow(2);
  border-radius: 25px;

  &__title {
    margin-top: $layout-padding;
    display: inline-block;
    max-width: 650px;
  }

  &__form {
    @extend %flex-ai-c;
    flex-direction: column;
    padding: $layout-padding $layout-padding;
  }
}
</style>
