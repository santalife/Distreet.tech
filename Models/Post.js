const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Post = db.define('post', {
    posttype: {
        type: Sequelize.STRING
    },
    postcontent: {
        type: Sequelize.STRING
    },
    lastuupdated: {
        type: Sequelize.DATE
    },
    postedon: {
        type: Sequelize.DATE
    },
});


module.exports = Post;
