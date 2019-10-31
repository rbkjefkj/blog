const Post = require('../models/post');
const express = require('express');
const formidable = require('formidable');
const mongoose = require('mongoose');

//5 DONE: DELETE A POST
exports.posts_private_postId_DELETE = function(req, res, next) {
    Post.deleteOne({ _id: req.params.id })
    .exec(function(err, result) {
        if (err) { return next(err); }
        res.send("Deleted fine.");
    });
}

//6 DONE: PUBLISH/UNPUBLISH A POST
exports.posts_private_postId_PUT = function(req, res, next) {
    let bool = req.params.bool;
    Post.updateOne({ _id: req.params.id }, { $set: { published: bool } })
    .exec(function(err) {
        if (err) { return next(err) }
        res.send('Toggle was successful.');
    });
}

//9 ALMOST DONE: EDIT AN EXISITNG POST USING PUT VERB
exports.posts_private_PUT = function(req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(JSON.stringify(fields) + " is the form data i got from frontend.");
        console.log(fields["_id"]);
        if (err) { return next(err) }
        Post.replaceOne({"_id": fields["_id"]}, fields, { upsert: true })
        .exec(function(err) {
            if(err) { return next(err); }
            console.log('Updated existing post.');
            res.send('Updated existing post.');    
        });
    }); 
}
//10 ALMOST DONE: CREATE A BRAND NEW POST USING POST VERB
exports.posts_private_POST = function(req, res, next) {
    console.log('reached 10th route');
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) { return next(err) }
        //Post.insertOne(fields) //DOUBLE CHECK IF THIS IS RIGHT
//A Mongoose model doesn't have an insertOne method. Use the create({new doc}) method instead!
        Post.create({
            title: fields.title,
            body: fields.body,
            published: fields.published,
            timestamp: fields.timestamp,
            comments: []
        }, function(err, doc) {
            if(err) { return next(err); }
            console.log('Created brand new post.');
            res.send('Created brand new post.');    
        });
    });
}

//11 DONE: GET ALL BLOGPOST TITLES ON privatelist.html
exports.posts_private_all_GET = function(req, res, next) {
    Post.find({}, { title: 1, published: 1 })         
    .exec(function(err, result) {                   
        if (err) { return next(err); }
        res.send(result);
    });
}




