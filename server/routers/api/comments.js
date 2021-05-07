const express = require('express');
const router = express.Router();
const path = require('path');
const MongoClient = require('../../mongoClient');//require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// if(!db)
//     console.log("Error connecting db")
// else
//     console.log("Db connected successfully")

const url = process.env.DB_URL_DEV;

// get all comments
// router.get('/', (req, res) => {
//     MongoClient(url, (err, db) => {
//         if (err) throw err;
//         const dbo = db.db(process.env.DB_NAME);
//         dbo.collection("comments").find({}).toArray((err, results) => {
//             if (err) throw err;
//             res.send(results);
//             db.close();
//         });
//     })
// });

// get array of comments for user/post
router.get('/', (req, res) => {
    MongoClient(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db(process.env.DB_NAME);
        const postId = req.query.postId;
        const user = req.query.user;
        const orderBy = req.query.orderBy; // order target
        const order = parseInt(req.query.order); // asc || desc
        if (user) {
            if (/^-?\d+$/.test(user.substr(0, 1))) {
                dbo.collection("comments")
                    .find({ "userId": user })
                    .limit(25)
                    .sort({ orderBy: order })
                    .toArray((err, results) => {
                        if (err) throw err;
                        res.send(results);
                        db.close();
                    });
            } else {
                dbo.collection("comments")
                    .find({ "username": user }, { "userId": 0 })
                    .limit(25)
                    .sort({ orderBy: order })
                    .toArray((err, results) => {
                        if (err) throw err;
                        res.send(results);
                        db.close();
                    });
            }
        } else {
            MongoClient(url, (err, db) => {
                if (err) throw err;
                const dbo = db.db(process.env.DB_NAME);
                dbo.collection("comments")
                    .find({ "postId": postId }, { "userId": 0 })
                    .limit(25)
                    .sort({ orderBy: order })
                    .toArray((err, results) => {
                        if (err) throw err;
                        res.send(results);
                        db.close();
                    });
            })
        }
    });
});

// create comment
router.post('/', (req, res) => {
    MongoClient(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db(process.env.DB_NAME);
        dbo.collection("comments").insertOne({
            postId: req.body.postId,
            userId: req.body.userId,
            username: req.body.username,
            content: req.body.content,
            timestamp: new Date(),
            likes: 0,
            dislikes: 0
        }, (err, results) => {
            if (err) throw err;
            res.send(results);
            db.close();
        });
    })
});

// edit comment
router.patch('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if (err) throw err;
        const id = new ObjectId.createFromHexString(req.params.id);
        const dbo = db.db(process.env.DB_NAME);
        if (req.body.hasOwnProperty('likes') || req.body.hasOwnProperty('dislikes')) {
            dbo.collection("comments").updateOne({ "_id": id }, { $inc: req.body }, (err, results) => {
                if (err) throw err;
                res.send(results);
                db.close();
            });
        } else {
            const updateData = { ...req.body, editTimestamp: new Date() };
            dbo.collection("comments").updateOne({ "_id": id }, { $set: updateData }, (err, results) => {
                if (err) throw err;
                res.send(results);
                db.close();
            });
        }
    })
});

// delete comment
router.delete('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if (err) throw err;
        const id = new ObjectId.createFromHexString(req.params.id);
        const dbo = db.db(process.env.DB_NAME);
        dbo.collection("comments").deleteOne({ "_id": id }, (err, results) => {
            if (err) throw err;
            res.send(results);
            db.close();
        });
    })
});

module.exports = router;