const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
dotenv.config()

// Constants
const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI


const app = express();

// cors para los navegadores no bloque la api 
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// llamadas a las rutas 
app.use(require('./routes/index.js'));
app.use('/api',require('./routes/api.js'));


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