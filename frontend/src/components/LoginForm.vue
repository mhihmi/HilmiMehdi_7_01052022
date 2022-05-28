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
            :class="{
              error: v$.form.email.$error,
              valid: !v$.form.email.$invalid,
            }"
            v-model="v$.form.email.$model"
          />
          <!-- show this message when required validator fails -->
          <p v-if="v$.form.email.$error" class="loginForm__errorMessage">
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
            :class="{
              error: v$.form.password.$error,
              valid: !v$.form.password.$invalid,
            }"
            v-model="v$.form.password.$model"
          />
          <div v-if="v$.form.password.$error">
            <p v-if="v$.form.password.required" class="loginForm__errorMessage">
              Mot de passe requis
            </p>
            <p
              v-else-if="
                (v$.form.password.LeastOneUppercaseValidator,
                v$.form.password.LeastOneLowercaseValidator,
                v$.form.password.Least2NumberValidator,
                v$.form.password.NoSpaceValidator)
              "
              class="loginForm__errorMessage"
            >
              Aucun espace, une Majuscule, <br />
              Minuscule, 2 chiffres
            </p>
            <p
              v-else-if="
                (v$.form.password.minLengthValue,
                v$.form.password.maxLengthValue)
              "
              class="loginForm__errorMessage"
            >
              Compris entre
              {{ v$.form.password.minLengthValue.$params.min }} et
              {{ v$.form.password.maxLengthValue.$params.max }} caractères
            </p>
          </div>
          <a class="loginForm__forgotPsw" v-on:click="forgotPsw = !forgotPsw"
            >Mot de passe oublié ?</a
          >
          <span v-if="forgotPsw" class="loginForm__joke"
            >Il fallait s'en souvenir ! Cette fonctionnalité n'est pas encore
            disponible.</span
          >
        </div>
        <!-- <button :disabled="v$.form.$invalid" class="btn">Se connecter</button> -->
        <button class="btn">Se connecter</button>
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
const LeastOneUppercaseValidator = helpers.regex(/(?:.*?[A-Z])/);
const LeastOneLowercaseValidator = helpers.regex(/(?:.*?[a-z])/);
const Least2NumberValidator = helpers.regex(/(?:.*?[0-9]){2}/);
const NoSpaceValidator = helpers.regex(/^\S*$/);

export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      forgotPsw: false,
      // v$: useVuelidate(), // convention for vuelidate Object
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
          LeastOneUppercaseValidator,
          LeastOneLowercaseValidator,
          Least2NumberValidator,
          NoSpaceValidator,
        },
      },
    };
  },

  methods: {
    submitForm() {
      this.v$.form.$touch();
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
