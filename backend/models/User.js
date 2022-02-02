const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [{type: ObjectId, ref: 'User'}],
  followers: [{type: ObjectId, ref: 'User'}],
});

userSchema.methods = {
  authenticate: function (plainText) {
    return plainText === this.password;
  },
};

module.exports = mongoose.model('User', userSchema);
