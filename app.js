const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const router = require('./app_server/routes');
const apiRoute = require('./app_api/routes')
const { errorHandler: { errorHandler, notFoundError } } = require('./app_api/_middlewares')

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', router);
app.use('/api/forms', apiRoute)

app.use(notFoundError);

app.use(errorHandler);

module.exports = app;
