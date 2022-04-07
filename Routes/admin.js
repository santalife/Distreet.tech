const express = require('express');
const { authRole } = require('../services/auth');
const router = express.Router();
const Item = require('../Models/Item');
const moment = require('moment');
const ItemFile = require('../Models/ItemFile');
const upload = require('../Services/imageUpload');


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

router.post('/manage/items/create', async function (req, res) {
    upload(req, res, async function  (err) {
        if (err) {
            console.log(req.body);
            console.log(err);
        } else {
            console.log(req.body);
            let { name, description, price, status, stock } = req.body;
            console.log(req.body.name);

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

            const itemId = item.id;

            console.log(req.files);
            req.files.forEach(image => {
                ItemFile.create({
                    imagepath : "/upload/" + image.filename,
                    itemId
                });
            });
        
            res.json("success");
        
        }
        })
});

router.get('/manage/items/retrieve', async function (req, res) {
    let items = await Item.findAll({
        order: [['last_updated', 'DESC']],
        include: ItemFile,
        nest: true
    });

    items = items.map((item) => item.get({ plain: true }));

    console.log(items);
    res.render('admin/retrieveItem', { items });
});

router.get('/manage/items/update/:id', async function (req, res) {
    let item = await Item.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    });
    console.log(item);
    res.render('admin/updateItem', { item });
});

router.put('/manage/items/update/:id', async function (req, res) {
    let { name, description, price, status, stock } = req.body;
    let item = await Item.update({
        name,
        description,
        price,
        last_updated: moment(),
        status,
        stock
    },
        {
            where: {
                id: req.params.id
            }
        });
    res.redirect('/admin/manage/items/retrieve');
});

router.delete('/manage/items/retrieve/:id', async function (req, res) {
    console.log("deleted");
    await Item.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/admin/manage/items/retrieve');
});

module.exports = router;