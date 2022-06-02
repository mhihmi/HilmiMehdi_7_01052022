<template>
  <h2 class="test">{{ msg }}</h2>
</template>

<script>
import { useAuthStore } from "@/store/useAuth";

export default {
  name: "FeedsMain",
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
      Authenticated: useAuthStore().loggedIn,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
// @import "@/styles/layout/footer";
</style>
