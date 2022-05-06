const express = require('express');
const moment = require('moment');

const Sequelize = require('sequelize-hierarchy-nestjs')();
require('sequelize-values')(Sequelize);

//Login / Register Modules
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');
const PostFile = require('../Models/PostFile');
const PostComment = require('../Models/PostComment');

const upload = require('../Services/imageUpload');

var bcrypt = require('bcryptjs');
const PostLike = require('../Models/PostLike');
const { Op } = require('sequelize')

const Purchase = require('../Models/Purchase');
const Item = require('../Models/Item');
const ItemFile = require('../Models/ItemFile');

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
                        fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password: hash, profilepicture, role: 'user'
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
        order: [['dateposted', 'DESC'], [PostComment, 'dateposted', 'DESC']],
        include: [
            {
                model: User,
                as: 'PostedBy',
                attributes: ['id', 'fullname', 'profilepicture']
            },
            {
                model: User,
                as: 'PostedOn',
                attributes: ['id', 'fullname', 'profilepicture']
            },
            'PostFile', 
            'PostLikes',
            {
                model: PostLike,
                as: 'PostLike',
                required: false,
                where:{
                    likedBy: req.user.id
                }
            },
            {
                model: PostComment,  
                required: false,
                where: {
                    parentId: null
                },
                include: [                    
                    {
                        model: User, 
                        attributes: ['id', 'fullname', 'profilepicture']
                    }, 
                    { 
                        model: PostComment, 
                        as: 'descendents',  
                        hierarchy: true,                   
                        include: [{
                            model: User,                            
                            attributes: ['id', 'fullname', 'profilepicture']                            
                        }]
                    }
                ],            
            }
        ],    
    });
    posts = posts.map((post) => post.get({ plain: true }));

    posts = JSON.parse(JSON.stringify(posts));
    
    // let postcomments = await PostComment.findAll({
    //     where:{
    //         postId: 1
    //     },
    //     hierarchy: true,
    //     include:[
    //         {
    //             model: PostComment,
    //             as: 'descendents', 
    //         }
    //     ],  
    // });
    // postcomments = JSON.parse(JSON.stringify(postcomments))
    
    // console.log(posts[0].postcomments[0].children);

    console.log('Hello!');



    return posts
}
async function getAllPurchase(req){
    let user = await getUserByFullName(req.params.fullname);
    
    let purchases = await Purchase.findAll({
        where: {
            userId: user.id,
        },
        order: [['date_purchased', 'DESC']],
        include: [{
            model:User,
            as:'Buyer'
        },
        {
            model:User,
            as:'Seller'
        },
        {
            model: Item, 
            include: [ItemFile]
        }],
        nest: true
    })
    purchases = purchases.map((purchase) => purchase.get({ plain: true }));
    return purchases;
};

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
module.exports = { register, getAllPosts, getUserByFullName, standardPost, getLikesFromPostId, getAllPurchase};