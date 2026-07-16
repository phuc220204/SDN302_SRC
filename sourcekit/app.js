// ============================================================
// app.js — file trung tâm. Tương thích express-generator:
// generator tạo bin/www sẽ require('../app') và tự listen PORT.
// [ĐỔI THEO ĐỀ]: chỉ 3 dòng mount route ở dưới.
// ============================================================
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

// View engine: EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());                          // parse JSON body (Postman)
app.use(express.urlencoded({ extended: false })); // parse form body (view)

// Session chỉ lưu TRẠNG THÁI ĐĂNG NHẬP cho view (Task 03).
// KHÔNG bao giờ lưu JWT ở đây — đề SP26 cấm "store the JWT in cookies or session storage".
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// ---------------- [ĐỔI THEO ĐỀ] route prefix ----------------
app.use('/auth', authRouter);
app.use('/api/apartments', apartmentRouter);   // Task 02 — REST API
app.use('/view/residents', residentRouter);    // Task 03 — client views
// -------------------------------------------------------------

app.use(notFound);
app.use(errorHandler);

module.exports = app;
