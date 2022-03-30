const express = require('express');
const router = express.Router();
const { register } = require('../Services/user')
const { ensureAnnonymous, ensureAuthenticated } = require('../Services/auth')

//Login Module
const passport = require('passport');


router.get('/', (req, res) => {
    if(req.user){
        if(req.user.role == "admin"){
            res.redirect('/admin');
        }
    }
    res.render('Main/index', {layout:'HomeLayout'});
});

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
    req.app.locals.layout = 'Layout'; // set your layout here    
    req.logout();    
	res.redirect('/');
});



module.exports = router;