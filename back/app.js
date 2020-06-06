require('dotenv').config()
const express = require("express");
const cors = require('cors');
const path = require('path');
const url = require('url');
const formidable = require('formidable');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./models/user');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');

const mongoDb = 'mongodb+srv://user:assword@cluster0-adjsh.mongodb.net/test?retryWrites=true&w=majority';//process.env.DB_URL; //'mongodb+srv://user:assword@cluster0-adjsh.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDb, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

//For logging in and staying logged in
//Calling done will make the flow jump back into passport.authenticate()
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { msg: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

/*2*/passport.serializeUser(function(user, done) {
  done(null, user.id);
});

/*3*/passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//Static files are files that clients download as they are from the server. Express, by default does not allow you to serve static files. You need to enable it using the built-in middleware (1st line below). Now all static files you load will be considering 'public' as root. https://expressjs.com/en/starter/static-files.html
app.use(express.static('public')); //Specify absolute path in express.static() by prepending __dirname. OK THAT DID NOT WORK.
app.use(session({ secret: process.env.DB_SECRET/*'stingrays'*/, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const allRoutes = require('./routes/allroutes');
app.use('/', allRoutes);
app.get("/", (req, res) => res.redirect("/front/public/publiclist.html"))
app.listen(3000, () => console.log(`app listening on port 3000!`));
