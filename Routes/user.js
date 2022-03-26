const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');
const Post = require('../models/Post');
const { Op } = require("sequelize");
const { register } = require("../services/user")
const { authUser, authNotUser, authRole, ensureAuthenticated } = require("../services/auth");
const upload = require('../Services/imageUpload');

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('User/Profile');
});

router.post('/profile/post/standard', ensureAuthenticated, (req, res) => {
    Post.create({
        posttype : req.body.posttype,
        postcontent : req.body.postcontent,
        lastupdated : moment(),
        postedon : moment(),
        userId : req.user.id
    });
    res.redirect('/user/profile');
});

router.post('/profile/post/photo&video', ensureAuthenticated, (req, res) => {
    console.log("Uploading...");
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.postcontent);
            console.log(req.files);
            res.json("success")
        }
    });
    // Post.create({
    //     posttype : req.body.posttype,
    //     postcontent : req.body.postcontent,
    //     lastupdated : moment(),
    //     postedon : moment(),
    //     userId : req.user.id
    // });
    
    // res.redirect('/user/profile');
    // res.redirect('/user/profile');
});


module.exports = router;