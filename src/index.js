const express = require('express');
const session = require('express-session');
const { initRoutes } = require('./routes');
const path = require('path');
require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

initRoutes(app);

app.listen(3000);
