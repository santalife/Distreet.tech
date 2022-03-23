const express = require('express');
const router = express.Router();
const { register } = require('../Services/user')

router.get('/', (req, res) => {
    res.render('Main/index', {layout:'HomeLayout'})
});

router.get('/login', (req, res) => {
    res.render('Main/login', {layout:'LoginLayout'})
});

router.get('/register', (req, res) => {
    res.render('Main/register')
});

router.post('/register', (req, res) => {
    // let { fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password } = req.body;

    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         User.create({
    //             fullname, email, addressstreet, blocknumber, unitnumber, postalcode, phonenumber, dateofbirth, nric, password: hash
    //         });
    //     });
    // });
    register(req)
    res.redirect('/')
});

module.exports = router;