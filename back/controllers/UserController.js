const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const appjs = require('../app.js');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

exports.login_GET = function(req, res) {
    res.redirect("/front/private/login.html", { message: req.flash('error') });

}

//4
//WHY PASSPORTJS DIDN'T WORK BEFORE: https://stackoverflow.com/questions/20626183/more-passport-js-woes-hangs-on-form-submission
//VANILLA PASSPORTJS
exports.login_POST = passport.authenticate("local", {
        successRedirect: "/front/private/privatelist.html",
        failureRedirect: "/front/private/login.html",
		failureFlash: true
});

exports.logout_GET = function(req, res) {
    req.logout();
    res.send('ok');
}
