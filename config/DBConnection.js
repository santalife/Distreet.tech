const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const post = require('../models/Post');
const event = require('../models/Event');
const postlike = require('../Models/PostLike');
const postfile = require('../Models/PostFile');
const item = require('../Models/Item');
// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('Distreet database connected');
        })
        .then(() => {

        user.hasMany(post);
        user.hasMany(event);
        user.hasMany(item);
        post.hasMany(postfile)
        post.hasMany(postlike);
        user.hasMany(postlike);

        mySQLDB.sync({ // Creates table if none exists
            force: drop
        }).then(() => {
            console.log('Create tables if none exists')
        }).catch(err => console.log(err))
    })
    .catch(err => console.log('Error: ' + err));
};
  
module.exports = { setUpDB };
