<template>
  <div class="home">
    <img alt="Grouporama logo" src="../assets/logo.svg" />
    <HelloWorld msg="Grouporama" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "LoginView",
  components: {
    HelloWorld,
  },
};
</script>
