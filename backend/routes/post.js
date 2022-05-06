const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');