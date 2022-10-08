<template>
  <main class="feeds">
    <post-modal @reload-it="loadIt" />
    <div class="feeds__filterMenu">
      <Dropdown />
      <SearchPost />
    </div>
    <section class="postsList">
      <article class="postCard" v-for="post in posts" :key="post.id">
        <header class="postCard__header">
          <img
            :src="baseUrl + '/images/' + post.User.photo"
            :alt="post.User.pseudo"
            class="postCard__profileAvatar"
          />
          <div class="postCard__profile">
            <span class="postCard__profilePseudo">{{ post.User.pseudo }}</span>
            <p class="postCard__postCreated">
              Posté le {{ formatDate(post.createdAt) }}
            </p>
          </div>
          <post-modal
            @reload-it="loadIt"
            editMode
            :post="post"
            v-model:content="post.content"
            v-model:title="post.title"
            v-if="post.userId === storeProfile.userId || storeProfile.isAdmin"
          />
        </header>
        <div class="postCard__body">
          <h2 class="postCard__bodyTitle">{{ post.title }}</h2>
          <img
            v-if="post.media != null"
            :src="baseUrl + '/images/' + post.media"
            :alt="`photo de la publication ` + post.title"
            class="postCard__bodyMedia"
          />
          <p class="postCard__bodyContent">{{ post.content }}</p>
          <LikeButton
            @reload-it="loadIt"
            :postId="post.id"
            :likes="post.Likes"
          ></LikeButton>
        </div>
        <div
          class="postCard__comment"
          v-for="comment in post.Comments"
          :key="comment.id"
        >
          <img
            :src="baseUrl + '/images/' + comment.User.photo"
            :alt="comment.User.pseudo"
            class="postCard__commentAvatar"
          />
          <div class="postCard__commentRight">
            <span class="postCard__profilePseudo">{{
              comment.User.pseudo
            }}</span>
            <p class="postCard__postCreated">
              Posté le {{ formatDate(comment.createdAt) }}
            </p>
            <div
              v-if="editModeComment && selectedComment == comment.id"
              class="postCard__commentEditContent"
            >
              <div class="postCard__commentEditContainer">
                <textarea
                  class="postCard__editField"
                  aria-label="Modifier un commentaire"
                  v-model="comment.content"
                  @keydown.enter.exact.prevent="
                    editComment($event.target.value, comment.id)
                  "
                  @input="resize($event)"
                ></textarea>
              </div>
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                class="postCard__deleteIcon"
                @click="deleteComment(comment.id)"
                v-if="
                  comment.userId === storeProfile.userId || storeProfile.isAdmin
                "
              >
                <path
                  opacity="0.6"
                  d="M11 6V16H3V6H11ZM9.5 0H4.5L3.5 1H0V3H14V1H10.5L9.5 0ZM13 4H1V16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4Z"
                  fill="var(--color-text)"
                />
              </svg>
            </div>
            <p v-else class="postCard__commentContent">
              {{ comment.content }}
              <svg
                v-if="
                  comment.userId === storeProfile.userId || storeProfile.isAdmin
                "
                class="postCard__commentEdit"
                width="16"
                height="16"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="toggleEdit(comment.id)"
              >
                <path
                  d="M1.60416 19.4365C1.31195 19.436 1.0334 19.3127 0.836452 19.0969C0.635874 18.8828 0.536206 18.5932 0.562493 18.301L0.817701 15.4948L12.6073 3.70938L16.2917 7.39271L4.5052 19.1771L1.69895 19.4323C1.66666 19.4354 1.63437 19.4365 1.60416 19.4365ZM17.0271 6.65625L13.3437 2.97292L15.5531 0.763545C15.7485 0.567944 16.0136 0.458038 16.2901 0.458038C16.5666 0.458038 16.8317 0.567944 17.0271 0.763545L19.2365 2.97292C19.4321 3.1683 19.542 3.43343 19.542 3.7099C19.542 3.98637 19.4321 4.2515 19.2365 4.44688L17.0281 6.65521L17.0271 6.65625Z"
                  fill="var(--color-text)"
                />
              </svg>
            </p>
          </div>
        </div>
        <footer class="postCard__footer">
          <img
            :src="storeProfile.photo"
            :alt="storeProfile.pseudo"
            class="postCard__footerAvatar"
          />
          <textarea
            class="postCard__footerField"
            placeholder="Écrivez un commentaire..."
            aria-label="Créer un commentaire"
            v-model="newComment"
            @keydown.enter.exact.prevent="
              createComment($event.target.value, post.id)
            "
            @input="resize($event)"
          ></textarea>
          <svg
            @click="createComment(newComment, post.id)"
            width="21"
            height="18"
            viewBox="0 0 21 18"
            xmlns="http://www.w3.org/2000/svg"
            class="postCard__footerIcon"
          >
            <path
              d="M2.00976 3.03L9.51976 6.25L1.99976 5.25L2.00976 3.03ZM9.50976 11.75L1.99976 14.97V12.75L9.50976 11.75ZM0.00975585 0L-0.000244141 7L14.9998 9L-0.000244141 11L0.00975585 18L20.9998 9L0.00975585 0Z"
              fill="#091F43"
            />
          </svg>
        </footer>
      </article>
    </section>
  </main>
</template>

<script>
import { useProfileStore } from "@/store/useProfile";
import { useAuthStore } from "@/store/useAuth";
import PostModal from "@/components/PostModal";
import Dropdown from "@/components/Dropdown";
import LikeButton from "@/components/LikeButton";
import SearchPost from "@/components/SearchPost";
import formatDateMixin from "@/mixins/formatDateMixin.js";

export default {
  name: "FeedsMain",
  components: {
    PostModal,
    Dropdown,
    SearchPost,
    LikeButton,
  },
  data() {
    return {
      storeProfile: useProfileStore(),
      posts: [],
      baseUrl: process.env.VUE_APP_API_URL,
      newComment: "",
      editModeComment: false,
      selectedComment: null,
    };
  },
  mixins: [formatDateMixin],
  created() {
    this.loadIt();
  },
  methods: {
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    loadIt() {
      {
        fetch(`${process.env.VUE_APP_API_URL}/api/post`, {
          method: "GET",
          headers: { Authorization: "Bearer " + useAuthStore().token },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.post);
            this.posts = data.post;
            // console.log(this.posts);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    createComment(comment, postId) {
      const data = {
        content: comment,
        postId: postId,
      };
      // console.log(data);

      if (comment !== null) {
        fetch(`${process.env.VUE_APP_API_URL}/api/comment/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useAuthStore().token,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            this.loadIt();
            this.newComment = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    editComment(comment, commentId) {
      const data = {
        content: comment,
        commentId: commentId,
      };

      if (comment !== null) {
        fetch(`${process.env.VUE_APP_API_URL}/api/comment/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useAuthStore().token,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(() => {
            // console.log(response);
            this.editModeComment = !this.editModeComment;
            this.loadIt();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteComment(commentId) {
      if (confirm("Voulez vraiment supprimer ce commentaire ?")) {
        fetch(`${process.env.VUE_APP_API_URL}/api/comment/${commentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useAuthStore().token,
          },
        })
          .then((res) => res.json())
          .then(() => {
            this.editModeComment = !this.editModeComment;
            this.loadIt();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleEdit(commentId) {
      this.selectedComment = commentId;
      this.editModeComment = !this.editModeComment;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout/feedsMain";
</style>
