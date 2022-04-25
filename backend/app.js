const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Constants
const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

const app = express();

app.use(require('./routes/index.js'));

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`);
});

mongoose.connect(
    DATABASE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
)
    .then(res => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log('Error connecting to database', err);
    })