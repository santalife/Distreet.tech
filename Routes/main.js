const express = require('express');
const router = express.Router();
const { register } = require('../Services/user')
const { ensureAnnonymous, ensureAuthenticated } = require('../Services/auth')

//Login Module
const passport = require('passport');


router.get('/', (req, res) => {
    let items = [];
    items.push('chair', 'table', 'sofa');
    let dict = {};
    dict['item'] = items;
    let names = [];
    names.push('abc', 'def', 'ghi');
    dict['name'] = names;
    console.log(dict);
    res.render('Main/index', {layout:'HomeLayout', items, dict});
});

router.get('/profile/:fullname', (req, res) => {
    res.redirect('/user/profile/' + req.params.fullname)
})

router.get('/register', ensureAnnonymous, (req, res) => {
    res.render('Main/register');
});

router.post('/register', ensureAnnonymous, (req, res) => {
    register(req, res);
    res.json("success");
});

router.get('/login', ensureAnnonymous, (req, res) => {
    res.render('Main/login', {layout:'LoginLayout'});
});

router.post('/login', ensureAnnonymous, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
});

router.post('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
	res.redirect('/');
});



module.exports = router;