require('dotenv').config();
const express = require('express');
const engine = require('ejs-mate');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/user');
const methodOverride = require('method-override');

// requiring routes
const indexs = require('./routes/indexs');
const posts = require('./routes/posts');
const reviews = require('./routes/reviews');

const app = express();

//  connecting to mongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mapbox');

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Connection Error!!'));
db.on('open',()=>{
  console.log("connected");
})

// use ejs-locals for all ejs templates
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));    //  Anytime we do res.render() we are looking for .ejs file in views folder.   
app.set('view engine', 'ejs');

//  Uncomment after placing favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

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

//  Set local variable pre-route middleware (before routing logic)
app.use((req, res, next) => {
  res.locals.title = "Surf Shop";
  res.locals.success = req.session.success || '';
  delete req.session.success;
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});

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
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  console.log(err);
  req.session.error = err.message;  
  res.redirect('back');
});

module.exports = app;
