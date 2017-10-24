const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../PUBLIC')
const port = process.env.PORT || 3000;
var app = express();//The express() function is a top-level function exported by the express module.

app.use(express.static(publicPath));//static directory for express, root route is now set to your public folder dir

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
