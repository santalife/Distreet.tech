const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');
const Post = require('../models/Post');
const { Op } = require("sequelize");
const { register } = require("../services/user")
router.get('/profile', (req, res) => {
    res.render('User/Profile');
});

router.post('/profile/post/standard', (req, res) => {
    Post.create({
        posttype : req.body.posttype,
        postcontent : req.body.postcontent,
        lastupdated : moment(),
        postedon : moment(),
        userId : 1
    });
    res.redirect('/user/profile');
});

module.exports = router;