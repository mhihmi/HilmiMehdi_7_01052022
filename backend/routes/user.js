const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const pswCtrl = require('../middleware/password');
const emailCtrl = require('../middleware/email');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/signup', emailCtrl, pswCtrl, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/profile/:id", auth, userCtrl.getUserProfile);
router.get("/profile", auth, userCtrl.getAllUsersProfiles);
router.put("/profile/:id", auth, multer, userCtrl.updateProfile);
router.delete("/profile/:id", auth, userCtrl.deleteProfile);

module.exports = router;