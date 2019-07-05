const passport = require('passport');
const dataService = require('../services/dataService');
const users = require('../models/users').model;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const secrets = require('./secrets');

passport.serializeUser((user, done)=>{
    done(null,user.id);
});

passport.deserializeUser((id, done)=>{
    dataService.queries.getGoogleById(id).then(done(null, user));
});

passport.use(new GoogleStrategy({
        callbackURL: 'http://localhost:3000/auth/google/redirect',
        clientID: secrets.google.clientID,
        clientSecret: secrets.google.clientSecret,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },(accessToken, refreshToken, profile, done)=>{
        const newUser = 
            new users({
                    UserName: profile.displayName,
                    AuthProvider: { Provider:'google', Id: profile.id }
                });
        dataService.queries.checkOrSaveGoogleUser(newUser)
            .then((currentUser) => {
                done(null, currentUser)
            }
        )
    })
);
