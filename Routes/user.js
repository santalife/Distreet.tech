const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');
const Post = require('../models/Post');
const { register, getImagesFromPostId, getUserByFullName, standardPost } = require("../services/user")
const { authUser, authNotUser, authRole, ensureAuthenticated } = require("../services/auth");
const upload = require('../Services/imageUpload');
const PostFile = require('../Models/PostFile');
const PostLike = require('../Models/PostLike');
const { raw } = require('handlebars-helpers/lib/string');


router.get('/profile/:fullname', ensureAuthenticated, authRole("user"), async function (req, res) {
    let posts = await getImagesFromPostId(req);
    let profileuser = await getUserByFullName(req.params.fullname)
    res.render('User/Profile', { posts, profileuser });
});

//Like Feature
router.post('/profile/:fullname/like/:postId', ensureAuthenticated, async function (req, res) {

    console.log('iam here');

    await PostLike.create({
        userId : req.user.id,
        postId : req.params.postId
    })

    var likeCount = await PostLike.count({
        where:{
            postId : req.params.postId
        },
        raw: true
    });

    console.log(likeCount);

    res.json({likeCount});
})

router.post('/profile/:fullname/post/standard', ensureAuthenticated, (req, res) => {
    standardPost(req);
    res.redirect('/user/profile/'+req.params.fullname);
});

router.post('/profile/post/photo&video', ensureAuthenticated, async function (req, res) {
    console.log("Uploading...");
    upload(req, res, async function  (err) {
        if (err) {
            console.log(err);
        } else {
            let profileuser = await getUserByFullName(req.body.fullname)
            let post = await Post.create({
                posttype : req.body.posttype,
                postcontent : req.body.postcontent,
                lastupdated : moment(),
                dateposted : moment(),                
                userId : req.user.id,
                postedon : profileuser.id
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

router.get('/profile/:fullname/editprofile', ensureAuthenticated, async function (req, res) {
    res.render('Main/index')
})



module.exports = router;