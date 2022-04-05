const express = require('express');
const { authRole } = require('../services/auth');
const router = express.Router();
const item = require('../Models/Item');
const Item = require('../Models/Item');

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'AdminLayout'; // set your layout here
    next(); // pass control to the next handler
});

router.get('/', (req, res) => {
    res.render('Admin/index');
});

router.get('/manage/items/create', (req, res) => {
    res.render('admin/createItem');
});

// router.post('/manage/items/create', async function (req, res){

// });

router.get('/manage/items/retrieve', (req, res) => {
    
    res.render('admin/retrieveItem');
});

router.get('/manage/items/update', (req, res) => {
    let items = Item;
    res.render('admin/updateItem', {Item});
});

module.exports = router;