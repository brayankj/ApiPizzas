const path = require('path');
const express = require('express');
require('dotenv').config();
const { BdConnection } = require('./database/bdConnection');

const cors = require('cors');

const app = express();
app.use( cors() );
app.use( express.json() );
BdConnection();

app.use( express.static('public') );

//rutas
app.use('/api/login', require('./routes/auth') );
app.use('/api/users', require('./routes/user') );
app.use('/api/pizzas', require('./routes/pizza') );

app.get( '*', (req,res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html')  );
});

app.listen(  process.env.PORT, () => {
    console.log( 'Services run port: ', + process.env.PORT );
})