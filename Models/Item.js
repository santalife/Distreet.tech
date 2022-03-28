const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Item = db.define('item', {
    name:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.FLOAT
    },
    post_date:{
        type: Sequelize.DATE
    },
    last_updated:{
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.STRING
    },
    stock:{
        type: Sequelize.INTEGER
    },
    sold:{
        type: Sequelize.INTEGER
    },
});


module.exports = Item;
