const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Friend = db.define('friend', {
    status:{
        type: Sequelize.BOOLEAN
    },
    request_timestamp:{
        type: Sequelize.DATE
    },
    accept_timestamp:{
        type: Sequelize.DATE
    }
});


module.exports = Friend;
