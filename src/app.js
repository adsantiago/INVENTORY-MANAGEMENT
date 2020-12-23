const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// importing routes
const reportRoutes = require('./routes/report');
const { urlencoded } = require('express');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
   host: 'localhost',
   user: 'root',
   password: 'password' ,
   port: 3306,
   database: 'inventory_database'
}, 'single'));

app.use(express.urlencoded({extended: false}));

// routes
app.use('/', reportRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port 3000');
});