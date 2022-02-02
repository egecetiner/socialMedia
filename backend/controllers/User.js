const User = require('../models/user');
const _ = require('lodash');

exports.userById = (req, res, next, id) => {
  User.findById(id)
    // populate followers and following users array
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
      req.profile = user; // adds profile object in req with user info
      next();
    });
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(users);
  });
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.deleteUser = (req, res, next) => {
  console.log(req.profile.following);
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({message: 'User deleted successfully'});
  });
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); // extend - mutate the source object

  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: 'You are not authorized to perform this action',
      });
    }

    res.json({user});
  });
};

// follow unfollow
exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    {$push: {following: req.body.followId}},
    (err, result) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      next();
    },
  );
};

exports.addFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {$push: {followers: req.body.userId}},
    {new: true},
  )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json(result);
    });
};

// remove follow unfollow
exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    {$pull: {following: req.body.unfollowId}},
    (err, result) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      next();
    },
  );
};

exports.removeFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {$pull: {followers: req.body.userId}},
    {new: true},
  )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json(result);
    });
};
