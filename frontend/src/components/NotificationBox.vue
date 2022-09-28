<template>
  <div class="notificationBox">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "notificationMessage",
  props: {
    message: String,
  },
};
</script>

<style scoped lang="scss">
.notificationBox {
  padding: $layout-padding;
  border: 2px solid lighten($color-light-btn-success, 25%);
  border-radius: 12.5px;
  background: var(--color-post);
  color: var(--color-text);
  position: fixed;
  top: 10%;
  right: 3%;
  z-index: 10;

  @include box_shadow(2);
}
</style>
