const express = require("express");
const cors = require('cors');
const path = require('path');
const url = require('url');
const formidable = require('formidable');
//const session = require("express-session");
//const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = 'mongodb+srv://user:assword@cluster0-adjsh.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDb, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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

/*we'll figure these out later, now I'm fiddling with database
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index"));*/

app.listen(3000, () => console.log(`app listening on port 3000!`));

//mongo "mongodb+srv://cluster0-adjsh.mongodb.net/test" --username user

