const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/user');

// requiring routes
const indexs = require('./routes/indexs');
const posts = require('./routes/posts');
const reviews = require('./routes/reviews');

const app = express();

//  connecting to mongoDB database
mongoose.connect('mongodb://127.0.0.1:27017');

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Connection Error!!'));
db.on('open',()=>{
  console.log("connected");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));      
app.set('view engine', 'ejs');

//  Uncomment after placing favicon in /public
//app.use(favicon(patj.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Configure Passpost and Sessions
app.use(session({
  secret : 'sanket 123',
  resave : false,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());    //Passport
passport.serializeUser(User.serializeUser());   
passport.deserializeUser(User.deserializeUser());

//  Mount Routes
app.use('/', indexs);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
