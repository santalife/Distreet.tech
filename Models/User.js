const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const User = db.define('user', {
    fullname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    addressstreet: {
        type: Sequelize.STRING
    },
    blocknumber: {
        type: Sequelize.INTEGER
    },
    unitnumber: {
        type: Sequelize.INTEGER
    },
    postalcode: {
        type: Sequelize.INTEGER
    },
    phonenumber:{
        type: Sequelize.STRING
    },
    dateofbirth: {
        type: Sequelize.DATEONLY
    },
    nric: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    profilepicture:{
        type: Sequelize.BLOB
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
    role:{
        type: Sequelize.STRING
    },
});


module.exports = User;
