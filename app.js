const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(8080, 'localhost', () => {
    console.log('server is running \n http://localhost:8080');
})