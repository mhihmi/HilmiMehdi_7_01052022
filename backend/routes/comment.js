const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


// CRUD for comments
router.post('/create', auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", authAdmin, commentCtrl.deleteComment);

module.exports = router;