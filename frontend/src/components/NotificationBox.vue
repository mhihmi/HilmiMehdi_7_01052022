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
  border: 4px solid blue;
  background: rgb(31, 215, 31);
  color: white;
  position: fixed;
  top: 10%;
  right: 3%;
}
</style>
