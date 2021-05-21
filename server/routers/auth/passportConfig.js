// const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');
const MongoClient = require('../../mongoClient');
const url = process.env.DB_URL_DEV;

module.exports = (passport) => {

    passport.use(
        new localStrategy((email, password, done) => {
            MongoClient(url, (err, db) => {
                if (err) throw err;
                const dbo = db.db(process.env.DB_NAME);
                dbo.collection("users").findOne({ email: email }, (err, user) => {
                    if (err) throw err;
                    if (!user) return done(null, false);
                    bCrypt.compare(password, user.password, (err, result) => {
                        if (err) throw err;
                        if (result === true) {
                            return done(null, user);
                        }
                    })
                })
            })
        }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    });
    passport.deserializeUser((id, cb) => {
        MongoClient(url, (err, db) => {
            if (err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("users").findOne({ email: email }, (err, user) => {
                const userInfo = {
                    username: user.username
                }
                cb(err, userInfo);
            })
        })
    })

}

