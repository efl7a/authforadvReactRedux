const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//session: false because passport tries to create a cookie based session and we are using tokens
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({'hi': 'there'});
  })
  app.post('/signup', Authentication.signup);
  app.post('/login', requireLogin, Authentication.login);
}
