const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const User = db.define('user', {
    fullname: {
        type: Sequelize.STRING
    },
    dateofbirth: {
        type: Sequelize.DATEONLY
    },
    email: {
        type: Sequelize.STRING
    },
    nric: {
        type: Sequelize.STRING
    },
    phonenumber:{
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
    role:{
        type: Sequelize.STRING
    },
    profilepicture:{
        type: Sequelize.BLOB
    },
});


module.exports = User;
