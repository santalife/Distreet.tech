const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const post = require('../models/Post');
const event = require('../models/Event');
// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('Distreet database connected');
        })
        .then(() => {
/*
Defines the relationship where a user has many videos.
In this case the primary key from user will be a foreign key
in video.
*/
        user.hasMany(post);
        user.hasMany(event);
        mySQLDB.sync({ // Creates table if none exists
            force: drop
        }).then(() => {
            console.log('Create tables if none exists')
        }).catch(err => console.log(err))
    })
    .catch(err => console.log('Error: ' + err));
};
  
module.exports = { setUpDB };
