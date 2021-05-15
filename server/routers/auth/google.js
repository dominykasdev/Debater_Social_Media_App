const express = require('express');
const app = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MongoClient = require('../../mongoClient');//require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = process.env.DB_URL_DEV;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
    // User.findOrCreate({googleId: profile.id}, (err, user) => {
    //     return cb(err,user);
    // })
    // console.log(profile);
    if (profile) {
        MongoClient(url, (err, db) => {
            if(err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("users").findOne({"_id": profile.id}, (err, results) => {
                if(err) throw err;
                if (results === null){
                    console.log(`User ${profile.displayName} does not exist in the database. Need to register...`);
                    return cb(err, profile, "register")
                } else {
                    console.log("User found! Logging in...")
                    return cb(err, profile, "login")
                }
                db.close();
            });
        })

        // return cb(null, profile);
    }
    else {
        return cb(null, false);
    }
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    // User.findById(id, function (err, user) {
    //   done(err, user);
    // });
        // const idObject = new ObjectId.createFromHexString(id);
        MongoClient(url, (err, db) => {
            if(err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("users").findOne({"_id": id}, (err, results) => {
                if(err) throw err;
                console.log(results);
                done(err, results)
                db.close();
            });
        })
  });

app.get('/',
    passport.authenticate('google', { scope: ['profile','email','https://www.googleapis.com/auth/plus.login'] }));

app.get('/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    (req, res) => {
        res.redirect(`/${req.authInfo}`);
    })

module.exports = app;