const express = require('express');
const router = express.Router();

router.get('/manage/items/create', (req, res) => {
    res.render('admin/createItem');
});

router.post('/manage/items/create', async function (req, res){});

module.exports = router;