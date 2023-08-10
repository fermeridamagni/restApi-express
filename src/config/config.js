const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.static(path.join(__dirname, '../public')));

// Global Settings
app.use((req, res, next) => {
  next();
});

// Settings
dotenv.config({});

// Engine Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

// Routes Settings 
app.use('/', require('../routes/index.routes'));

module.exports = app;