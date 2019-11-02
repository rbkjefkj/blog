const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const appjs = require('../app.js');
const mongoose = require('mongoose');

exports.login_GET = function(req, res) {
    res.redirect("/front/private/login.html");    
}

//4
//BRUH IMPORTANT https://stackoverflow.com/questions/20626183/more-passport-js-woes-hangs-on-form-submission
exports.login_POST = passport.authenticate("local", {
        successRedirect: "/front/private/privatelist.html",
        failureRedirect: "/front/private/login.html"
});

exports.logout_GET = function(req, res) {
    req.logout();
    res.sendFile("/front/private/login.html");           
}
