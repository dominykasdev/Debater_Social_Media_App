// const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');
const MongoClient = require('../../mongoClient');
const url = process.env.DB_URL_DEV;

module.exports = (passport) => {

    passport.use(
        new localStrategy(
            {usernameField: "email", passwordField: "password"},
            (email, password, done) => {
            // console.log(`LocalStrategy: ${email}`);
            // console.log(`LocalStrategy: ${password}`);
            MongoClient(url, (err, db) => {
                if (err) throw err;
                const dbo = db.db(process.env.DB_NAME);
                // console.log(email);
                dbo.collection("users").findOne({ email: email }, (err, user) => {
                    if (err) throw err;
                    if (!user) return done(null, false);
                    bCrypt.compare(password, user.password, (err, result) => {
                        if (err) throw err;
                        if (result === true) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    })
                })
            })
        }));

    passport.serializeUser((user, cb) => {
        cb(null, user._id)
    });

    passport.deserializeUser((id, cb) => {
        // console.log(`deserializeUser: ${id}`);
        MongoClient(url, (err, db) => {
            if (err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("users").findOne({ email: email }, (err, user) => {
                const userInfo = {
                    id: user._id
                }
                cb(err, userInfo);
            })
        })
    });

}

