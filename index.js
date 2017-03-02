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
  domain: 'missyj.auth0.com',
  clientID: config.auth0.id,
  clientSecret: config.auth0.secret,
  callbackURL: 'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}));




app.listening(3000, function(){
    console.log('listening on port 3000')
})