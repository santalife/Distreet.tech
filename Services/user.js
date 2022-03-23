const express = require('express');

//Login / Register Modules
const passport = require('passport');
const User = require('../models/User');
var bcrypt = require('bcryptjs');

function register(req){
    let { fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password } = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            User.create({
                fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password: hash
            });
        });
    });
};

module.exports = { register };