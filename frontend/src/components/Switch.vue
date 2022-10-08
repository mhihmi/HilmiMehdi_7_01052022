<template>
  <div class="switch">
    <input
      type="checkbox"
      class="switch__input"
      aria-label="Switch Light Mode"
      checked
    />
    <span class="switch__slider"></span>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch",
  mounted() {
    const setDarkMode = (active = true) => {
      const wrapper = document.querySelector(":root");
      if (active) {
        wrapper.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        wrapper.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    };
    const toggleDarkMode = () => {
      const theme = document.querySelector(":root").getAttribute("data-theme");
      // Si le thème actuel est "Light", Nous voulons activer le "Dark"
      setDarkMode(theme === "light");
    };
    const initDarkMode = () => {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const themePreference = localStorage.getItem("theme");
      let active = query.matches;
      if (themePreference === "dark") {
        active = true;
      }
      if (themePreference === "light") {
        active = false;
      }
      setDarkMode(active);
      query.addEventListener("change", function (e) {
        setDarkMode(e.matches);
      });
      const toggleButton = document.querySelector(".switch__slider");
      toggleButton.addEventListener("click", toggleDarkMode);
    };
    initDarkMode();
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/components/switch";
</style>
