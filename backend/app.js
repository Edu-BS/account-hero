const express = require('express');

const app = express();

app.use(require('./routes/index.js'));

app.listen(3000,()=>{
    console.log('listen in port 3000');
});