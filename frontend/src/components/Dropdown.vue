<template>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</template>

<script>
export default {
  name: "Drop-down",

  data() {
    return {
      selected: "",
      select: "A",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
