<template>
  <svg
    v-if="liked"
    @click="unlikeIt()"
    width="32"
    height="32"
    viewBox="0 0 30 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="postCard__likeBtn liked"
  >
    <path
      d="M13.2005 6.89824L13.0754 7.5H13.69H20C20.8239 7.5 21.5 8.17614 21.5 9V11C21.5 11.1905 21.4644 11.3667 21.3971 11.5409L18.3804 18.5831L18.3804 18.5831L18.3785 18.5877C18.1544 19.1254 17.6238 19.5 17 19.5H8C7.17614 19.5 6.5 18.8239 6.5 18V8C6.5 7.5861 6.66462 7.21501 6.93868 6.94836L6.93871 6.9484L6.94382 6.94328L13.1719 0.705701L13.8764 1.40355C13.8767 1.40383 13.877 1.4041 13.8773 1.40437C14.0525 1.58002 14.1641 1.82566 14.1698 2.08902L14.1448 2.35555L13.2005 6.89824ZM0.5 8.5H3.5V19.5H0.5V8.5Z"
      stroke="var(--color-text)"
    />
  </svg>
  <svg
    v-else
    @click="likeIt()"
    width="32"
    height="32"
    viewBox="0 0 30 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="postCard__likeBtn"
  >
    <path
      d="M13.2005 6.89824L13.0754 7.5H13.69H20C20.8239 7.5 21.5 8.17614 21.5 9V11C21.5 11.1905 21.4644 11.3667 21.3971 11.5409L18.3804 18.5831L18.3804 18.5831L18.3785 18.5877C18.1544 19.1254 17.6238 19.5 17 19.5H8C7.17614 19.5 6.5 18.8239 6.5 18V8C6.5 7.5861 6.66462 7.21501 6.93868 6.94836L6.93871 6.9484L6.94382 6.94328L13.1719 0.705701L13.8764 1.40355C13.8767 1.40383 13.877 1.4041 13.8773 1.40437C14.0525 1.58002 14.1641 1.82566 14.1698 2.08902L14.1448 2.35555L13.2005 6.89824ZM0.5 8.5H3.5V19.5H0.5V8.5Z"
      stroke="var(--color-text)"
    />
  </svg>
</template>

<script>
import { useAuthStore } from "@/store/useAuth";

export default {
  name: "Like-Button",
  emits: ["reloadIt"],
  props: {
    postId: Number,
    likes: Array,
  },
  data() {
    return {
      liked: null,
    };
  },
  created() {
    this.isLikedByUser();
  },
  methods: {
    isLikedByUser() {
      console.log(this.likes);
      let liked = false;
      this.likes.forEach((like) => {
        // console.log(like);
        if (like.userId === useAuthStore().userId) {
          liked = true;
        }
      });
      this.liked = liked;
    },
    likeIt() {
      fetch(`${process.env.VUE_APP_API_URL}/api/post/${this.postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useAuthStore().token,
        },
      })
        .then(() => {
          this.liked = !this.liked;
          this.$emit("reloadIt");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unlikeIt() {
      fetch(`${process.env.VUE_APP_API_URL}/api/post/${this.postId}/dislike`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useAuthStore().token,
        },
      })
        .then(() => {
          this.liked = !this.liked;
          this.$emit("reloadIt");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.postCard {
  &__likeBtn {
    align-self: end;
    position: relative;

    @include breakpoint-down(medium) {
      width: calculateRem(26px);
      height: calculateRem(26px);
    }

    @include breakpoint-down(small) {
      width: calculateRem(24px);
      height: calculateRem(24px);
    }

    &:hover {
      fill: var(--color-text);
    }

    &.liked {
      fill: var(--color-text);
    }
  }
}
</style>
