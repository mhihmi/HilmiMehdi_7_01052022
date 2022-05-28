<template>
  <main class="home-main">
    <div class="formContainer">
      <h2 class="formContainer__title">
        {{ msg }}
      </h2>
      <form @submit.prevent="submitForm" class="loginForm" autocomplete="off">
        <div class="loginForm__box">
          <label for="email" class="loginForm__label">Email :</label>
          <input
            type="mail"
            placeholder="test@gmail.com"
            name="email"
            class="loginForm__input"
            v-model="form.email"
          />
          <p v-if="v$.form.email.$invalid" class="loginForm__errorMessage">
            Email valide requis
          </p>
        </div>
        <div class="loginForm__box">
          <label for="psw" class="loginForm__label">Mot de Passe :</label>
          <input
            type="password"
            placeholder="********"
            name="psw"
            class="loginForm__input"
            v-model="form.password"
          />
          <p v-if="v$.form.password.$invalid" class="loginForm__errorMessage">
            Mot de passe requis
          </p>
          <a class="loginForm__forgotPsw" v-on:click="forgotPsw = !forgotPsw"
            >Mot de passe oublié ?</a
          >
          <span v-if="forgotPsw" class="loginForm__joke"
            >Il fallait s'en souvenir ! Cette fonctionnalité n'est pas encore
            disponible.</span
          >
        </div>
        <button :disabled="v$.form.$invalid" class="btn">Se connecter</button>
      </form>
      <p class="formContainer__message">
        Vous n'avez pas de compte ?
        <router-link to="/signup"
          ><a class="formContainer__messageLink">S'inscrire</a></router-link
        >
      </p>
      <div class="shape-1"></div>
      <div class="shape-2"></div>
      <div class="shape-3"></div>
      <div class="shape-4"></div>
    </div>
  </main>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
// const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\d.]*$/i);

export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
  data() {
    return {
      forgotPsw: false,
      v$: useVuelidate(), // convention for vuelidate Object
      form: {
        email: null,
        password: null, //5 - 15 letters with 2 digits, 1 uppercase & lowercase letters`
      },
    };
  },

  validations() {
    return {
      form: {
        email: {
          required, // v$.form.email.required
          email, // v$.form.email.email
        },
        password: {
          required, // v$.form.password.required
          minLengthValue: minLength(5), // v$.form.password.minLengthValue
          maxLengthValue: maxLength(15), // v$.form.password.maxLengthValue
        },
      },
    };
  },

  methods: {
    submitForm() {
      // console.log(this.v$); // check vuelidate object
      if (!this.v$.form.$invalid) {
        // $invalid is false when all rules are met
        console.log("📝 Form Submitted", this.form);
      } else {
        console.log("❌ Invalid form");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/homeMain";
@import "@/styles/layout/formContainer";
@import "@/styles/components/Forms";
@import "@/styles/components/buttons";
@import "@/styles/themes/shapesBackground";
</style>
