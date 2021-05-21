

// router.get('/:userParam', (req, res) => {
//     MongoClient(url, (err, db) => {
//         if (err) throw err;
//         const dbo = db.db(process.env.DB_NAME);
//         let userParam;
//         if (/^-?\d+$/.test(req.params.userParam.substr(0, 1))) {
//             userParam = new ObjectId.createFromHexString(req.params.userParam);
//             dbo.collection("users").findOne({ "_id": userParam }, (err, results) => {
//                 if (err) throw err;
//                 res.send(results);
//                 db.close();
//             });
//         } else {
//             userParam = req.params.userParam;
//             dbo.collection("users").findOne({ "username": userParam }, (err, results) => {
//                 if (err) throw err;
//                 res.send(results);
//                 db.close();
//             });
//         }
//     });
// });