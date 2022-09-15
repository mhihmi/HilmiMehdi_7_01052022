<template>
  <input
    type="search"
    placeholder="Rechercher un post..."
    v-model="search"
    class="searchField"
  />
</template>

<script>
export default {
  name: "Search-field",

  data() {
    return {
      search: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/searchfield";
</style>
