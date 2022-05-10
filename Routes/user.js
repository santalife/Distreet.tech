const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');
const Post = require('../models/Post');
const { register, getAllPosts, getUserByFullName, standardPost, getLikesFromPostId, getAllPurchase } = require("../services/user")
const { authUser, authNotUser, authRole, ensureAuthenticated } = require("../services/auth");
const upload = require('../Services/imageUpload');
const PostFile = require('../Models/PostFile');
const PostLike = require('../Models/PostLike');
const { raw } = require('handlebars-helpers/lib/string');
const PostComment = require('../Models/PostComment');
const Item = require('../Models/Item');
const Friend = require('../Models/Friend');
const Purchase = require('../Models/Purchase');


router.get('/profile/:fullname', ensureAuthenticated, authRole("user"), async function (req, res) {
    let posts = await getAllPosts(req);

    // for(var i = 0 ; i < posts.length ; i++){
    //     posts[i].likes = await getLikesFromPostId(posts[i].id);
    //     posts[i].liked = await PostLike.findOne({
    //         where:{
    //             postId : posts[i].id,
    //             userId : req.user.id
    //         },
    //         raw: true            
    //     });
    // };

    // let purchases = await getAllPurchase(req);
    let profileuser = await getUserByFullName(req.params.fullname);
    // console.log(purchases);
    res.render('User/Profile', { posts, profileuser });
});


//STANDARD POST
router.post('/profile/:fullname/post/standard', ensureAuthenticated, (req, res) => {
    standardPost(req);
    res.redirect('/user/profile/'+req.params.fullname);
});

//PHOTO & VIDEO POST
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
                postedBy : req.user.id,
                postedOn : profileuser.id
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

//Like Feature
router.post('/profile/:fullname/like/:postId', ensureAuthenticated, async function (req, res) {

    console.log('iam here');

    await PostLike.create({
        likedBy : req.user.id,
        postId : req.params.postId
    })

    var likeCount = await PostLike.count({
        where:{
            postId : req.params.postId
        },
        raw: true
    });

    console.log(likeCount);

    res.json(likeCount);
})

//Dislike Feature
router.post('/profile/:fullname/dislike/:postId', ensureAuthenticated, async function (req, res) {

    console.log('iam here');

    await PostLike.destroy({
        where:{
            likedBy : req.user.id,
            postId : req.params.postId
        }
    })

    var likeCount = await PostLike.count({
        where:{
            postId : req.params.postId
        },
        raw: true
    });

    console.log(likeCount);

    res.json(likeCount);
})

//COMMENT FEATURE
router.post('/profile/:fullname/comment/:postId', ensureAuthenticated, async function (req, res) {
    
    console.log('iam commenting');
    console.log(req.body.comment);
    console.log(req.user.id);
    await PostComment.create({comment: req.body.comment, lastupdated: moment(), dateposted: moment(), postId: req.params.postId, postedBy: req.user.id})
    res.json('hello!');
})

//REPLY FEATURE
router.post('/profile/:fullname/reply/:commentId', ensureAuthenticated, async function (req, res) {
    
    console.log('iam replying');
    console.log(req.params.commentId);

    let parent = await PostComment.findOne({
        where : {
            id: req.params.commentId
        },
        raw : true        
    });
    console.log(parent);
    await PostComment.create({
        comment: req.body.reply, 
        lastupdated: moment(), 
        dateposted: moment(), 
        postId: parent.postId, 
        postedBy: req.user.id,
        parentId: req.params.commentId
    })

    res.json('hello!');
})

router.get('/profile/:fullname/editprofile', ensureAuthenticated, async function (req, res) {
    res.render('Main/index')
})

router.post('/profile/:fullname/addfriend', ensureAuthenticated, async function (req, res){
    console.log('bastard');
    console.log(req.params.fullname);
    console.log(req.user.id)    
    let requestee = await getUserByFullName(req.params.fullname);
    console.log(requestee.id);
    
    await Friend.create({
        status: false,
        request_timestamp: moment(),
        requesterId : req.user.id, 
        requesteeId: requestee.id
    });
    res.json('Hello!');

});

router.get('/item/:id', async function (req, res){
    let item = await Item.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    });
    console.log(item);
    res.render('User/item', {item});
});

router.post('/item/:id', async function (req, res){
    let quantity = req.body.quantity;
    let purchase = await Purchase.create({
        date_purchased: moment(),
        quantity,
        itemId: req.params.id,
        userId: req.user.id,
        status: "To Ship"
    })
    res.redirect('/');
});

router.put('/purchase/:id/cancel', async function (req, res){
    await Purchase.update({
        status: "Cancelled"
    },{
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
});


module.exports = router;