<template>
  <main class="feeds">
    <post-modal />
    <div class="feeds__filterMenu">
      <Dropdown />
      <SearchPost />
    </div>
    <div class="postsList">
      <div class="postCard" v-for="post in posts" :key="post.id">
        <div class="postCard__header">
          <img
            :src="post.User.photo"
            :alt="post.User.pseudo"
            class="postCard__profileAvatar"
          />
          <div class="postCard__profile">
            <span class="postCard__profilePseudo">{{ post.User.pseudo }}</span>
            <p class="postCard__postCreated">Posté le {{ post.createdAt }}</p>
          </div>
          <svg
            v-if="
              post.userId === storeProfile.userId ||
              storeProfile.isAdmin == true
            "
            class="postCard__editBtn"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.60416 19.4365C1.31195 19.436 1.0334 19.3127 0.836452 19.0969C0.635874 18.8828 0.536206 18.5932 0.562493 18.301L0.817701 15.4948L12.6073 3.70938L16.2917 7.39271L4.5052 19.1771L1.69895 19.4323C1.66666 19.4354 1.63437 19.4365 1.60416 19.4365ZM17.0271 6.65625L13.3437 2.97292L15.5531 0.763545C15.7485 0.567944 16.0136 0.458038 16.2901 0.458038C16.5666 0.458038 16.8317 0.567944 17.0271 0.763545L19.2365 2.97292C19.4321 3.1683 19.542 3.43343 19.542 3.7099C19.542 3.98637 19.4321 4.2515 19.2365 4.44688L17.0281 6.65521L17.0271 6.65625Z"
              fill="var(--color-text)"
            />
          </svg>
        </div>
        <div class="postCard__body">
          <h2 class="postCard__bodyTitle">{{ post.title }}</h2>
          <img
            v-if="post.media != null"
            :src="post.media"
            :alt="`photo de la publication ` + post.title"
            class="postCard__bodyMedia"
          />
          <p class="postCard__bodyContent">{{ post.content }}</p>
        </div>
        <div
          class="postCard__comment"
          v-for="comment in post.Comments"
          :key="comment.id"
        >
          <img
            :src="comment.User.photo"
            :alt="comment.User.pseudo"
            class="postCard__commentAvatar"
          />
          <div class="postCard__commentRight">
            <span class="postCard__profilePseudo">{{
              comment.User.pseudo
            }}</span>
            <p class="postCard__postCreated">
              Posté le {{ comment.createdAt }}
            </p>
            <p class="postCard__commentContent">
              {{ comment.content }}
              <svg
                v-if="
                  post.Comments.userId === storeProfile.userId ||
                  storeProfile.isAdmin == true
                "
                class="postCard__commentEdit"
                width="16"
                height="16"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.60416 19.4365C1.31195 19.436 1.0334 19.3127 0.836452 19.0969C0.635874 18.8828 0.536206 18.5932 0.562493 18.301L0.817701 15.4948L12.6073 3.70938L16.2917 7.39271L4.5052 19.1771L1.69895 19.4323C1.66666 19.4354 1.63437 19.4365 1.60416 19.4365ZM17.0271 6.65625L13.3437 2.97292L15.5531 0.763545C15.7485 0.567944 16.0136 0.458038 16.2901 0.458038C16.5666 0.458038 16.8317 0.567944 17.0271 0.763545L19.2365 2.97292C19.4321 3.1683 19.542 3.43343 19.542 3.7099C19.542 3.98637 19.4321 4.2515 19.2365 4.44688L17.0281 6.65521L17.0271 6.65625Z"
                  fill="var(--color-text)"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import { useAuthStore } from "@/store/useAuth";
import PostModal from "@/components/PostModal";
import Dropdown from "@/components/Dropdown";
import SearchPost from "@/components/SearchPost";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
    Dropdown,
    SearchPost,
  },
  data() {
    return {
      storeProfile: useProfileStore(),
      posts: [],
    };
  },
  created() {
    fetch(`${process.env.VUE_APP_API_URL}/api/post`, {
      method: "GET",
      headers: { Authorization: "Bearer " + useAuthStore().token },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.post);
        this.posts = data.post;
        // ajout de l'url aux Avatars + Format Date
        for (let i = 0; i < this.posts.length; i++) {
          this.posts[i].User.photo =
            `${process.env.VUE_APP_API_URL}/images/` + this.posts[i].User.photo;
          this.posts[i].createdAt = new Date(
            this.posts[i].createdAt
          ).toLocaleDateString();
          this.posts[i].updatedAt = new Date(
            this.posts[i].updatedAt
          ).toLocaleDateString();
          // Si un media défini dans le post, ajout de l'url
          if (this.posts[i].media != null) {
            this.posts[i].media =
              `${process.env.VUE_APP_API_URL}/images/` + this.posts[i].media;
          }
          // ajout de l'url aux Avatars des commentaires + Format Date
          for (let y = 0; y < this.posts[i].Comments.length; y++) {
            this.posts[i].Comments[y].User.photo =
              `${process.env.VUE_APP_API_URL}/images/` +
              this.posts[i].Comments[y].User.photo;
            this.posts[i].Comments[y].createdAt = new Date(
              this.posts[i].Comments[y].createdAt
            ).toLocaleDateString();
            this.posts[i].Comments[y].updatedAt = new Date(
              this.posts[i].Comments[y].updatedAt
            ).toLocaleDateString();
          }
        }
        console.log(this.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/feedsMain";
</style>
