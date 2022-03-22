const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Event = db.define('event', {
    name:{
        type: Sequelize.STRING
    },
    publisheddate:{
        type: Sequelize.DATE
    },
    lastedited:{
        type: Sequelize.DATE
    },
    price:{
        type: Sequelize.FLOAT
    },
    description:{
        type: Sequelize.STRING
    },
    location:{
        type: Sequelize.STRING
    },
    maxpax: {
        type: Sequelize.INTEGER
    },
    points: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    },

});


module.exports = Event;
