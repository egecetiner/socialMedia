const express = require('express');
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
} = require('../controllers/user');

const router = express.Router();

router.put('/user/follow', addFollowing, addFollower);
router.put('/user/unfollow', removeFollowing, removeFollower);

router.get('/users', allUsers);
router.get('/user/:userId', getUser);
router.put('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);

router.param('userId', userById);

module.exports = router;
