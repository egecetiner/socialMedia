require('dotenv').config();
const User = require('../models/user');

exports.signup = async (req, res) => {
  const userExist = await User.findOne({username: req.body.username});
  if (userExist)
    return res.status(403).json({error: 'Username is taken!'});
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({message: 'Signup success! Please login.'});
};

exports.signin = (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User does not exist. Sign up.',
      });
    }

    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({error: 'Username and password do not match'});
    }

    const {_id, username} = user;
    return res.json({user: {_id, username}});
  });
};
