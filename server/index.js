const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config()

const corsOptions = {
    origin: process.env.CORS_ORIGIN_DEV,
    optionsSuccessStatus: 200
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', cors(corsOptions), require('./routers/api/users'));
app.use('/api/posts', cors(corsOptions), require('./routers/api/posts'));
app.use('/api/comments', cors(corsOptions), require('./routers/api/comments'));


app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));