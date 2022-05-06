const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// CRUD for posts
router.post('/create', auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.put("/:id", auth, multer, postCtrl.updatePost);
// router.delete("/:id", auth, postCtrl.deletePost);

// CRUD for likes
// router.post('/:id/like', auth, multer, likeCtrl.addLike);
// router.get("/:id/like", auth, likeCtrl.getAllLikes);
// router.delete("/:id/like", auth, likeCtrl.removeLike);

module.exports = router;