const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Main/index', {layout:'HomeLayout'})
});

router.get('/Login', (req, res) => {
    res.render('Main/login', {layout:'LoginLayout'})
});

router.get('/Register', (req, res) => {
    res.render('Main/register')
});
module.exports = router;