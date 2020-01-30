// THIS IS THE MAIN ONE

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
// const favicon = require('serve-favicon');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const createError = require('http-errors');
const cors = require('cors');
const User = require('./models/User');

//heroku

mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors({ 
  origin: function(origin, callback){
    return callback(null, true)
  },
  credentials: true
}))

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.use(session({
  secret:process.env.SECRET,
  resave: false, 
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// Default value for title local

app.use(passport.initialize());
app.use(passport.session());
app.use(require("body-parser").text());

app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
})

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const index = require('./routes/index');
app.use('/', index);

const userRoutes = require('./routes/user-routes');
app.use('/api', userRoutes);

const orderRoutes = require('./routes/order-routes');
app.use('/order', orderRoutes);

const productsRoutes = require('./routes/products-routes');
app.use('/product', productsRoutes);

const influencerRoutes = require('./routes/influencer-routes');
app.use('/influencer', influencerRoutes);

const reviewRoutes = require('./routes/review-routes');
app.use('/reviews', reviewRoutes);

const emailRoutes = require('./routes/email-routes');
app.use('/email', emailRoutes);

const stripe = require('./routes/stripe-routes')
app.use('/payment', stripe);

const Mailer = require('./routes/nodemailer/nodemailer')
app.use('/authorize', Mailer);

const Shipping = require('./routes/shipping-routes')
app.use('/shipping', Shipping);

const Kit = require('./routes/kit-routes')
app.use('/kit', Kit);

const Podcast = require('./routes/podcast-routes')
app.use('/podcast', Podcast);

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('*',(req ,res) => {
  res.json({success:'yes'})
})


module.exports = app;
