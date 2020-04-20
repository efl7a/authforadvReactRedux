const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function(enteredPassword, callback) {
  const user = this;

  bcrypt.compare(enteredPassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch)
  })
};

//Create the Model class
const ModelClass = mongoose.model('user', userSchema);

//export Model
module.exports = ModelClass;
