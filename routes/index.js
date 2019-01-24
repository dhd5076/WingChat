var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');
var transactionController = require('../controllers/transactionController');

router.use('/message', messageController)

router.use('/coins', transactionController);

router.use('/', userController)

router.get('/register', function(req, res) {
    res.render('register.pug');
});

router.get('/stats', function(req, res) {
    res.render('stats.pug');
});

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;