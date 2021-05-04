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

// get all posts
router.get('/', (req, res) => {
      MongoClient(url, (err, db) => {
          if(err) throw err;
          const dbo = db.db(process.env.DB_NAME);
          dbo.collection("posts").find({}).toArray((err, results) => {
              if(err) throw err;
              res.send(results);
                db.close();
          });
      })
});

// get single post
router.get('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if(err) throw err;
            const id = new ObjectId.createFromHexString(req.params.id);
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("posts").findOne({"_id": id}, (err, results) => {
                if(err) throw err;
                res.send(results);
                db.close();
            });
        })
});

// create post
router.post('/', (req, res) => {
    MongoClient(url, (err, db) => {
            if(err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("posts").insertOne({
                userId: req.body.userId,
                title: req.body.title,
                body: req.body.body,
                timestamp: new Date()
            }, (err, results) => {
                if(err) throw err;
                res.send(results);
                db.close();
            });
        })
});

// edit post
router.put('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if(err) throw err;
        const id = new ObjectId.createFromHexString(req.params.id);
        const dbo = db.db(process.env.DB_NAME);
        console.log(req.body);
        const updateData = {...req.body, editTimestamp: new Date()};
        dbo.collection("posts").updateOne({"_id": id}, { $set: updateData }, (err, results) => {
            if(err) throw err;
            res.send(results);
            db.close();
        });
    })
});

// delete post
router.delete('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if(err) throw err;
        const id = new ObjectId.createFromHexString(req.params.id);
        const dbo = db.db(process.env.DB_NAME);
        dbo.collection("posts").deleteOne({"_id": id}, (err, results) => {
            if(err) throw err;
            res.send(results);
            db.close();
        });
    })
});

module.exports = router;