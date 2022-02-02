const express = require('express');
const {signup, signin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.param('userId', userById);

module.exports = router;
