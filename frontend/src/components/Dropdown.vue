<template>
  <div class="customSelect">
    <select v-model="selected" aria-label="organiser les publications">
      <option value="Publications récentes" selected>
        Publications récentes
      </option>
      <option value="+ ancienne à la + récente">
        + ancienne à la + récente
      </option>
    </select>
    <span class="customSelect__focus"></span>
  </div>
</template>

<script>
export default {
  name: "Drop-down",

  data() {
    return {
      selected: "Publications récentes",
      select: "A",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dropdown";
</style>
