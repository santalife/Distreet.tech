const express = require('express');
const moment = require('moment');

//Login / Register Modules
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');
const PostFile = require('../Models/PostFile');
const upload = require('../Services/imageUpload');

var bcrypt = require('bcryptjs');
const PostLike = require('../Models/PostLike');

function register(req, res){
    upload(req, res, async function  (err) {
        if (err) {
            console.log(err);
        } else {

            let { fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password } = req.body;
            let profilepicture = "/upload/" + req.files[0].filename;            
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    User.create({
                        fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password: hash, profilepicture
                    });
                });
            });            
        }
    });
};

function login(req){
    
}

async function getUserById(id){
    let user = await User.findOne({
        where:{
            id
        },
        raw: true
    });
    return user;
}

async function getUserByFullName(fullname){
    let user = await User.findOne({
        where:{
            fullname
        },
        raw: true
    });
    return user;
}

async function getAllPosts(req){
    let user = await getUserByFullName(req.params.fullname);

    let posts = await Post.findAll({
        where: {
            postedOn: user.id,            
        },
        order: [['dateposted', 'DESC']],
        include: {all: true, nest: true},
        nest: true
    });
    
    posts = posts.map((post) => post.get({ plain: true }));

    // for(var i=0 ; i < posts.length; i++ ){
    //     // posts[i].postedby = await getUserById(posts[i].postedby);
    //     if(posts[i].posttype == "Photos/Videos"){
    //         posts[i].postimages = await PostFile.findAll({
    //             where: {
    //                 postId: posts[i].id
    //             },
    //             order: [['id', 'DESC']],
    //             raw: true                
    //         }); 
    //     };
    // };


    return posts
}

async function getLikesFromPostId(postId){
    let postLikes = await PostLike.findAll({
        where:{
            postId
        },
        raw: true
    });

    return postLikes
};

async function standardPost(req){
    let profileuser = await getUserByFullName(req.params.fullname);

    Post.create({
        posttype : req.body.posttype,
        postcontent : req.body.postcontent,
        lastupdated : moment(),
        dateposted : moment(),
        postedBy : req.user.id,
        postedOn : profileuser.id,
    });
};
module.exports = { register, getAllPosts, getUserByFullName, standardPost, getLikesFromPostId};