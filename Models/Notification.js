const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Notification = db.define('notification', {
    type:{
        type: Sequelize.BOOLEAN
    },
    isRead:{
        type: Sequelize.BOOLEAN
    }
});


module.exports = Notification;
