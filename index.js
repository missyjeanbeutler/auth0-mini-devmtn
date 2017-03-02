let express = require('express');
let session = require('express-session');
let passport = require('passport');
let Auth0Strategy = require('passport-auth0');
let config = require('./config.js')

let app = express();

app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new Auth0Strategy({
  domain: config.auth0.domain,
  clientID: config.auth0.id,
  clientSecret: config.auth0.secret,
  callbackURL: 'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}));

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: '/', failureRedirect: '/auth'}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res){
    res.send(req.user);
})




app.listen(3000, function(){
    console.log('listening on port 3000')
})