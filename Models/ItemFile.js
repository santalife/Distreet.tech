const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const ItemFile = db.define('itemfile', {
    imagepath: {
        type: Sequelize.STRING
    }
});


module.exports = ItemFile;
