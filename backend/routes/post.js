const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// CRUD for posts
router.post('/create', auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.put("/:id/image", auth, multer, postCtrl.deletePostImg);
router.delete("/:id", auth, postCtrl.deletePost);

// CRUD for likes
router.post('/:id/like', auth, multer, likeCtrl.addLike);
router.get("/all/likes", auth, likeCtrl.getAllLikes);
router.delete("/:id/dislike", auth, likeCtrl.unlike);

module.exports = router;