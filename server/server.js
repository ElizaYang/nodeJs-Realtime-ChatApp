const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public')

var app = express();//The express() function is a top-level function exported by the express module.

app.use(express.static(publicPath));//static directory for express, root route is now set to your public folder dir

app.listen(3000, () => {
    console.log('Server is up on 3000');
});
