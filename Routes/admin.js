const express = require('express');
const { authRole } = require('../services/auth');
const router = express.Router();
const Item = require('../Models/Item');
const moment = require('moment');


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

router.post('/manage/items/create', async function (req, res){
    let {name, description, price, status, stock} = req.body;
    let item = await Item.create({
        name,
        description,
        price,
        post_date: moment(),
        last_updated: moment(),
        status,
        stock,
        sold: false
    });
    res.redirect('/admin/manage/items/retrieve');
});

router.get('/manage/items/retrieve', async function (req, res) {
    let items = await Item.findAll({
        order: [['last_updated', 'DESC']],
        raw: true
    });
    res.render('admin/retrieveItem', {items});
});

router.get('/manage/items/update/:id', async function (req, res) {
    let item = await Item.findOne({
        where:{
            id: req.params.id
        },
        raw: true
    });
    console.log(item);
    res.render('admin/updateItem', {item});
});

module.exports = router;