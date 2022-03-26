const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const post = require('../models/Post');
const event = require('../models/Event');
const PostImage = require('../Models/PostImage');
const PostLike = require('../Models/PostLike');
// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('Distreet database connected');
        })
        .then(() => {

        user.hasMany(post);
        user.hasMany(event);
        post.hasMany(PostImage);
        post.hasMany(PostLike);
        user.hasMany(PostLike);

        mySQLDB.sync({ // Creates table if none exists
            force: drop
        }).then(() => {
            console.log('Create tables if none exists')
        }).catch(err => console.log(err))
    })
    .catch(err => console.log('Error: ' + err));
};
  
module.exports = { setUpDB };
