<template>
  <main class="home-main">
    <div class="formContainer">
      <h2 class="formContainer__title">
        {{ msg }}
      </h2>
      <form action="" class="loginForm">
        <div class="loginForm__box">
          <label for="pmail" class="loginForm__label">Email ou Pseudo</label>
          <input
            type="mail"
            placeholder="test@gmail.com"
            name="pmail"
            required
            class="loginForm__input"
          />
        </div>
        <div class="loginForm__box">
          <label for="psw" class="loginForm__label">Mot de Passe</label>
          <input
            type="password"
            placeholder="********"
            name="psw"
            required
            class="loginForm__input"
          />
          <a class="loginForm__forgotPsw">Mot de passe oublié ?</a>
        </div>
        <button type="submit" class="btn">Se connecter</button>
      </form>
      <p class="formContainer__message">
        Vous n'avez pas de compte ?
        <router-link to="/signup"
          ><a class="formContainer__messageLink">S'inscrire</a></router-link
        >
      </p>
    </div>
  </main>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/homeMain";
@import "@/styles/layout/formContainer";
@import "@/styles/components/Forms";
@import "@/styles/components/buttons";
</style>
