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

// get all users
router.get('/', (req, res) => {
      MongoClient(url, (err, db) => {
          if(err) throw err;
          const dbo = db.db(process.env.DB_NAME);
          dbo.collection("users").find({}).toArray((err, results) => {
              if(err) throw err;
              res.send(results);
                db.close();
          });
      })
});

// get single user, searches via username or id
router.get('/:userParam', (req, res) => {
    MongoClient(url, (err, db) => {
        if(err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            let userParam;
            if(/^-?\d+$/.test(req.params.userParam.substr(0,1))) {
                userParam = new ObjectId.createFromHexString(req.params.userParam);
            dbo.collection("users").findOne({"_id": userParam}, (err, results) => {
                if(err) throw err;
                res.send(results);
                db.close();
            });} else {
                userParam = req.params.userParam;
            dbo.collection("users").findOne({"username": userParam}, (err, results) => {
                if(err) throw err;
                res.send(results);
                db.close();
            });
        }
    });
});

// router.get('/:userParam', (req, res) => {
//     MongoClient(url, (err, db) => {
//         if(err) throw err;
//             const dbo = db.db(process.env.DB_NAME);
//             let userParam;
//             if(req.body.searchType === "id") {
//                 userParam = new ObjectId.createFromHexString(req.params.userParam);    
//             dbo.collection("users").findOne({"_id": userParam}, (err, results) => {
//                 if(err) throw err;
//                 res.send(results);
//                 db.close();
//             });} else {
//                 userParam = req.params.userParam;    
//             dbo.collection("users").findOne({"username": userParam}, (err, results) => {
//                 if(err) throw err;
//                 res.send(results);
//                 db.close();
//             });
//         }
//     });
// });

// create user
router.post('/', (req, res) => {
    MongoClient(url, (err, db) => {
            if(err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            dbo.collection("users").insertOne({
                displayName: req.body.displayName,
                username: req.body.username,
                email: req.body.email,
                description: req.body.description,
                joinDate: new Date(),
                status: "active"
            }, (err, results) => {
                if(err) throw err;
                res.send(results);
                db.close();
            });
        })
});

// edit user
router.put('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if(err) throw err;
        const id = new ObjectId.createFromHexString(req.params.id);
        const dbo = db.db(process.env.DB_NAME);
        dbo.collection("users").updateOne({"_id": id}, { $set: req.body}, (err, results) => {
            if(err) throw err;
            res.send(results);
            db.close();
        });
    })
});

// delete user
router.delete('/:id', (req, res) => {
    MongoClient(url, (err, db) => {
        if(err) throw err;
        const id = new ObjectId.createFromHexString(req.params.id);
        const dbo = db.db(process.env.DB_NAME);
        dbo.collection("users").deleteOne({"_id": id}, (err, results) => {
            if(err) throw err;
            res.send(results);
            db.close();
        });
    })
});

module.exports = router;