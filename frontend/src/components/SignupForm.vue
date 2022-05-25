<template>
  <main class="home-main">
    <div class="formContainer">
      <h2 class="formContainer__title">
        {{ msg }}
      </h2>
      <form action="" class="loginForm">
        <div class="loginForm__box">
          <label for="mail" class="loginForm__label">Email</label>
          <input
            type="mail"
            placeholder="test@gmail.com"
            name="mail"
            required
            class="loginForm__input"
          />
          <label for="psw" class="loginForm__label">Mot de Passe</label>
          <input
            type="password"
            placeholder="********"
            name="psw"
            required
            class="loginForm__input"
          />
        </div>
        <div class="loginForm__box">
          <label for="pseudo" class="loginForm__label">Pseudo</label>
          <input
            type="text"
            placeholder="********"
            name="pseudo"
            required
            class="loginForm__input"
          />
          <label for="fname" class="loginForm__label">Nom de famille</label>
          <input
            type="text"
            placeholder="********"
            name="fname"
            required
            class="loginForm__input"
          />
        </div>
        <button type="submit" class="btn">S'inscrire</button>
      </form>
      <p class="formContainer__message">
        Vous avez déjà un compte ?
        <router-link to="/login"
          ><a class="formContainer__messageLink">Se Connecter</a></router-link
        >
      </p>
    </div>
  </main>
</template>

<script>
export default {
  name: "SignupForm",
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
