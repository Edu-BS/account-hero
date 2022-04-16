const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(require('./routes/index.js'));

app.listen(port, () => {
    console.log(`Listen in port ${port}`);
});