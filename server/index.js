const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', require('./routers/api/users'));
app.use('/api/posts', require('./routers/api/posts'));


app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));