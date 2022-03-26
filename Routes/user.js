const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');
const Post = require('../models/Post');
const { register, getImagesFromPostId, getUserByFullName } = require("../services/user")
const { authUser, authNotUser, authRole, ensureAuthenticated } = require("../services/auth");
const upload = require('../Services/imageUpload');
const PostFile = require('../Models/PostFile');


router.get('/profile/:fullname', ensureAuthenticated, async function (req, res) {
    let posts = await getImagesFromPostId(req);
    let profileuser = await getUserByFullName(req.params.fullname)
    res.render('User/Profile', { posts, profileuser });
});

router.post('/profile/:fullname/post/standard', ensureAuthenticated, (req, res) => {
    Post.create({
        posttype : req.body.posttype,
        postcontent : req.body.postcontent,
        lastupdated : moment(),
        postedon : moment(),
        userId : req.user.id
    });
    res.redirect('/user/profile/'+req.params.fullname);
});

router.post('/profile/post/photo&video', ensureAuthenticated, async function (req, res) {
    console.log("Uploading...");
    upload(req, res, async function  (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.postcontent);
            console.log(req.files);

            let post = await Post.create({
                posttype : req.body.posttype,
                postcontent : req.body.postcontent,
                lastupdated : moment(),
                postedon : moment(),
                userId : req.user.id
            });        
            const postId = post.id        
            req.files.forEach(image => {                
                PostFile.create({      
                    imagepath : "/upload/" + image.filename,      
                    postId                
                });
            });

            res.json("success")
        }
    });
    
});


module.exports = router;