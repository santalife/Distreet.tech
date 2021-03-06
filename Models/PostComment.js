const Sequelize = require('sequelize');
require('sequelize-hierarchy-fork')(Sequelize);

const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const PostComment = db.define('postcomment', {
    comment: {
        type: Sequelize.STRING
    },
    lastupdated: {
        type: Sequelize.DATE
    },
    dateposted: {
        type: Sequelize.DATE
    },
});

PostComment.isHierarchy();
module.exports = PostComment;
