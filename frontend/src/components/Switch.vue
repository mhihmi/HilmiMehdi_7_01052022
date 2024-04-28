<template>
  <div class="switch" @click="toggleDarkMode">
    <input
      type="checkbox"
      class="switch__input"
      aria-label="Switch Light Mode"
      :checked="isDarkMode"
    />
    <span class="switch__slider"></span>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch",
  data() {
    return {
      isDarkMode: true,
    };
  },
  methods: {
    setDarkMode(active = true) {
      const wrapper = document.querySelector(":root");
      if (active) {
        wrapper.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        wrapper.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      this.isDarkMode = active;
    },
    toggleDarkMode() {
      const theme = document.querySelector(":root").getAttribute("data-theme");
      this.setDarkMode(theme === "light");
    },
    initDarkMode() {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const themePreference = localStorage.getItem("theme");
      let active = query.matches;
      if (themePreference === "dark") {
        active = true;
      }
      if (themePreference === "light") {
        active = false;
      }
      this.setDarkMode(active);
      query.addEventListener("change", function (e) {
        this.setDarkMode(e.matches);
      });
    },
  },
  mounted() {
    this.initDarkMode();
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/components/switch";
</style>
