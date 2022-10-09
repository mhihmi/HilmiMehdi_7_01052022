<template>
  <div class="customSelect">
    <button class="customSelect__sortBtn">
      <p v-if="ascending">
        Publications récentes
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="customSelect__sortBtnIcon"
        >
          <path
            d="M15.9999 19.3333L22.6666 12.6667H9.33325L15.9999 19.3333Z"
            fill="var(--color-text)"
          />
        </svg>
      </p>
      <p v-else>
        Anciennes Publications
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="customSelect__sortBtnIcon rotate"
        >
          <path
            d="M15.9999 19.3333L22.6666 12.6667H9.33325L15.9999 19.3333Z"
            fill="var(--color-text)"
          />
        </svg>
      </p>
    </button>

    <!-- <select v-model="selected" aria-label="organiser les publications">
      <option value="Publications récentes">Publications récentes</option>
      <option value="+ ancienne à la + récente">
        + ancienne à la + récente
      </option>
    </select> -->
    <!-- <span class="customSelect__focus"></span> -->
  </div>
</template>

<script>
export default {
  name: "Sort-Post",
  props: {
    ascending: Boolean,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dropdown";
</style>
