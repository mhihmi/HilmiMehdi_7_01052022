const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/post');
const auth = require('../middleware/auth');


// CRUD for comments
// router.post('/create', auth, postCtrl.createComment);
// router.put("/:id", auth, postCtrl.updateComment);
// router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;