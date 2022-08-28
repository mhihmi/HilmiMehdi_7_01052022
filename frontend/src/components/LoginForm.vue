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
              error: shouldAppendErrorClass(v$.form.email),
              valid: shouldAppendValidClass(v$.form.email),
            }"
            v-model="form.email"
            @blur="v$.form.email.$touch"
            autocomplete="off"
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
              error: shouldAppendErrorClass(v$.form.password),
              valid: shouldAppendValidClass(v$.form.password),
            }"
            v-model="form.password"
            @blur="v$.form.password.$touch"
            autocomplete="new-password"
          />
          <div v-if="v$.form.password.$error">
            <p v-if="v$.form.password.required" class="loginForm__errorMessage">
              {{ v$.form.password.$errors[0].$message }}
            </p>
          </div>
          <a class="loginForm__forgotPsw" v-on:click="forgotPsw = !forgotPsw"
            >Mot de passe oublié ?</a
          >
          <transition name="fading">
            <span v-if="forgotPsw" class="loginForm__joke"
              >Il fallait s'en souvenir ! Cette fonctionnalité n'est pas encore
              disponible.</span
            >
          </transition>
        </div>
        <!-- <button :disabled="v$.form.$invalid" class="btn">Se connecter</button> -->
        <button class="btn">Se connecter</button>
      </form>
      <p class="formContainer__message">
        Vous n'avez pas de compte ?
        <router-link to="/signup" class="formContainer__messageLink"
          >S'inscrire</router-link
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
import { required, email, helpers } from "@vuelidate/validators";
import { apiManager } from "@/services/api";
import { useAuthStore } from "@/store/useAuth";

export default {
  name: "LoginForm",
  props: {
    msg: String,
  },

  data() {
    return {
      forgotPsw: false,
      form: {
        email: null,
        password: null,
      },
      v$: useVuelidate(),
      storeAuth: useAuthStore(),
    };
  },

  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required: helpers.withMessage("Mot de passe requis", required), // v$.form.password.required
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
      this.v$.$touch();
      if (!this.v$.$invalid) {
        console.log("📝 Form Submitted", this.form);

        apiManager
          .post("/auth/login", this.form)
          .then((data) => {
            localStorage.setItem("id", data.profile.userId);
            localStorage.setItem("pseudo", data.profile.pseudo);
            localStorage.setItem("token", data.token);
            // Update Pinia AuthState;
            this.storeAuth.updateAuth(data);
            // navigate to a protected resource
            this.$router.push({ name: "feeds" });
          })
          .catch((error) => {
            // console.log(this.storeAuth.loggedIn);
            console.log(error);
          });
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
@import "@/styles/components/homeForms";
@import "@/styles/components/buttons";
@import "@/styles/themes/shapesBackground";

.fading-enter-active,
.fading-leave-active {
  transition: all 0.5s ease;
}

.fading-enter-from,
.fading-leave-to {
  opacity: 0;
  -webkit-transform: translateY(50px);
  transform: translateY(50px);
}
</style>
