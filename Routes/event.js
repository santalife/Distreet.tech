const express = require('express');
const router = express.Router();

router.get('/AllEvents', (req, res) => {
    res.render('Events/allEvents', {layout:'AllEventsLayout'})
})

router.get('/Details', (req, res) => {
    res.render('Events/details')
})

router.get('/', (req, res) => {
    res.render('Events/index', {layout:'HomeLayout'})
})

module.exports = router;