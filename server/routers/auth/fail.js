const express = require('express');
const app = express();

app.use('/', (req, res) => {
    res.send("Error: Cannot login user");
})

module.exports = app;