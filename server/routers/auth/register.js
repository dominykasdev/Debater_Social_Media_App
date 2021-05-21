const express = require('express');
const app = express();
const bCrypt = require('bcryptjs');

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());

// create user
app.post('/', async (req, res) => {
    const hashedPassword = await bCrypt.hash(req.body.password, 10); 

    MongoClient(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db(process.env.DB_NAME);
        dbo.collection("users").insertOne({
            displayName: req.body.displayName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description,
            joinDate: new Date(),
            status: "active"
        }, (err, results) => {
            if (err) throw err;
            res.send("User created");
            db.close();
        });
    })
});

module.exports = app;