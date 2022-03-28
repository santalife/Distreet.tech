const express = require('express');
const { authRole } = require('../services/auth');
const router = express.Router();

router.get('/manage/items/create', authRole("admin"), (req, res) => {
    res.render('admin/createItem');
});

router.post('/manage/items/create', async function (req, res){

});

router.get('/index', (req, res) => {
    res.render('Admin/index' , {layout: 'AdminLayout'});
});

module.exports = router;