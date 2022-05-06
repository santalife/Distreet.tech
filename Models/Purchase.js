const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Purchase = db.define('purchase', {
    date_purchased:{
        type: Sequelize.DATE
    },
    quantity:{
        type: Sequelize.INTEGER
    },
    status:{
        type: Sequelize.STRING
    }
});


module.exports = Purchase;
