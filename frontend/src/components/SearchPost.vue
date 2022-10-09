<template>
  <input
    type="search"
    placeholder="Rechercher un post..."
    v-model="search"
    aria-label="Rechercher un post"
    class="searchField"
    @change="emitSearch"
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
  methods: {
    emitSearch() {
      this.$emit("emitSearch", this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/searchfield";
</style>
