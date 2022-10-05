<template>
  <svg
    width="32"
    height="32"
    viewBox="0 0 30 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="postCard__likeBtn"
  >
    <path
      d="M26.9999 9.66665H18.5866L19.8533 3.57331L19.8933 3.14665C19.8933 2.59998 19.6666 2.09331 19.3066 1.73331L17.8933 0.333313L9.11992 9.11998C8.62658 9.59998 8.33325 10.2666 8.33325 11V24.3333C8.33325 25.8 9.53325 27 10.9999 27H22.9999C24.1066 27 25.0533 26.3333 25.4533 25.3733L29.4799 15.9733C29.5999 15.6666 29.6666 15.3466 29.6666 15V12.3333C29.6666 10.8666 28.4666 9.66665 26.9999 9.66665ZM26.9999 15L22.9999 24.3333H10.9999V11L16.7866 5.21331L15.3066 12.3333H26.9999V15ZM0.333252 11H5.66658V27H0.333252V11Z"
      fill="var(--color-text)"
    />
  </svg>
</template>

<script>
export default {
  name: "Like-Button",

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
.postCard {
  &__likeBtn {
    align-self: end;

    @include breakpoint-down(medium) {
      width: calculateRem(26px);
      height: calculateRem(26px);
    }

    @include breakpoint-down(small) {
      width: calculateRem(20px);
      height: calculateRem(20px);
    }
  }
}
</style>
