<template>
  <footer class="home-footer">
    <toggle-switch />
  </footer>
</template>

<script>
import ToggleSwitch from "@/components/Switch.vue";

export default {
  name: "MainFooter",
  components: {
    ToggleSwitch,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/footer";
</style>
