const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const post = require('../models/Post');
const event = require('../models/Event');
const postlike = require('../Models/PostLike');
const postfile = require('../Models/PostFile');
const postcomment = require('../Models/PostComment');

const item = require('../Models/Item');
// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('Distreet database connected');
        })
        .then(() => {

        user.hasMany(post, {as: 'PostedBy', foreignKey: 'postedBy'});
        post.belongsTo(user, {as: 'PostedBy', foreignKey: 'postedBy'});
        user.hasMany(post, {as: 'PostedOn', foreignKey: 'postedOn'});
        post.belongsTo(user, {as: 'PostedOn', foreignKey: 'postedOn'});

        user.hasMany(event);
        user.hasMany(item);

        post.hasMany(postfile, {as: 'PostFile', foreignKey: 'postId'});    
        postfile.belongsTo(post, {as: 'PostFile', foreignKey: 'postId'});

        post.hasMany(postlike, {as: 'PostLike'});
        postlike.belongsTo(post, {as: 'PostLike'});
        user.hasMany(postlike, {as: 'PostLikeBy'});
        postlike.belongsTo(user, {as: 'PostLikeBy'});

        post.hasMany(postcomment);
        postcomment.hasMany(postcomment);

        mySQLDB.sync({ // Creates table if none exists
            force: drop
        }).then(() => {
            console.log('Create tables if none exists')
        }).catch(err => console.log(err))
    })
    .catch(err => console.log('Error: ' + err));
};
  
module.exports = { setUpDB };
