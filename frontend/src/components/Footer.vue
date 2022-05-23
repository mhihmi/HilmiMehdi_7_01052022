<template>
  <footer class="home-footer">
    <label class="switch">
      <input type="checkbox" checked />
      <span class="slider round"></span>
    </label>

    <!-- <input type="checkbox" id="switch" />
    <label for="switch" class="switch-label">
      <div class="toggle"></div>
    </label> -->
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/footer";
@import "@/styles/components/switch";
</style>
