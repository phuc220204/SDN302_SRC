require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');

const connectDB = require('./config/db');
const authRouter = require('./routes/auth.route');
const apartmentRouter = require('./routes/apartment.route');
const residentRouter = require('./routes/resident.route');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api/apartments', apartmentRouter);
app.use('/view/residents', residentRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
