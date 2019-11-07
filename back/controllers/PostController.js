//The first argument to find() is the query criteria whereas the second argument to the find() method is a projection, and it takes the form of a document with a list of fields for inclusion or exclusion from the result set. You can either specify the fields to include (e.g. { field: 1 }) or specify the fields to exclude (e.g. { field: 0 }). The _id field is implicitly included, unless explicitly excluded.
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes #Create the route-handler callback functions
const Post = require('../models/post');
const express = require('express');
const formidable = require('formidable');
const mongoose = require('mongoose');
const { check/*body???*/,validationResult } = require('express-validator');
const { sanitizeFields } = require('express-validator');

//1 DONE: get all post titles. Main page. Public.
exports.posts_all_GET = function(req, res, next) {
    Post.find({}, { title: 1 })              //if you don't put the {} as first arg, it returns the entire document instead of just title and _id!
    .exec(function(err, result) {                   /*doesn't matter what you call result var*/
        if (err) { return next(err); }
        res.send(result);
    });
}

//2 DONE: comment on a post, public. This sends your comment to the database.
//The issue here is that FormData will set the content type to be multipart/form-data, which Express' body-parser doesn't understand. For multipart bodies, you may be interested in the following modules: busboy and connect-busboy; multiparty and connect-multiparty; formidable; multer.
//https://stackoverflow.com/questions/39842013/fetch-post-with-body-data-not-working-params-empty JSON DIYs
//PERFECT EXPLANATION ON EMBEDDING: https://stackoverflow.com/questions/26967525/insert-an-embedded-document-to-a-new-field-in-mongodb-document

exports.posts_postId_POST = function(req, res, next) {  
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {    
        if (err) { return next(err); }
        //fields('author', 'Your name is too grandiose!').isLength({ max: 100 }), //https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms (VALIDATION&SANITIZATION)
        //fields('body', 'Your comment should be published as a standalone essay...').isLength({ max: 3000 })
        Post.updateOne(    
            { _id: fields.postid },
            { $push: { comments: {
                        author: fields.author,
                        body: fields.body,
                        timestamp: fields.timestamp
            }}}
        ).exec(function(err) {
        if (err) { return next(err); }
        res.send('Comment inserted. Check Atlas. .exec worked.');
        });
    });
}

/*OLDEN WAY VIA REFERENCING, THIS WORKS
        let comment = new Comment({
            author: fields.author,
            body: fields.body,
            postid: fields.postid
        });
        console.log("comment is: " + comment);
        comment.save(function (err) {
            if (err) { return next(err); }
            res.send('Inserted comment in DB. Go check Atlas.')    
        });
    });}*/


//3 DONE: Get an individual post for reading, public. This retrieves an entire post and its comments from database.
//LINKS: https://docs.mongodb.com/manual/core/aggregation-pipeline/
//http://www.mongoing.com/docs/reference/operator/aggregation.html
//http://www.mongoing.com/docs/reference/operator/aggregation/match.html
//I TRIED PROMISE.ALL() IT FAILED: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
//FAILED AGGREGATE LOOKUP:
        //console.log(postname);
        /*Post.aggregate([
            { $match: { title: postname }},
            { $lookup: {
            from: Comment, //not $Comment
            localField: "title",
            foreignField: "postitle", //for some reason it would refuse to look up based on _id, it'd just return nothing
            as: "comments"
        }}]).exec(function(err, final) {
                if (err) { return next(err); }
                console.log(final); res.send(final); });*/
    /*returned [ { _id: 5daf6a2b30fd6a1f24b24c64,
    timestamp: 2019-10-22T20:44:26.296Z,
    title: 'JeffreeStar',
    body: 'JeffreeStar is a makeup mogul person and a Youtuber who is besties with Shane Dawson. I tried to watch their new round of documentaries but found them untenable.',
    published: false,
    __v: 0,
    comments: [] } ] //EVERYONE SAY HELL YEA. ok no., cry*/


exports.posts_postId_GET = function(req, res, next) {      
    Post.findOne({ _id: req.params.id }, { published: 0 })
    .exec(function(err, result) {
        if (err) { return next(err); }
        res.send(result);
    });
}

