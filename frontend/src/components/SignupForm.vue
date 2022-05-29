<template>
  <main class="home-main">
    <div class="formContainer">
      <h2 class="formContainer__title">
        {{ msg }}
      </h2>
      <form @submit.prevent="submitForm" class="loginForm" autocomplete="off">
        <div class="loginForm__box">
          <label for="mail" class="loginForm__label">Email</label>
          <input
            type="mail"
            placeholder="test@gmail.com"
            name="mail"
            class="loginForm__input"
            :class="{
              error: shouldAppendErrorClass(v$.form.email),
              valid: shouldAppendValidClass(v$.form.email),
            }"
            v-model="form.email"
            @blur="v$.form.email.$touch"
          />
          <!-- show this message when required validator fails -->
          <p v-if="v$.form.email.$error" class="loginForm__errorMessage">
            Email valide requis
          </p>
          <label for="psw" class="loginForm__label">Mot de Passe</label>
          <input
            type="password"
            placeholder="********"
            name="psw"
            class="loginForm__input"
            :class="{
              error: shouldAppendErrorClass(v$.form.password),
              valid: shouldAppendValidClass(v$.form.password),
            }"
            v-model="form.password"
            @blur="v$.form.password.$touch"
          />
          <div v-if="v$.form.password.$error">
            <p v-if="v$.form.password.required" class="loginForm__errorMessage">
              {{ v$.form.password.$errors[0].$message }}
            </p>
            <p
              v-else-if="
                (v$.form.password.LeastOneUppercaseValidator,
                v$.form.password.LeastOneLowercaseValidator,
                v$.form.password.Least2NumberValidator,
                v$.form.password.NoSpaceValidator)
              "
              class="loginForm__errorMessage"
            ></p>
            <p
              v-else-if="
                (v$.form.password.minLengthValue,
                v$.form.password.maxLengthValue)
              "
              class="loginForm__errorMessage"
            ></p>
          </div>
          <label for="psw" class="loginForm__label"
            >Confirmer votre Mot de Passe</label
          >
          <input
            type="password"
            placeholder="********"
            name="psw"
            class="loginForm__input"
            :class="{
              error: shouldAppendErrorClass(v$.form.confirmPassword),
              valid: shouldAppendValidClass(v$.form.confirmPassword),
            }"
            v-model="form.confirmPassword"
            @blur="v$.form.confirmPassword.$touch"
          />
          <p
            v-if="v$.form.confirmPassword.$error"
            class="loginForm__errorMessage"
          >
            {{ v$.form.confirmPassword.$errors[0].$message }}
          </p>
        </div>
        <div class="loginForm__box">
          <label for="pseudo" class="loginForm__label">Pseudo</label>
          <input
            type="text"
            placeholder="********"
            name="pseudo"
            class="loginForm__input"
            :class="{
              error: shouldAppendErrorClass(v$.form.pseudo),
              valid: shouldAppendValidClass(v$.form.pseudo),
            }"
            v-model="form.pseudo"
            @blur="v$.form.pseudo.$touch"
          />
          <p v-if="v$.form.pseudo.$error" class="loginForm__errorMessage">
            {{ v$.form.pseudo.$errors[0].$message }}
          </p>
          <label for="fname" class="loginForm__label">Nom de famille</label>
          <input
            type="text"
            placeholder="********"
            name="fname"
            class="loginForm__input"
            :class="{
              error: shouldAppendErrorClass(v$.form.fname),
              valid: shouldAppendValidClass(v$.form.fname),
            }"
            v-model="form.fname"
            @blur="v$.form.fname.$touch"
          />
          <p v-if="v$.form.fname.$error" class="loginForm__errorMessage">
            {{ v$.form.fname.$errors[0].$message }}
          </p>
        </div>
        <button class="btn">S'inscrire</button>
        <div class="shape-1"></div>
        <div class="shape-2"></div>
        <div class="shape-3"></div>
        <div class="shape-4"></div>
      </form>
      <p class="formContainer__message">
        Vous avez déjà un compte ?
        <router-link to="/login" class="formContainer__messageLink"
          >Se Connecter</router-link
        >
      </p>
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
  sameAs,
} from "@vuelidate/validators";
const LeastOneUppercaseValidator = helpers.regex(/(?:.*?[A-Z])/);
const LeastOneLowercaseValidator = helpers.regex(/(?:.*?[a-z])/);
const Least2NumberValidator = helpers.regex(/(?:.*?[0-9]){2}/);
const NoSpaceValidator = helpers.regex(/^\S*$/);

export default {
  name: "SignupForm",
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
        confirmPassword: null,
        pseudo: null,
        fname: null,
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
          required: helpers.withMessage("Mot de passe requis", required), // v$.form.password.required
          minLengthValue: helpers.withMessage(
            "Nombre de caractères insuffisants",
            minLength(5)
          ), // v$.form.password.minLengthValue
          maxLengthValue: helpers.withMessage(
            "Trop de caractères",
            maxLength(15)
          ), // v$.form.password.maxLengthValue
          LeastOneUppercaseValidator: helpers.withMessage(
            "Ajouter une Majuscule",
            LeastOneUppercaseValidator
          ),
          LeastOneLowercaseValidator: helpers.withMessage(
            "Ajouter une Minuscule",
            LeastOneLowercaseValidator
          ),
          Least2NumberValidator: helpers.withMessage(
            "Ajouter des chiffres",
            Least2NumberValidator
          ),
          NoSpaceValidator: helpers.withMessage(
            "Espaces non autorisés",
            NoSpaceValidator
          ),
        },
        confirmPassword: {
          required: helpers.withMessage("Mot de passe requis", required),
          sameAsPassword: helpers.withMessage(
            "Mots de Passe différents",
            sameAs(this.form.password)
          ),
        },
        pseudo: {
          required: helpers.withMessage("Indiquez un pseudonyme", required),
        },
        fname: {
          required: helpers.withMessage(
            "Indiquez votre nom de famille",
            required
          ),
        },
      },
    };
  },

  methods: {
    shouldAppendValidClass(field) {
      return !field.$invalid && field.$model;
    },
    shouldAppendErrorClass(field) {
      return field.$error;
    },
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
