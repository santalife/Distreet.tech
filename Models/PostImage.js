const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const PostImage = db.define('postimage', {
    image: {
        type: Sequelize.BLOB
    },
    imagename: {
        type: Sequelize.STRING
    },
    filetype: {
        type: Sequelize.STRING
    },
});


module.exports = PostImage;
