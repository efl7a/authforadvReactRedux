const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: 'You must supply and email and password.'})
  }
  //See if user already exists

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    //if user exists, return console.error

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

  //if a user doesn't exists, create and save userSchema
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}

exports.login = function(req, res, next) {
  //user has already gone through passport and have been authorized. They just need a token
  //passport's done sends user with response.
  res.send({ token: tokenForUser(req.user) });
}
