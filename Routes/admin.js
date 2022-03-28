const express = require('express');
const { authRole } = require('../services/auth');
const router = express.Router();

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'AdminLayout'; // set your layout here
    next(); // pass control to the next handler
});

router.get('/manage/items/create', authRole("admin"), (req, res) => {
    res.render('admin/createItem');
});

router.post('/manage/items/create', async function (req, res){

});

router.get('/index', (req, res) => {
    res.render('Admin/index');
});

module.exports = router;