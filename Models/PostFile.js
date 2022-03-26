const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const PostFile = db.define('postfile', {
    imagepath: {
        type: Sequelize.STRING
    }
});


module.exports = PostFile;
